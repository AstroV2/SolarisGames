const canvas = document.getElementById('drift-canvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('drift-overlay');
const levelOverlay = document.getElementById('level-overlay');
const pauseTag = document.getElementById('pause-tag');
const startButton = document.getElementById('start-button');
const keys = new Set();
const touchDirections = new Set();
const adminPanel = document.getElementById('drift-admin');
const adminMods = { invulnerable: false, rapidFire: false };
let adminPreviousState = 'ready';
const BEST_SCORE_KEY = 'neon-drift-best-score';
let bestScore = 0;
try {
  const storedBest = Number(localStorage.getItem(BEST_SCORE_KEY));
  if (Number.isFinite(storedBest) && storedBest >= 0) bestScore = storedBest;
} catch { /* Best score remains session-only if storage is unavailable. */ }

function openAdmin() {
  if (!adminPanel.hidden) return;
  adminPreviousState = game.state === 'paused' && keys.has('p') ? 'playing' : game.state;
  if (game.state === 'playing') {
    game.state = 'paused';
    cancelAnimationFrame(animationId);
    pauseTag.hidden = true;
  }
  adminPanel.hidden = false;
  document.getElementById('drift-admin-close').focus();
}

function closeAdmin() {
  if (adminPanel.hidden) return;
  adminPanel.hidden = true;
  keys.clear();
  if (adminPreviousState === 'playing') {
    game.state = 'playing';
    lastFrame = performance.now();
    animationId = requestAnimationFrame(loop);
  }
}

const hud = {
  wave: document.getElementById('wave-value'),
  score: document.getElementById('score-value'),
  best: document.getElementById('best-value'),
  health: document.getElementById('health-value'),
  level: document.getElementById('level-value'),
  xp: document.getElementById('xp-fill')
};

const upgrades = [
  { name: 'OVERCHARGE', detail: '+25% pulse damage', apply: () => { game.damage += 5; } },
  { name: 'RAPID FIRE', detail: '+20% firing speed', apply: () => { game.fireRate = Math.max(.13, game.fireRate * .8); } },
  { name: 'PHASE ARMOR', detail: '+1 shield pip', apply: () => { game.maxHealth++; game.health = Math.min(game.maxHealth, game.health + 1); } },
  { name: 'THRUST COILS', detail: '+12% movement speed', apply: () => { game.speed *= 1.12; } },
  { name: 'WIDE PULSE', detail: '+30% pulse radius', apply: () => { game.bulletSize += 1.5; } },
  { name: 'QUICK CHARGE', detail: 'Dash recharges 25% faster', apply: () => { game.dashCooldown *= .75; } }
];

let width = 800;
let height = 520;
let lastFrame = 0;
let animationId = 0;
let game;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = Math.max(320, rect.width);
  height = Math.max(300, rect.height);
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (game?.player) {
    game.player.x = Math.min(Math.max(18, game.player.x), width - 18);
    game.player.y = Math.min(Math.max(18, game.player.y), height - 18);
  }
  draw();
}

function freshGame() {
  game = {
    state: 'ready', time: 0, score: 0, wave: 1, kills: 0,
    player: { x: width / 2, y: height / 2, radius: 11, angle: -Math.PI / 2, invulnerable: 0, dashTime: 0, dashCooldownLeft: 0 },
    health: 3, maxHealth: 3, level: 1, xp: 0, nextXp: 6,
    speed: 220, damage: 20, fireRate: .38, bulletSize: 3,
    enemies: [], bullets: [], enemyBullets: [], shards: [], particles: [],
    fireTimer: 0, spawnTimer: 0, waveTimer: 0, dashCooldown: 2.2
  };
  if (adminMods.rapidFire) game.fireRate = .06;
  updateHud();
}

function updateHud() {
  hud.wave.textContent = String(game.wave).padStart(2, '0');
  hud.score.textContent = String(game.score).padStart(6, '0');
  hud.best.textContent = `BEST ${String(bestScore).padStart(6, '0')}`;
  hud.health.textContent = `${'♥ '.repeat(game.health)}${'· '.repeat(Math.max(0, game.maxHealth - game.health))}`.trim();
  hud.level.textContent = `LV ${game.level}`;
  hud.xp.style.width = `${Math.min(100, game.xp / game.nextXp * 100)}%`;
}

