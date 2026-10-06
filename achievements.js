(() => {
  const KEY = 'solaris-achievements-v1';
  const achievements = [
    { id: 'power_first_roll', game: 'SUPERPOWER RNG', title: 'First Spark', description: 'Roll your first superpower.' },
    { id: 'power_legendary', game: 'SUPERPOWER RNG', title: 'The Odds Were in Your Favor', description: 'Roll a Legendary power or better.' },
    { id: 'power_mythic', game: 'SUPERPOWER RNG', title: 'Mythical Find', description: 'Roll a Mythic power.' },
    { id: 'power_collection', game: 'SUPERPOWER RNG', title: 'Power Collector', description: 'Collect 10 different superpowers.' },
    { id: 'alchemy_first', game: 'INFINITE ALCHEMY', title: 'Little Big Bang', description: 'Discover your first new element.' },
    { id: 'alchemy_10', game: 'INFINITE ALCHEMY', title: 'Curious Chemist', description: 'Discover 10 elements.' },
    { id: 'alchemy_25', game: 'INFINITE ALCHEMY', title: 'World Builder', description: 'Discover 25 elements.' },
    { id: 'unknown_first_kill', game: 'UNKNOWN.exe', title: 'First Contact', description: 'Defeat your first corrupted enemy.' },
    { id: 'unknown_wave5', game: 'UNKNOWN.exe', title: 'Into the Deep', description: 'Reach wave 5.' },
    { id: 'unknown_score1k', game: 'UNKNOWN.exe', title: 'Arcade Ace', description: 'Earn 1,000 points in a run.' },
    { id: 'drift_first_shard', game: 'NEON DRIFT', title: 'Energy Online', description: 'Collect your first energy shard.' },
    { id: 'drift_level5', game: 'NEON DRIFT', title: 'Fully Charged', description: 'Reach level 5 in a run.' },
    { id: 'drift_kills50', game: 'NEON DRIFT', title: 'Swarm Breaker', description: 'Destroy 50 enemies in one run.' },
    { id: 'drift_wave5', game: 'NEON DRIFT', title: 'Still Drifting', description: 'Reach wave 5.' }
  ];
  let earned = [];
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (Array.isArray(saved)) earned = saved.filter(id => achievements.some(item => item.id === id));
  } catch { /* Achievements still work for this visit if storage is unavailable. */ }

  const style = document.createElement('style');
  style.textContent = `
    .solaris-achievement-button{position:fixed;z-index:10001;top:18px;right:18px;padding:9px 12px;color:#ffe15a;background:#171123;border:1px solid #ffe15a;box-shadow:0 0 14px #ffe15a33;font:700 11px 'Orbitron','Roboto Mono',monospace;cursor:pointer}
    .solaris-achievement-button:hover,.solaris-achievement-button:focus-visible{color:#171123;background:#ffe15a;outline:none}
    .solaris-achievement-panel{position:fixed;z-index:10002;top:62px;right:18px;width:min(360px,calc(100vw - 36px));max-height:min(70vh,600px);overflow:auto;padding:16px;color:#fff;background:#171123;border:1px solid #5ec6ff;box-shadow:0 0 24px #5ec6ff44;font:12px 'Roboto Mono','Courier New',monospace}
    .solaris-achievement-panel[hidden]{display:none}
    .solaris-achievement-heading{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:12px;color:#ffe15a;font:700 14px 'Orbitron',sans-serif}
    .solaris-achievement-close{padding:5px 8px;color:#171123;background:#5ec6ff;border:0;font-weight:700;cursor:pointer}
    .solaris-achievement-list{display:grid;gap:7px}
    .solaris-achievement-item{padding:10px;background:#221a32;border-left:3px solid #655d70;opacity:.58}
    .solaris-achievement-item.is-earned{border-color:#70ffbd;opacity:1}
    .solaris-achievement-item strong{display:block;margin-bottom:4px;color:#f6eaff;font:700 11px 'Orbitron',sans-serif}
    .solaris-achievement-item.is-earned strong{color:#70ffbd}
    .solaris-achievement-item small{display:block;margin-bottom:4px;color:#5ec6ff;font-size:9px;letter-spacing:.08em}
    .solaris-achievement-item span{color:#c9bfd9;font-size:10px;line-height:1.5}
    .solaris-achievement-toast{position:fixed;z-index:10003;top:18px;right:18px;display:flex;align-items:center;gap:12px;width:min(370px,calc(100vw - 36px));padding:13px 16px;color:#fff;background:linear-gradient(110deg,#172638,#192b2b);border:1px solid #70ffbd;box-shadow:0 0 24px #70ffbd55,5px 5px 0 #071521;font:12px 'Roboto Mono','Courier New',monospace;transform:translateX(calc(100% + 28px));opacity:0;pointer-events:none}
    .solaris-achievement-toast.is-visible{animation:solaris-achievement-in .48s cubic-bezier(.2,.9,.25,1.15) forwards,solaris-achievement-out .4s ease-in 4.2s forwards}
    .solaris-achievement-icon{flex:none;color:#ffe15a;font-size:25px;text-shadow:0 0 12px #ffe15a}
    .solaris-achievement-copy strong{display:block;margin-bottom:4px;color:#70ffbd;font:700 9px 'Orbitron',sans-serif;letter-spacing:.12em}
    .solaris-achievement-copy b{display:block;margin-bottom:3px;color:#fff;font:700 13px 'Orbitron',sans-serif}
    .solaris-achievement-copy span{color:#b9c9d7;font-size:10px}
    @keyframes solaris-achievement-in{from{transform:translateX(calc(100% + 28px));opacity:0}to{transform:translateX(0);opacity:1}}
    @keyframes solaris-achievement-out{to{transform:translateX(calc(100% + 28px));opacity:0}}
    @media(max-width:560px){.solaris-achievement-button{top:12px;right:12px;font-size:9px}.solaris-achievement-panel{top:56px;right:12px}.solaris-achievement-toast{top:12px;right:12px}}
    @media(prefers-reduced-motion:reduce){.solaris-achievement-toast.is-visible{animation:none;transform:none;opacity:1}}
  `;
  document.head.appendChild(style);

  const button = document.createElement('button');
  button.className = 'solaris-achievement-button';
  button.type = 'button';
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'View achievements');
  const panel = document.createElement('section');
  panel.className = 'solaris-achievement-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Achievements');
  const toast = document.createElement('div');
  toast.className = 'solaris-achievement-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.append(button, panel, toast);

  function render() {
    button.textContent = `🏆 ${earned.length} / ${achievements.length}`;
    panel.replaceChildren();
    const heading = document.createElement('div');
    heading.className = 'solaris-achievement-heading';
    const title = document.createElement('span');
    title.textContent = `ACHIEVEMENTS · ${earned.length}/${achievements.length}`;
    const close = document.createElement('button');
    close.className = 'solaris-achievement-close';
    close.type = 'button';
    close.textContent = 'CLOSE';
    close.addEventListener('click', () => togglePanel(false));
    heading.append(title, close);
    const list = document.createElement('div');
    list.className = 'solaris-achievement-list';
    achievements.forEach(item => {
      const row = document.createElement('article');
      const unlocked = earned.includes(item.id);
      row.className = `solaris-achievement-item${unlocked ? ' is-earned' : ''}`;
      const game = document.createElement('small'); game.textContent = item.game;
      const name = document.createElement('strong'); name.textContent = `${unlocked ? '✦' : '🔒'} ${item.title}`;
      const description = document.createElement('span'); description.textContent = item.description;
      row.append(game, name, description);
      list.appendChild(row);
    });
    panel.append(heading, list);
  }
  function togglePanel(open = panel.hidden) {
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
  }
  const notificationQueue = [];
  let toastBusy = false;
  function showNextToast() {
    if (toastBusy || !notificationQueue.length) return;
    toastBusy = true;
    const achievement = notificationQueue.shift();
    toast.replaceChildren();
    const icon = document.createElement('span'); icon.className = 'solaris-achievement-icon'; icon.textContent = '✦';
    const copy = document.createElement('div'); copy.className = 'solaris-achievement-copy';
    const label = document.createElement('strong'); label.textContent = 'ACHIEVEMENT UNLOCKED';
    const name = document.createElement('b'); name.textContent = achievement.title;
    const description = document.createElement('span'); description.textContent = achievement.description;
    copy.append(label, name, description);
    toast.append(icon, copy);
    toast.classList.remove('is-visible');
    void toast.offsetWidth;
    toast.classList.add('is-visible');
    window.setTimeout(() => {
      toast.classList.remove('is-visible');
      window.setTimeout(() => { toastBusy = false; showNextToast(); }, 450);
    }, 4700);
  }
  button.addEventListener('click', () => togglePanel());
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') togglePanel(false);
  });

  function unlock(id) {
    const achievement = achievements.find(item => item.id === id);
    if (!achievement || earned.includes(id)) return false;
    earned.push(id);
    try { localStorage.setItem(KEY, JSON.stringify(earned)); } catch { /* Keep the unlock for this visit. */ }
    render();
    notificationQueue.push(achievement);
    showNextToast();
    return true;
  }

  render();
  window.Achievements = Object.freeze({ unlock });
})();
