const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const hud = document.getElementById('hud');
const shopOverlay = document.getElementById('shopOverlay');
const cheatOverlay = document.getElementById('cheatOverlay');
const balanceLabel = document.getElementById('balance');
const upgradeList = document.getElementById('upgradeList');

const upgrades = [
  { key: 'health', name: 'Maximum Health +1', description: 'Start each run with an extra heart.', cost: 150, max: 5 },
  { key: 'speed', name: 'Speed Boost', description: 'Move faster around the arena.', cost: 120, max: 5 },
  { key: 'fire', name: 'Rapid Fire', description: 'Shoot more often.', cost: 180, max: 5 },
  { key: 'damage', name: 'Power Shot', description: 'Deal extra damage to enemies.', cost: 220, max: 4 }
];

let saveData = { credits: 0, best: 0, levels: {}, infiniteCoins: false };
try {
  const stored = JSON.parse(localStorage.getItem('unknown-arcade-save') || '{}');
  if (stored && Number.isFinite(stored.credits) && stored.credits >= 0) saveData.credits = stored.credits;
  if (stored && Number.isFinite(stored.best) && stored.best >= 0) saveData.best = stored.best;
  if (stored && stored.levels && typeof stored.levels === 'object') saveData.levels = stored.levels;
  if (stored && typeof stored.infiniteCoins === 'boolean') saveData.infiniteCoins = stored.infiniteCoins;
} catch { /* Use a fresh save if storage is unavailable. */ }
upgrades.forEach(upgrade => {
  const level = Number(saveData.levels[upgrade.key]);
  saveData.levels[upgrade.key] = Number.isFinite(level) ? Math.max(0, Math.min(upgrade.max, level)) : 0;
});

function save() {
  try { localStorage.setItem('unknown-arcade-save', JSON.stringify(saveData)); } catch { /* Keep playing without saved progress. */ }
}
function level(key) { return saveData.levels[key] || 0; }
function renderShop() {
  balanceLabel.textContent = `Credits: ${saveData.infiniteCoins ? '∞' : saveData.credits}`;
  upgradeList.replaceChildren();
  upgrades.forEach(upgrade => {
    const current = level(upgrade.key);
    const cost = Math.floor(upgrade.cost * Math.pow(1.65, current));
    const row = document.createElement('div');
    row.className = 'upgrade';
    const info = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = `${upgrade.name} · LV ${current}/${upgrade.max}`;
    const description = document.createElement('small');
    description.textContent = upgrade.description;
    info.append(title, description);
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = current >= upgrade.max ? 'MAXED' : `BUY ${cost}`;
    button.disabled = current >= upgrade.max || (!saveData.infiniteCoins && saveData.credits < cost);
    button.addEventListener('click', () => {
      if (button.disabled) return;
      if (!saveData.infiniteCoins) saveData.credits -= cost;
      saveData.levels[upgrade.key]++;
      save();
      renderShop();
      updateHud();
    });
    row.append(info, button);
    upgradeList.appendChild(row);
  });
}

const keys = new Set();
let cheatShown = false;
let godMode = false;
let paused = false;
document.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();
  keys.add(key);
  if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) event.preventDefault();
  if (key === 'r' && gameOver) restart();
  if (keys.has('p') && keys.has('a') && keys.has('x') && !cheatShown) {
    cheatShown = true;
    renderMonsterList();
    cheatOverlay.classList.add('is-open');
  } else if (key === 'p' && !event.repeat && !keys.has('a') && !keys.has('x') && !gameOver && !shopOverlay.classList.contains('is-open')) {
    paused = !paused;
  }
});
document.addEventListener('keyup', event => {
  const key = event.key.toLowerCase();
  keys.delete(key);
  if (['p', 'a', 'x'].includes(key)) cheatShown = false;
});
window.addEventListener('blur', () => keys.clear());