function startRun() {
  if (animationId) cancelAnimationFrame(animationId);
  freshGame();
  game.state = 'playing';
  overlay.hidden = true;
  levelOverlay.hidden = true;
  pauseTag.hidden = true;
  lastFrame = performance.now();
  animationId = requestAnimationFrame(loop);
}

function endRun() {
  game.state = 'over';
  const newRecord = game.score > bestScore;
  if (newRecord) {
    bestScore = game.score;
    try { localStorage.setItem(BEST_SCORE_KEY, String(bestScore)); } catch { /* Keep the record for this visit. */ }
  }
  updateHud();
  overlay.hidden = false;
  document.getElementById('overlay-kicker').textContent = 'RUN COMPLETE · WAVE ' + game.wave;
  document.getElementById('overlay-title').textContent = newRecord ? 'NEW HIGH SCORE!' : 'SYSTEM DOWN';
  document.getElementById('overlay-message').innerHTML = `Final score: <b>${game.score.toLocaleString()}</b> · Best: <b>${bestScore.toLocaleString()}</b><br>Enemies cleared: <b>${game.kills}</b> · Every run is a new chance to go further.`;
  startButton.innerHTML = 'RUN IT BACK <span>↻</span>';
  pauseTag.hidden = true;
  draw();
}

function togglePause() {
  if (game.state === 'playing') {
    game.state = 'paused';
    pauseTag.hidden = false;
  } else if (game.state === 'paused') {
    game.state = 'playing';
    pauseTag.hidden = true;
    lastFrame = performance.now();
    animationId = requestAnimationFrame(loop);
  }
}

function moveVector() {
  const x = Number(keys.has('ArrowRight') || keys.has('d') || touchDirections.has('right')) - Number(keys.has('ArrowLeft') || keys.has('a') || touchDirections.has('left'));
  const y = Number(keys.has('ArrowDown') || keys.has('s') || touchDirections.has('down')) - Number(keys.has('ArrowUp') || keys.has('w') || touchDirections.has('up'));
  const length = Math.hypot(x, y) || 1;
  return { x: x / length, y: y / length, moving: Boolean(x || y) };
}

function spawnEnemy() {
  const edge = Math.floor(Math.random() * 4);
  const padding = 22;
  const point = edge === 0 ? { x: Math.random() * width, y: -padding }
    : edge === 1 ? { x: width + padding, y: Math.random() * height }
      : edge === 2 ? { x: Math.random() * width, y: height + padding }
        : { x: -padding, y: Math.random() * height };
  const roll = Math.random();
  const type = game.wave >= 3 && roll < .16 ? 'tank' : game.wave >= 2 && roll < .43 ? 'runner' : 'drone';
  const configs = {
    drone: { radius: 12, hp: 30 + game.wave * 3, speed: 52 + Math.min(42, game.wave * 2), color: '#ff4d88', score: 100, xp: 1 },
    runner: { radius: 9, hp: 19 + game.wave * 2, speed: 100 + Math.min(55, game.wave * 2), color: '#ffe15a', score: 150, xp: 1 },
    tank: { radius: 18, hp: 100 + game.wave * 12, speed: 31 + Math.min(24, game.wave), color: '#b88cff', score: 300, xp: 3 }
  };
  game.enemies.push({ ...point, ...configs[type], type, maxHp: configs[type].hp, hitFlash: 0 });
}

function shoot() {
  if (!game.enemies.length) return;
  let target = null;
  let best = Infinity;
  for (const enemy of game.enemies) {
    const distance = Math.hypot(enemy.x - game.player.x, enemy.y - game.player.y);
    if (distance < best) { best = distance; target = enemy; }
  }
  if (!target) return;
  const angle = Math.atan2(target.y - game.player.y, target.x - game.player.x);
  game.player.angle = angle;
  game.bullets.push({ x: game.player.x + Math.cos(angle) * 15, y: game.player.y + Math.sin(angle) * 15, vx: Math.cos(angle) * 460, vy: Math.sin(angle) * 460, life: 1.5, damage: game.damage, radius: game.bulletSize });
  burst(game.player.x + Math.cos(angle) * 16, game.player.y + Math.sin(angle) * 16, '#5ef5ff', 3, 65);
}