document.getElementById('shopOpenBtn').addEventListener('click', () => {
  renderShop();
  shopOverlay.classList.add('is-open');
});
document.getElementById('shopCloseBtn').addEventListener('click', () => shopOverlay.classList.remove('is-open'));
document.getElementById('cheatCloseBtn').addEventListener('click', () => cheatOverlay.classList.remove('is-open'));
document.getElementById('cheatPointsBtn').addEventListener('click', () => {
  saveData.credits += 1000;
  save();
  renderShop();
  updateHud();
});
document.getElementById('infiniteCoinsBtn').textContent = `INFINITE COINS: ${saveData.infiniteCoins ? 'ON' : 'OFF'}`;
document.getElementById('infiniteCoinsBtn').addEventListener('click', event => {
  saveData.infiniteCoins = !saveData.infiniteCoins;
  event.currentTarget.textContent = `INFINITE COINS: ${saveData.infiniteCoins ? 'ON' : 'OFF'}`;
  save();
  renderShop();
  updateHud();
});
document.getElementById('godModeBtn').addEventListener('click', event => {
  godMode = !godMode;
  event.currentTarget.textContent = `GOD MODE: ${godMode ? 'ON' : 'OFF'}`;
  if (godMode) { player.hp = player.maxHp; updateHud(); }
});
document.getElementById('healBtn').addEventListener('click', () => {
  player.hp = player.maxHp;
  updateHud();
});
document.getElementById('maxUpgradesBtn').addEventListener('click', () => {
  upgrades.forEach(upgrade => { saveData.levels[upgrade.key] = upgrade.max; });
  save();
  renderShop();
  updateHud();
});
document.getElementById('clearEnemiesBtn').addEventListener('click', () => {
  enemies = [];
  bullets = [];
  enemyBullets = [];
  updateHud();
});
document.getElementById('scoreBoostBtn').addEventListener('click', () => {
  score += 10000;
  updateHud();
});

const pixelCanvas = document.getElementById('pixelCanvas');
const pixelContext = pixelCanvas.getContext('2d');
const pixelPalette = document.getElementById('pixelPalette');
const monsterList = document.getElementById('monsterList');
const pixelColors = ['#ffffff', '#ff0044', '#ffe100', '#00ffd0', '#00ff88', '#3388ff', '#ff00d4', '#ff8800'];
let selectedColor = pixelColors[1];
let pixelData = Array.from({ length: 16 }, () => Array(16).fill(null));
let monsters = [];
try {
  const storedMonsters = JSON.parse(localStorage.getItem('unknown-pixel-monsters') || '[]');
  if (Array.isArray(storedMonsters)) monsters = storedMonsters.filter(mon => mon && typeof mon.name === 'string' && Array.isArray(mon.pixels) && mon.pixels.length === 16);
} catch { /* Start with an empty monster collection. */ }

function drawPixelCanvas() {
  pixelContext.clearRect(0, 0, 16, 16);
  pixelData.forEach((row, y) => row.forEach((color, x) => {
    if (color) { pixelContext.fillStyle = color; pixelContext.fillRect(x, y, 1, 1); }
  }));
  pixelContext.strokeStyle = '#00ffd044';
  pixelContext.lineWidth = 0.04;
  for (let i = 0; i <= 16; i++) {
    pixelContext.beginPath(); pixelContext.moveTo(i, 0); pixelContext.lineTo(i, 16); pixelContext.stroke();
    pixelContext.beginPath(); pixelContext.moveTo(0, i); pixelContext.lineTo(16, i); pixelContext.stroke();
  }
}
pixelColors.forEach(color => {
  const button = document.createElement('button');
  button.type = 'button'; button.title = `Choose ${color}`;
  button.style.cssText = `width:25px;height:25px;padding:0;border:2px solid #b9f0ff;background:${color};cursor:pointer`;
  button.addEventListener('click', () => { selectedColor = color; });
  pixelPalette.appendChild(button);
});
const eraseButton = document.createElement('button');
eraseButton.type = 'button'; eraseButton.textContent = 'ERASE';
eraseButton.style.cssText = 'padding:3px 7px;color:#fff;background:#273244;border:1px solid #00ffd0;font:inherit;cursor:pointer';
eraseButton.addEventListener('click', () => { selectedColor = null; });
pixelPalette.appendChild(eraseButton);
function paintPixel(event) {
  const rect = pixelCanvas.getBoundingClientRect();
  const x = Math.max(0, Math.min(15, Math.floor((event.clientX - rect.left) / rect.width * 16)));
  const y = Math.max(0, Math.min(15, Math.floor((event.clientY - rect.top) / rect.height * 16)));
  pixelData[y][x] = selectedColor;
  drawPixelCanvas();
}
pixelCanvas.addEventListener('pointerdown', event => { pixelCanvas.setPointerCapture(event.pointerId); paintPixel(event); });
pixelCanvas.addEventListener('pointermove', event => { if (event.buttons) paintPixel(event); });
document.getElementById('saveMonsterBtn').addEventListener('click', () => {
  monsters.push({ name: document.getElementById('monsterName').value.trim() || `Monster ${monsters.length + 1}`, pixels: pixelData.map(row => [...row]) });
  try { localStorage.setItem('unknown-pixel-monsters', JSON.stringify(monsters)); } catch { /* Monsters remain available for this visit. */ }
  pixelData = Array.from({ length: 16 }, () => Array(16).fill(null));
  document.getElementById('monsterName').value = '';
  drawPixelCanvas(); renderMonsterList();
});
function renderMonsterList() {
  monsterList.replaceChildren();
  monsters.forEach((monster, index) => {
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px;background:#1c2840;color:#a0ffd0';
    const name = document.createElement('span'); name.textContent = monster.name;
    const spawn = document.createElement('button'); spawn.type = 'button'; spawn.textContent = 'SPAWN';
    spawn.className = 'action-button';
    spawn.addEventListener('click', () => {
      if (enemies.length < 40) { spawnEnemy(); Object.assign(enemies[enemies.length - 1], { pixels: monster.pixels, custom: true }); }
      cheatOverlay.classList.remove('is-open');
    });
    const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '×';
    remove.style.cssText = 'padding:5px 10px;color:#fff;background:#ff0044;border:0;font:inherit;cursor:pointer';
    remove.addEventListener('click', () => {
      monsters.splice(index, 1);
      try { localStorage.setItem('unknown-pixel-monsters', JSON.stringify(monsters)); } catch { /* Ignore unavailable storage. */ }
      renderMonsterList();
    });
    row.append(name, spawn, remove); monsterList.appendChild(row);
  });
}
drawPixelCanvas();
[shopOverlay, cheatOverlay].forEach(overlay => overlay.addEventListener('click', event => {
  if (event.target === overlay) overlay.classList.remove('is-open');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    shopOverlay.classList.remove('is-open');
    cheatOverlay.classList.remove('is-open');
  }
});

const player = { x: 400, y: 300, size: 20, hp: 3, fireTimer: 0, invulnerable: 0 };
let bullets = [];
let enemyBullets = [];
let enemies = [];
let score = 0;
let gameOver = false;
let spawnTimer = 0;
let wave = 1;
let waveSpawned = 0;
let waveQuota = 8;
let waveBreakTimer = 0;
let mouse = { x: 600, y: 300 };
let pointerDown = false;
let lastTime = 0;