function burst(x, y, color, count = 8, speed = 130) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const velocity = speed * (.25 + Math.random() * .75);
    game.particles.push({ x, y, vx: Math.cos(angle) * velocity, vy: Math.sin(angle) * velocity, life: .25 + Math.random() * .38, maxLife: .63, color, radius: 1.5 + Math.random() * 2.5 });
  }
}

function collectShard(shard) {
  window.Achievements?.unlock('drift_first_shard');
  game.xp += shard.value;
  game.score += 10;
  burst(shard.x, shard.y, '#70ffbd', 7, 95);
  if (game.xp >= game.nextXp) {
    game.xp -= game.nextXp;
    game.level++;
    if (game.level >= 5) window.Achievements?.unlock('drift_level5');
    game.nextXp = Math.ceil(game.nextXp * 1.35 + 2);
    game.state = 'levelup';
    showUpgrades();
  }
  updateHud();
}

function showUpgrades() {
  const container = document.getElementById('upgrade-options');
  container.replaceChildren();
  const choices = [...upgrades].sort(() => Math.random() - .5).slice(0, 3);
  for (const upgrade of choices) {
    const button = document.createElement('button');
    button.className = 'upgrade-card';
    button.type = 'button';
    button.innerHTML = `<b>${upgrade.name}</b><span>${upgrade.detail}</span>`;
    button.addEventListener('click', () => {
      upgrade.apply();
      levelOverlay.hidden = true;
      game.state = 'playing';
      updateHud();
      lastFrame = performance.now();
      animationId = requestAnimationFrame(loop);
    });
    container.appendChild(button);
  }
  levelOverlay.hidden = false;
}

function update(dt) {
  game.time += dt;
  const player = game.player;
  player.invulnerable = Math.max(0, player.invulnerable - dt);
  player.dashCooldownLeft = Math.max(0, player.dashCooldownLeft - dt);
  player.dashTime = Math.max(0, player.dashTime - dt);
  const move = moveVector();
  if (keys.has(' ') && player.dashCooldownLeft <= 0) {
    if (move.moving) { player.vx = move.x; player.vy = move.y; }
    else { player.vx = Math.cos(player.angle); player.vy = Math.sin(player.angle); }
    player.dashTime = .19;
    player.dashCooldownLeft = game.dashCooldown;
    player.invulnerable = .32;
    keys.delete(' ');
    burst(player.x, player.y, '#5ef5ff', 12, 180);
  }
  const dashMultiplier = player.dashTime > 0 ? 4.5 : 1;
  player.x = Math.max(player.radius, Math.min(width - player.radius, player.x + move.x * game.speed * dashMultiplier * dt));
  player.y = Math.max(player.radius, Math.min(height - player.radius, player.y + move.y * game.speed * dashMultiplier * dt));
  if (move.moving) player.angle = Math.atan2(move.y, move.x);

  game.fireTimer -= dt;
  if (game.fireTimer <= 0) { shoot(); game.fireTimer = game.fireRate; }
  game.spawnTimer -= dt;
  if (game.spawnTimer <= 0) {
    spawnEnemy();
    if (game.wave >= 4 && Math.random() < .22) spawnEnemy();
    game.spawnTimer = Math.max(.25, .95 - game.wave * .045) * (.75 + Math.random() * .5);
  }

  for (const enemy of game.enemies) {
    const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    enemy.x += Math.cos(angle) * enemy.speed * dt;
    enemy.y += Math.sin(angle) * enemy.speed * dt;
    enemy.hitFlash = Math.max(0, enemy.hitFlash - dt);
    if (Math.hypot(player.x - enemy.x, player.y - enemy.y) < player.radius + enemy.radius && player.invulnerable <= 0 && !adminMods.invulnerable) {
      game.health--;
      player.invulnerable = 1;
      burst(player.x, player.y, '#ff5079', 18, 190);
      updateHud();
      if (game.health <= 0) { endRun(); return; }
    }
  }

  for (const bullet of game.bullets) {
    bullet.x += bullet.vx * dt; bullet.y += bullet.vy * dt; bullet.life -= dt;
    for (const enemy of game.enemies) {
      if (enemy.hp > 0 && Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y) < bullet.radius + enemy.radius) {
        enemy.hp -= bullet.damage; enemy.hitFlash = .08; bullet.life = 0;
        burst(bullet.x, bullet.y, enemy.color, 2, 55);
        if (enemy.hp <= 0) {
          game.score += enemy.score;
          game.kills++;
          if (game.kills >= 50) window.Achievements?.unlock('drift_kills50');
          game.shards.push({ x: enemy.x, y: enemy.y, radius: 5, value: enemy.xp, phase: Math.random() * 6 });
          burst(enemy.x, enemy.y, enemy.color, 12, 155);
        }
        break;
      }
    }
  }
  game.bullets = game.bullets.filter(b => b.life > 0 && b.x > -20 && b.x < width + 20 && b.y > -20 && b.y < height + 20);
  game.enemies = game.enemies.filter(enemy => enemy.hp > 0);
  for (const shard of game.shards) {
    shard.phase += dt * 3;
    const distance = Math.hypot(player.x - shard.x, player.y - shard.y);
    if (distance < 82) {
      const angle = Math.atan2(player.y - shard.y, player.x - shard.x);
      const pull = distance < 25 ? 230 : 125;
      shard.x += Math.cos(angle) * pull * dt;
      shard.y += Math.sin(angle) * pull * dt;
    }
    if (distance < player.radius + shard.radius + 4) { shard.collected = true; collectShard(shard); }
  }
  game.shards = game.shards.filter(shard => !shard.collected);
  for (const particle of game.particles) {
    particle.x += particle.vx * dt; particle.y += particle.vy * dt;
    particle.vx *= Math.max(0, 1 - dt * 3); particle.vy *= Math.max(0, 1 - dt * 3);
    particle.life -= dt;
  }
  game.particles = game.particles.filter(particle => particle.life > 0);

  game.waveTimer += dt;
  if (game.waveTimer >= 22) {
    game.waveTimer = 0;
    game.wave++;
    if (game.wave >= 5) window.Achievements?.unlock('drift_wave5');
    updateHud();
  }
  updateHud();
}