function updateHud() {
  hud.textContent = `UNKNOWN.exe · WAVE ${wave} · SCORE ${score} · BEST ${saveData.best} · HP ${Math.max(0, player.hp)} · CREDITS ${saveData.infiniteCoins ? '∞' : saveData.credits}${godMode ? ' · GOD MODE' : ''}`;
}
function aimFromPointer(event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = (event.clientX - rect.left) * canvas.width / rect.width;
  mouse.y = (event.clientY - rect.top) * canvas.height / rect.height;
}
canvas.addEventListener('pointermove', aimFromPointer);
canvas.addEventListener('pointerdown', event => {
  aimFromPointer(event);
  pointerDown = true;
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener('pointerup', () => { pointerDown = false; });
canvas.addEventListener('pointercancel', () => { pointerDown = false; });

function shoot() {
  if (player.fireTimer > 0) return;
  const angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
  const speed = 8.5;
  bullets.push({ x: player.x, y: player.y, dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed, damage: 1 + level('damage') });
  player.fireTimer = Math.max(7, 18 - level('fire') * 2);
}
function spawnEnemy(variant = 'normal') {
  const edge = Math.floor(Math.random() * 4);
  const positions = [
    { x: Math.random() * canvas.width, y: -30 },
    { x: canvas.width + 30, y: Math.random() * canvas.height },
    { x: Math.random() * canvas.width, y: canvas.height + 30 },
    { x: -30, y: Math.random() * canvas.height }
  ];
  const pos = positions[edge];
  const angle = Math.atan2(player.y - pos.y, player.x - pos.x);
  const difficulty = Math.min(1.7, score / 400) + (wave - 1) * 0.08;
  const baseSpeed = 1.15 + difficulty + Math.random() * 0.5;
  const type = variant === 'normal'
    ? (wave >= 2 && Math.random() < 0.22 ? 'fast' : wave >= 3 && Math.random() < 0.18 ? 'tank' : 'normal')
    : variant;
  const size = type === 'boss' ? 58 : type === 'tank' ? 38 : type === 'fast' ? 18 : 22 + Math.random() * 10;
  const speed = type === 'boss' ? baseSpeed * 0.62 : type === 'tank' ? baseSpeed * 0.58 : type === 'fast' ? baseSpeed * 1.65 : baseSpeed;
  const hp = type === 'boss' ? 12 + wave * 2 : type === 'tank' ? 4 + Math.floor(wave / 3) : 1 + Math.floor(score / 180);
  enemies.push({ ...pos, dx: Math.cos(angle) * speed, dy: Math.sin(angle) * speed, size, hp, maxHp: hp, type, shotTimer: type === 'boss' ? 65 : 0 });
}
function restart() {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.hp = 3 + level('health');
  player.maxHp = player.hp;
  player.fireTimer = 0;
  player.invulnerable = 80;
  paused = false;
  bullets = [];
  enemyBullets = [];
  enemies = [];
  score = 0;
  wave = 1;
  waveSpawned = 0;
  waveQuota = 8;
  waveBreakTimer = 0;
  spawnTimer = 25;
  gameOver = false;
  shopOverlay.classList.remove('is-open');
  updateHud();
}
function endGame() {
  gameOver = true;
  saveData.credits += score;
  saveData.best = Math.max(saveData.best, score);
  save();
  renderShop();
  updateHud();
  setTimeout(() => { if (gameOver) shopOverlay.classList.add('is-open'); }, 550);
}

function update(delta) {
  if (gameOver || paused || shopOverlay.classList.contains('is-open') || cheatOverlay.classList.contains('is-open')) return;
  const step = Math.min(delta / 16.67, 2);
  if (waveBreakTimer > 0) {
    waveBreakTimer -= step;
    if (waveBreakTimer <= 0) {
      wave++;
      if (wave >= 5) window.Achievements?.unlock('unknown_wave5');
      waveSpawned = 0;
      waveQuota = 8 + wave * 2;
      spawnTimer = 45;
      updateHud();
    }
    return;
  }
  let dx = (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0);
  let dy = (keys.has('s') || keys.has('arrowdown') ? 1 : 0) - (keys.has('w') || keys.has('arrowup') ? 1 : 0);
  const magnitude = Math.hypot(dx, dy) || 1;
  const speed = 3.1 + level('speed') * 0.55;
  player.x = Math.max(player.size, Math.min(canvas.width - player.size, player.x + dx / magnitude * speed * step));
  player.y = Math.max(player.size, Math.min(canvas.height - player.size, player.y + dy / magnitude * speed * step));
  if (player.fireTimer > 0) player.fireTimer -= step;
  if ((pointerDown || keys.has(' ')) && player.fireTimer <= 0) shoot();
  if (player.invulnerable > 0) player.invulnerable -= step;

  bullets.forEach(bullet => { bullet.x += bullet.dx * step; bullet.y += bullet.dy * step; });
  bullets = bullets.filter(bullet => bullet.x > -20 && bullet.x < canvas.width + 20 && bullet.y > -20 && bullet.y < canvas.height + 20);
  enemyBullets.forEach(bullet => {
    bullet.x += bullet.dx * step;
    bullet.y += bullet.dy * step;
    if (!godMode && player.invulnerable <= 0 && Math.hypot(player.x - bullet.x, player.y - bullet.y) < player.size + bullet.size) {
      bullet.remove = true;
      player.hp--;
      player.invulnerable = 65;
      updateHud();
      if (player.hp <= 0) endGame();
    }
  });
  enemyBullets = enemyBullets.filter(bullet => !bullet.remove && bullet.x > -20 && bullet.x < canvas.width + 20 && bullet.y > -20 && bullet.y < canvas.height + 20);
  spawnTimer -= step;
  if (spawnTimer <= 0 && waveSpawned < waveQuota) {
    const variant = wave % 5 === 0 && waveSpawned === waveQuota - 1 ? 'boss' : 'normal';
    spawnEnemy(variant);
    waveSpawned++;
    spawnTimer = Math.max(24, 68 - score / 30) + Math.random() * 24;
  }
  enemies.forEach(enemy => {
    enemy.x += enemy.dx * step;
    enemy.y += enemy.dy * step;
    if (enemy.type === 'boss') {
      enemy.shotTimer -= step;
      if (enemy.shotTimer <= 0) {
        const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
        enemyBullets.push({ x: enemy.x, y: enemy.y, dx: Math.cos(angle) * 4.2, dy: Math.sin(angle) * 4.2, size: 7 });
        enemy.shotTimer = Math.max(36, 76 - wave * 2);
      }
    }
    bullets.forEach(bullet => {
      if (Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < enemy.size * .55) {
        enemy.hp -= bullet.damage;
        bullet.remove = true;
      }
    });
    if (!godMode && player.invulnerable <= 0 && Math.hypot(player.x - enemy.x, player.y - enemy.y) < enemy.size * .45 + player.size * .65) {
      enemy.remove = true;
      player.hp--;
      player.invulnerable = 65;
      updateHud();
      if (player.hp <= 0) endGame();
    }
  });
  const defeated = enemies.filter(enemy => enemy.hp <= 0);
  if (defeated.length) {
    score += defeated.reduce((total, enemy) => total + (enemy.type === 'boss' ? 100 : enemy.type === 'tank' ? 25 : enemy.type === 'fast' ? 15 : 10), 0);
    window.Achievements?.unlock('unknown_first_kill');
    if (score >= 1000) window.Achievements?.unlock('unknown_score1k');
    updateHud();
  }
  enemies = enemies.filter(enemy => !enemy.remove && enemy.hp > 0);
  bullets = bullets.filter(bullet => !bullet.remove);

  if (waveSpawned >= waveQuota && enemies.length === 0 && !gameOver) {
    score += wave * 25;
    if (player.hp < player.maxHp) player.hp++;
    waveBreakTimer = 150;
    updateHud();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.strokeStyle = '#00ffd012';
  ctx.lineWidth = 1;
  for (let x = 0; x <= canvas.width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke(); }
  for (let y = 0; y <= canvas.height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke(); }
  ctx.restore();
  if (waveBreakTimer > 0) {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.shadowColor = '#00ffd0'; ctx.shadowBlur = 18;
    ctx.fillStyle = '#ffe100'; ctx.font = 'bold 34px Share Tech Mono, monospace';
    ctx.fillText(`WAVE ${wave} CLEARED!`, canvas.width / 2, canvas.height / 2 - 8);
    ctx.fillStyle = '#dffffb'; ctx.font = '18px Share Tech Mono, monospace';
    ctx.fillText(`+${wave * 25} BONUS · REPAIR +1 HP`, canvas.width / 2, canvas.height / 2 + 28);
    ctx.restore();
  }
  bullets.forEach(bullet => {
    ctx.fillStyle = '#dfffff'; ctx.shadowColor = '#00ffd0'; ctx.shadowBlur = 15;
    ctx.fillRect(bullet.x - 4, bullet.y - 4, 8, 8);
  });
  enemyBullets.forEach(bullet => {
    ctx.fillStyle = '#ff684a'; ctx.shadowColor = '#ff684a'; ctx.shadowBlur = 14;
    ctx.beginPath(); ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2); ctx.fill();
  });
  enemies.forEach(enemy => {
    ctx.save(); ctx.translate(enemy.x, enemy.y); ctx.rotate(performance.now() / (enemy.type === 'fast' ? 300 : 600));
    if (enemy.custom && enemy.pixels) {
      const cell = enemy.size / 16;
      enemy.pixels.forEach((row, y) => row.forEach((color, x) => {
        if (color) { ctx.fillStyle = color; ctx.shadowColor = color; ctx.shadowBlur = 6; ctx.fillRect(-enemy.size / 2 + x * cell, -enemy.size / 2 + y * cell, cell, cell); }
      }));
      ctx.strokeStyle = '#00ffd0'; ctx.lineWidth = 2; ctx.shadowBlur = 10;
      ctx.strokeRect(-enemy.size / 2, -enemy.size / 2, enemy.size, enemy.size);
    } else {
      const colors = { normal: '#ff00d4', fast: '#ffe100', tank: '#ff684a', boss: '#a987ff' };
      const color = colors[enemy.type] || colors.normal;
      ctx.fillStyle = `${color}33`;
      ctx.strokeStyle = color; ctx.lineWidth = enemy.type === 'boss' ? 5 : 3;
      ctx.shadowColor = color; ctx.shadowBlur = enemy.type === 'boss' ? 28 : 18;
      ctx.fillRect(-enemy.size / 2, -enemy.size / 2, enemy.size, enemy.size);
      ctx.strokeRect(-enemy.size / 2, -enemy.size / 2, enemy.size, enemy.size);
      if (enemy.type === 'boss') {
        ctx.rotate(-performance.now() / 600);
        ctx.strokeStyle = '#ffe100'; ctx.lineWidth = 2; ctx.shadowColor = '#ffe100';
        ctx.strokeRect(-enemy.size * .68, -enemy.size * .68, enemy.size * 1.36, enemy.size * 1.36);
      }
    }
    ctx.restore();
    if (enemy.type === 'boss' && !enemy.custom) {
      const barWidth = 64;
      ctx.fillStyle = '#24143a'; ctx.fillRect(enemy.x - barWidth / 2, enemy.y - enemy.size / 2 - 12, barWidth, 5);
      ctx.fillStyle = '#ff5ec6'; ctx.fillRect(enemy.x - barWidth / 2, enemy.y - enemy.size / 2 - 12, barWidth * Math.max(0, enemy.hp / enemy.maxHp), 5);
    }
  });
  if (player.invulnerable <= 0 || Math.floor(performance.now() / 80) % 2 === 0) {
    ctx.save(); ctx.translate(player.x, player.y);
    ctx.fillStyle = '#00ffd0'; ctx.shadowColor = '#00ffd0'; ctx.shadowBlur = 22;
    ctx.fillRect(-player.size / 2, -player.size / 2, player.size, player.size);
    ctx.fillStyle = '#eaffff'; ctx.fillRect(-5, -5, 10, 10);
    ctx.restore();
  }
  if (paused && !gameOver) {
    ctx.fillStyle = '#02040bbf'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center'; ctx.shadowColor = '#00ffd0'; ctx.shadowBlur = 18;
    ctx.fillStyle = '#00ffd0'; ctx.font = 'bold 42px Share Tech Mono, monospace';
    ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    ctx.shadowBlur = 0; ctx.fillStyle = '#dffffb'; ctx.font = '18px Share Tech Mono, monospace';
    ctx.fillText('Press P to resume', canvas.width / 2, canvas.height / 2 + 34);
  }
  if (gameOver) {
    ctx.fillStyle = '#02040bd9'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center'; ctx.shadowColor = '#00ffd0'; ctx.shadowBlur = 15;
    ctx.fillStyle = '#fff'; ctx.font = '48px Share Tech Mono, monospace'; ctx.fillText('YOU DIED', canvas.width / 2, canvas.height / 2 - 12);
    ctx.font = '22px Share Tech Mono, monospace'; ctx.fillText('Press R to restart', canvas.width / 2, canvas.height / 2 + 32);
  }
}
function frame(now) {
  const delta = lastTime ? now - lastTime : 16.67;
  lastTime = now;
  update(delta);
  draw();
  requestAnimationFrame(frame);
}

restart();
requestAnimationFrame(frame);