function draw() {
  if (!ctx || !game) return;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#0c1220'; ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = 'rgba(94,245,255,.075)'; ctx.lineWidth = 1;
  for (let x = 20; x < width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
  for (let y = 20; y < height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
  const vignette = ctx.createRadialGradient(width / 2, height / 2, height * .12, width / 2, height / 2, Math.max(width, height) * .7);
  vignette.addColorStop(0, 'transparent'); vignette.addColorStop(1, 'rgba(3,5,14,.62)');
  ctx.fillStyle = vignette; ctx.fillRect(0, 0, width, height);

  for (const shard of game.shards) {
    ctx.save(); ctx.translate(shard.x, shard.y); ctx.rotate(Math.PI / 4 + Math.sin(shard.phase) * .15);
    ctx.shadowBlur = 14; ctx.shadowColor = '#70ffbd'; ctx.fillStyle = '#70ffbd';
    ctx.fillRect(-shard.radius / 2, -shard.radius / 2, shard.radius, shard.radius); ctx.restore();
  }
  for (const bullet of game.bullets) {
    ctx.beginPath(); ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#5ef5ff'; ctx.shadowColor = '#5ef5ff'; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;
  }
  for (const enemy of game.enemies) {
    ctx.save(); ctx.translate(enemy.x, enemy.y); ctx.rotate(game.time * (enemy.type === 'runner' ? 2 : .7));
    ctx.shadowColor = enemy.color; ctx.shadowBlur = enemy.hitFlash ? 24 : 13;
    ctx.fillStyle = enemy.hitFlash ? '#fff' : enemy.color;
    ctx.beginPath();
    const points = enemy.type === 'tank' ? 6 : 4;
    for (let i = 0; i < points; i++) {
      const angle = (Math.PI * 2 * i / points) - Math.PI / 2;
      const radius = enemy.radius * (i % 2 === 0 ? 1 : .75);
      const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath(); ctx.fill(); ctx.shadowBlur = 0;
    if (enemy.hp < enemy.maxHp) {
      ctx.fillStyle = '#24182d'; ctx.fillRect(-enemy.radius, -enemy.radius - 8, enemy.radius * 2, 3);
      ctx.fillStyle = enemy.color; ctx.fillRect(-enemy.radius, -enemy.radius - 8, enemy.radius * 2 * Math.max(0, enemy.hp / enemy.maxHp), 3);
    }
    ctx.restore();
  }
  for (const particle of game.particles) {
    ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
    ctx.fillStyle = particle.color; ctx.fillRect(particle.x, particle.y, particle.radius, particle.radius);
  }
  ctx.globalAlpha = 1;
  const player = game.player;
  if (player) {
    ctx.save(); ctx.translate(player.x, player.y); ctx.rotate(player.angle);
    if (player.invulnerable > 0 && Math.floor(game.time * 18) % 2 === 0) ctx.globalAlpha = .4;
    ctx.shadowColor = '#5ef5ff'; ctx.shadowBlur = player.dashTime > 0 ? 28 : 17;
    ctx.fillStyle = '#d8ffff'; ctx.strokeStyle = '#5ef5ff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(15, 0); ctx.lineTo(-9, -9); ctx.lineTo(-5, 0); ctx.lineTo(-9, 9); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
    if (player.dashCooldownLeft > 0) {
      ctx.beginPath(); ctx.arc(player.x, player.y, 17, -Math.PI / 2, -Math.PI / 2 + (1 - player.dashCooldownLeft / game.dashCooldown) * Math.PI * 2);
      ctx.strokeStyle = '#5ef5ff99'; ctx.lineWidth = 2; ctx.stroke();
    }
  }
}

function loop(now) {
  if (game.state !== 'playing') return;
  const dt = Math.min(.04, (now - lastFrame) / 1000);
  lastFrame = now;
  update(dt);
  draw();
  if (game.state === 'playing') animationId = requestAnimationFrame(loop);
}

startButton.addEventListener('click', startRun);
document.getElementById('drift-admin-close').addEventListener('click', closeAdmin);
document.getElementById('drift-god-mode').addEventListener('change', event => {
  adminMods.invulnerable = event.target.checked;
});
document.getElementById('drift-rapid-fire').addEventListener('change', event => {
  adminMods.rapidFire = event.target.checked;
  if (game) game.fireRate = adminMods.rapidFire ? .06 : .38;
});
document.getElementById('drift-admin-heal').addEventListener('click', () => {
  game.health = game.maxHealth;
  updateHud();
});
document.getElementById('drift-admin-score').addEventListener('click', () => {
  game.score += 10000;
  updateHud();
});
document.getElementById('drift-admin-clear').addEventListener('click', () => {
  game.enemies = [];
  game.enemyBullets = [];
});
document.getElementById('drift-admin-overdrive').addEventListener('click', () => {
  game.speed = 420;
  game.damage = 100;
  game.fireRate = .06;
  game.bulletSize = 7;
  game.dashCooldown = .5;
  game.maxHealth = Math.max(10, game.maxHealth);
  game.health = game.maxHealth;
  updateHud();
});
document.addEventListener('keydown', event => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(key)) event.preventDefault();
  keys.add(key);
  if (keys.has('p') && keys.has('a') && keys.has('x')) {
    event.preventDefault();
    openAdmin();
    return;
  }
  if (key === 'Escape' && !adminPanel.hidden) { closeAdmin(); return; }
  if (!adminPanel.hidden) return;
  if (key === 'p' && !event.repeat && (game.state === 'playing' || game.state === 'paused')) { togglePause(); return; }
});
document.addEventListener('keyup', event => keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key));
window.addEventListener('blur', () => { keys.clear(); touchDirections.clear(); });

document.querySelectorAll('[data-move]').forEach(button => {
  const direction = button.dataset.move;
  button.addEventListener('pointerdown', event => { event.preventDefault(); touchDirections.add(direction); button.setPointerCapture(event.pointerId); });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) button.addEventListener(type, () => touchDirections.delete(direction));
});
document.getElementById('touch-dash').addEventListener('pointerdown', event => { event.preventDefault(); keys.add(' '); });

freshGame();
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
