const superpowers = [
  { name: 'Slightly Toasty Fingers', desc: 'Your fingers are always warm. Great for typing in the winter.', rarity: 'common' },
  { name: 'Perfect Coin Flip', desc: 'You can flip a coin and it always lands... somewhere.', rarity: 'common' },
  { name: 'Mildly Magnetic', desc: 'Small paperclips are sometimes attracted to you.', rarity: 'common' },
  { name: 'Unremarkable Invisibility', desc: 'You become invisible to houseplants.', rarity: 'common' },
  { name: 'Shoe-Lace Telepathy', desc: 'You know when your shoes are about to come untied.', rarity: 'common' },
  { name: 'Sneeze Prediction', desc: 'You can sense a sneeze coming 1.2 seconds before it happens.', rarity: 'common' },
  { name: 'Sock Sorting', desc: 'You can always find matching socks instantly.', rarity: 'common' },
  { name: 'Unburnable Toast', desc: 'Your toast never burns, no matter what.', rarity: 'common' },
  { name: 'Left-Handed Dexterity', desc: 'You can use your left hand as well as your right...for scratching.', rarity: 'common' },
  { name: 'Deal Dough Master', desc: 'Jack Kelley...', rarity: 'common' },
  { name: 'FAIL', desc: 'You Got NOTHING', rarity: 'nothing' },
  { name: 'WIN', desc: 'You Got EVERY power', rarity: 'everything' },
  { name: 'Bubble Summoner', desc: 'Create a single bubble out of thin air, once per hour.', rarity: 'rare' },
  { name: 'Cat Whisperer', desc: 'Cats will approach you... sometimes.', rarity: 'rare' },
  { name: 'Rapid Regrowth (Nails)', desc: 'Your fingernails grow at 2x speed.', rarity: 'rare' },
  { name: 'Pencil Duplication', desc: 'Duplicate any pencil you are holding.', rarity: 'rare' },
  { name: 'WiFi Sensing', desc: 'You can sense the presence of WiFi (but not the password).', rarity: 'rare' },
  { name: 'Color Vision in the Dark', desc: 'See faint colors in pitch darkness.', rarity: 'rare' },
  { name: 'Time Pause (1 Second)', desc: 'Pause time for exactly 1 second, once a day.', rarity: 'epic' },
  { name: 'Reverse Gravity (Small Objects)', desc: 'You can flip the gravity of coins and marbles.', rarity: 'epic' },
  { name: 'Teleport (1 Meter)', desc: 'Teleport up to 1 meter away, but only sideways.', rarity: 'epic' },
  { name: 'Translate Animal Noises', desc: 'Understand what animals are vaguely feeling.', rarity: 'epic' },
  { name: 'Coffee Summon', desc: 'Summon a cup of cold coffee. Once per hour.', rarity: 'epic' },
  { name: 'Photographic Memory (Short-Term)', desc: 'Remember anything for 10 minutes perfectly.', rarity: 'epic' },
  { name: 'Debug Power', desc: 'Power Of Debug', rarity: 'epic' },
  { name: 'Lightning Speed (Walking Only)', desc: 'You walk at the speed of a cheetah. Running is normal speed.', rarity: 'legendary' },
  { name: 'Mind-Reading (Goldfish)', desc: 'Read the thoughts of any goldfish.', rarity: 'legendary' },
  { name: 'Weather Control (Small Cloud)', desc: 'Summon a tiny raincloud for 30 seconds.', rarity: 'legendary' },
  { name: 'Perfect Luck (Monopoly)', desc: 'Win every game of Monopoly. No exceptions.', rarity: 'legendary' },
  { name: 'Laser Pointer Eyes', desc: 'Shoot laser pointers (not real lasers) from your eyes.', rarity: 'legendary' },
  { name: 'Ultimate Vending Machine', desc: 'Vending machines always give you two snacks.', rarity: 'legendary' },
  { name: 'Reality Rewrite (Once)', desc: 'Once, rewrite reality (for 30 seconds, then it reverts).', rarity: 'mythic' },
  { name: 'Infinite Undo', desc: 'Undo your last sneeze, forever.', rarity: 'mythic' },
  { name: 'Inconvenient Infinite food (Random)', desc: "Have food, but only when you're already full", rarity: 'mythic' },
  { name: 'True Teleportation (Random)', desc: 'Teleport anywhere in the universe. Destination is random.', rarity: 'mythic' },
  { name: 'Quantum Clone', desc: "Create a quantum clone that exists and doesn't exist at the same time.", rarity: 'mythic' },
  { name: 'Speak Every Language (Only to Yourself)', desc: 'Understand and speak every language, but only when alone.', rarity: 'mythic' },
  { name: 'Summon the RNG God', desc: 'Call upon the RNG God to get a second roll immediately.', rarity: 'mythic' },
  { name: 'Manipulation To Anything', desc: 'Make or Create or Edit anything', rarity: 'mythic' },
  { name: 'Furry', desc: 'You Become A Furry (like elliott)', rarity: 'mythic' },
  { name: 'The Mythical Luck', desc: 'Always Roll Mythic', rarity: 'mythic' },
  { name: 'Ice Breath', desc: 'Breath Ice', rarity: 'mythic' },
  { name: 'Fire Breath', desc: 'Breath Fire', rarity: 'mythic' },
  { name: 'Shapeshifter', desc: 'Shapeshift into anything, even objects.', rarity: 'mythic' },
  { name: 'Brantley', desc: 'You become tuff', rarity: 'mythic' },
  { name: 'The Time God', desc: 'Control time anywhere and have the ability to control time in other universes.', rarity: 'timeless' },
  { name: 'Void', desc: 'Have The Power Of The Void', rarity: 'timeless' },
  { name: 'Brantley', desc: 'You become tuff', rarity: 'timeless' },
  { name: 'Jack Kelley', desc: 'Deal Dough Master', rarity: 'timeless' },

  { name: 'Cereal Telekinesis', desc: 'Float one piece of cereal to your hand each morning.', rarity: 'common' },
  { name: 'Perfect Pillow Flip', desc: 'Your pillow is always cool on the other side.', rarity: 'common' },
  { name: 'Pocket Lint Radar', desc: 'Sense loose lint within three feet.', rarity: 'common' },
  { name: 'Instant Plant Apology', desc: 'Houseplants forgive you for forgetting to water them.', rarity: 'common' },
  { name: 'Remote Control Luck', desc: 'Find the remote after only two couch-cushion checks.', rarity: 'common' },
  { name: 'Tiny Dramatic Wind', desc: 'A breeze appears whenever you make a cool entrance.', rarity: 'common' },

  { name: 'Perfect Timing', desc: 'Always arrive just as the microwave reaches zero.', rarity: 'uncommon' },
  { name: 'Snack Magnet', desc: 'A nearby snack is easier to spot when you are hungry.', rarity: 'uncommon' },
  { name: 'Echo Mimic', desc: 'Repeat any sound you heard once, with surprising accuracy.', rarity: 'uncommon' },
  { name: 'Shadow Puppet Master', desc: 'Your shadow can make one extra puppet shape.', rarity: 'uncommon' },
  { name: 'Lucky Loading Screen', desc: 'Your downloads feel 10% faster, emotionally.', rarity: 'uncommon' },
  { name: 'One-Second Forecast', desc: 'Know if it will rain exactly one second from now.', rarity: 'uncommon' },

  { name: 'Pocket Portal', desc: 'Reach into a pocket and retrieve one small item you misplaced.', rarity: 'rare' },
  { name: 'Moonlight Vision', desc: 'See clearly by moonlight without disturbing nearby owls.', rarity: 'rare' },
  { name: 'Echo Step', desc: 'Make a harmless copy of your last footstep sound.', rarity: 'rare' },
  { name: 'Instant Origami', desc: 'Fold any single sheet of paper into a perfect crane.', rarity: 'rare' },
  { name: 'Soda Bubble Shield', desc: 'A shimmering bubble blocks one tiny splash per day.', rarity: 'rare' },
  { name: 'Bookmark Blink', desc: 'Teleport your bookmark to the page you meant to save.', rarity: 'rare' },

  { name: 'Gravity Nudge', desc: 'Move a small object a few inches without touching it.', rarity: 'epic' },
  { name: 'Dream Replay', desc: 'Rewatch the last ten seconds of a dream after waking.', rarity: 'epic' },
  { name: 'Mirror Twin', desc: 'Your reflection can wave a moment before you do.', rarity: 'epic' },
  { name: 'Sound Bubble', desc: 'Silence a small area for exactly five seconds.', rarity: 'epic' },
  { name: 'Lucky Rewind', desc: 'Redo one harmless choice from the last minute, once a week.', rarity: 'epic' },
  { name: 'Star Map Mind', desc: 'Remember the shape of every constellation you have seen.', rarity: 'epic' },

  { name: 'Stormglass', desc: 'Shape a small cloud into any animal for one minute.', rarity: 'legendary' },
  { name: 'Phoenix Nap', desc: 'Wake up fully refreshed after a ten-minute nap.', rarity: 'legendary' },
  { name: 'Meteor Skip', desc: 'Leap over a house-sized obstacle in a burst of sparks.', rarity: 'legendary' },
  { name: 'Crystal Blueprint', desc: 'See a glowing outline of how any simple machine works.', rarity: 'legendary' },
  { name: 'Dragonfire Lantern', desc: 'Create a floating flame that gives light but no heat.', rarity: 'legendary' },
  { name: 'Lucky Dimension Door', desc: 'Open a doorway to the nearest safe room you know.', rarity: 'legendary' },

  { name: 'Ultra Instinct (Laundry)', desc: 'Catch a falling sock before it hits the floor.', rarity: 'ultra' },
  { name: 'Aurora Armor', desc: 'Wear a shifting shield of light that blocks one impact a day.', rarity: 'ultra' },
  { name: 'Comet Companion', desc: 'Summon a tiny comet that follows you and glows softly.', rarity: 'ultra' },
  { name: 'Memory Palace', desc: 'Store and retrieve every book you have ever read.', rarity: 'ultra' },
  { name: 'Portal Painter', desc: 'Draw two matching doors that connect for one minute.', rarity: 'ultra' },
  { name: 'Solar Flare', desc: 'Release a brilliant flash of harmless starlight.', rarity: 'ultra' },

  { name: 'Mythic Soundtrack', desc: 'Summon a dramatic theme song only you can hear.', rarity: 'mythic' },
  { name: 'Infinite Pocket', desc: 'Store an endless supply of anything that fits in your hand.', rarity: 'mythic' },
  { name: 'World Pause (Three Seconds)', desc: 'Freeze the world for three seconds, once each month.', rarity: 'mythic' },
  { name: 'Nebula Shapeshift', desc: 'Become a swirling cloud of stars for one minute.', rarity: 'mythic' },
  { name: 'Parallel Self', desc: 'Ask one alternate-universe version of yourself for advice.', rarity: 'mythic' },
  { name: 'Wish-Granted Shortcut', desc: 'Create a shortcut between two places you can see.', rarity: 'mythic' },

  { name: 'Genesis Spark', desc: 'Create a tiny, harmless life-like light that dances in your palm.', rarity: 'divine' },
  { name: 'Fate Weaver', desc: 'Once, nudge a coincidence toward a kinder outcome.', rarity: 'divine' },
  { name: 'Celestial Garden', desc: 'Make flowers bloom instantly beneath a clear night sky.', rarity: 'divine' },
  { name: 'Dream Architect', desc: 'Design the setting of your next dream before you sleep.', rarity: 'divine' },
  { name: 'Starheart', desc: 'Turn a sincere promise into a warm, visible spark of light.', rarity: 'divine' },

  { name: 'First Light', desc: 'Carry a sunrise in your hands and brighten any world.', rarity: 'timeless' },
  { name: 'Endless Horizon', desc: 'Walk between distant places as if they were next door.', rarity: 'timeless' },
  { name: 'Keeper of Stories', desc: 'Remember every story ever told and every story yet to come.', rarity: 'timeless' },
  { name: 'Worldmaker', desc: 'Shape a peaceful pocket universe from a single thought.', rarity: 'timeless' },
  { name: 'Beyond the RNG', desc: 'For one roll, choose any power you have already discovered.', rarity: 'timeless' }
];

const ADMIN_MODS_KEY = 'superpower_admin_mods';
const PITY_KEY = 'superpower_legendary_pity';

const rarities = [
  { key: 'common', label: 'Common', chance: 42 },
  { key: 'uncommon', label: 'Uncommon', chance: 25 },
  { key: 'rare', label: 'Rare', chance: 17 },
  { key: 'epic', label: 'Epic', chance: 9 },
  { key: 'legendary', label: 'Legendary', chance: 4.5 },
  { key: 'ultra', label: 'Ultra', chance: 1.5 },
  { key: 'mythic', label: 'Mythic', chance: 0.8 },
  { key: 'divine', label: 'Divine', chance: 0.15 },
  { key: 'timeless', label: 'Timeless', chance: 0.05 }
];

const resultDiv = document.getElementById('result');
const rollBtn = document.getElementById('roll-btn');
const inventoryBtn = document.getElementById('inventory-btn');
const inventoryModal = document.getElementById('inventory-modal');
const inventoryList = document.getElementById('inventory-list');
const inventoryContent = document.getElementById('inventory-content');
const closeInventoryBtn = document.getElementById('close-inventory');
const cheatModal = document.getElementById('cheat-modal');
const cheatContent = document.getElementById('cheat-content');
const closeCheatBtn = document.getElementById('close-cheat');
const cheatForm = document.getElementById('cheat-form');
const cheatSelect = document.getElementById('cheat-select');
const cheatStatus = document.getElementById('cheat-status');
const forcedRaritySelect = document.getElementById('admin-forced-rarity');
const noDuplicatesToggle = document.getElementById('admin-no-duplicates');
const instantRollToggle = document.getElementById('admin-instant-roll');
let adminMods = { forcedRarity: '', noDuplicates: false, instantRoll: false };
try {
  const savedMods = JSON.parse(localStorage.getItem(ADMIN_MODS_KEY) || '{}');
  if (savedMods && typeof savedMods === 'object') {
    adminMods.forcedRarity = rarities.some(item => item.key === savedMods.forcedRarity) ? savedMods.forcedRarity : '';
    adminMods.noDuplicates = savedMods.noDuplicates === true;
    adminMods.instantRoll = savedMods.instantRoll === true;
  }
} catch { /* Use default roll settings if saved mods are unavailable. */ }
forcedRaritySelect.value = adminMods.forcedRarity;
noDuplicatesToggle.checked = adminMods.noDuplicates;
instantRollToggle.checked = adminMods.instantRoll;
let rollsSinceLegendary = 0;
try {
  const savedPity = Number(localStorage.getItem(PITY_KEY));
  if (Number.isFinite(savedPity)) rollsSinceLegendary = Math.max(0, Math.min(19, savedPity));
} catch { /* Pity still works for this visit if storage is unavailable. */ }
const luckMeter = document.getElementById('luck-meter');
function updateLuckMeter() {
  luckMeter.textContent = `LUCK METER · ${rollsSinceLegendary} / 20 rolls toward a Legendary guarantee`;
}
updateLuckMeter();

function loadInventory() {
  try {
    const stored = JSON.parse(localStorage.getItem('superpower_inventory') || '[]');
    return Array.isArray(stored) ? stored.filter(power => power && typeof power.name === 'string' && typeof power.desc === 'string' && typeof power.rarity === 'string') : [];
  } catch {
    return [];
  }
}

let inventory = loadInventory();

function getRandomRarity() {
  const roll = Math.random() * 100;
  let sum = 0;
  for (const rarity of rarities) {
    sum += rarity.chance;
    if (roll < sum) return rarity.key;
  }
  return 'timeless';
}

function getRandomSuperpower(rarity) {
  const powers = superpowers.filter(power => power.rarity === rarity);
  return powers[Math.floor(Math.random() * powers.length)];
}

function rarityLabel(rarity) {
  const found = rarities.find(item => item.key === rarity);
  if (found) return found.label;
  if (rarity === 'nothing') return 'Nothing';
  if (rarity === 'everything') return 'Everything';
  return rarity;
}

function rarityClass(rarity) {
  return `rarity-${rarity}`;
}

function saveInventory() {
  try {
    localStorage.setItem('superpower_inventory', JSON.stringify(inventory));
  } catch {
    // The game remains playable if browser storage is unavailable.
  }
}

function addToInventory(power) {
  inventory.push(power);
  saveInventory();
}

function displayResult(power, duplicate = false) {
  const rarity = document.createElement('span');
  rarity.className = `superpower-rarity ${rarityClass(power.rarity)}`;
  rarity.textContent = rarityLabel(power.rarity);

  const name = document.createElement('div');
  name.className = 'power-name';
  name.textContent = power.name;

  const description = document.createElement('div');
  description.className = 'power-desc';
  description.textContent = power.desc;

  resultDiv.replaceChildren(rarity, name, description);
  if (duplicate) {
    const note = document.createElement('div');
    note.className = 'duplicate-note';
    note.textContent = '(Duplicate! Added again to your inventory)';
    note.style.cssText = 'color:#ff5ec6;font-size:12px;margin-top:8px';
    resultDiv.appendChild(note);
  }

  const backgrounds = {
    common: 'rgba(35,29,58,.97)',
    uncommon: 'linear-gradient(90deg,#25432e,#231d3a)',
    rare: 'linear-gradient(90deg,#202050 60%,#034f6e)',
    epic: 'linear-gradient(90deg,#2e115a 60%,#ff5ec6)',
    legendary: 'linear-gradient(90deg,#24143a 50%,#80651b)',
    ultra: 'linear-gradient(90deg,#24345b,#563b92)',
    mythic: 'linear-gradient(90deg,#402b60,#69345f,#204c62)',
    divine: 'linear-gradient(90deg,#513b15,#50356d,#183e5d)',
    timeless: 'linear-gradient(90deg,#4b172c,#24143a)'
  };
  resultDiv.style.background = backgrounds[power.rarity] || 'rgba(35,29,58,.97)';
  if (typeof resultDiv.animate === 'function') {
    resultDiv.animate([{ transform: 'translateY(-8px) scale(1.02)' }, { transform: 'translateY(0) scale(1)' }], { duration: 300 });
  }
}

function saveAdminMods() {
  adminMods = {
    forcedRarity: forcedRaritySelect.value,
    noDuplicates: noDuplicatesToggle.checked,
    instantRoll: instantRollToggle.checked
  };
  try { localStorage.setItem(ADMIN_MODS_KEY, JSON.stringify(adminMods)); } catch { /* Mods still work until the page is closed. */ }
}

function pickRollPower() {
  const pityDue = !forcedRaritySelect.value && rollsSinceLegendary >= 19;
  const rarity = forcedRaritySelect.value || (pityDue ? 'legendary' : getRandomRarity());
  let options = superpowers.filter(power => power.rarity === rarity);
  if (noDuplicatesToggle.checked) {
    const fresh = options.filter(power => !inventory.some(owned => owned.name === power.name && owned.rarity === power.rarity));
    if (fresh.length) options = fresh;
  }
  return options[Math.floor(Math.random() * options.length)];
}

function finishRoll(finalPower) {
  if (finalPower) {
    const rarityRank = rarities.findIndex(item => item.key === finalPower.rarity);
    if (rarityRank >= rarities.findIndex(item => item.key === 'legendary')) rollsSinceLegendary = 0;
    else rollsSinceLegendary = Math.min(19, rollsSinceLegendary + 1);
    try { localStorage.setItem(PITY_KEY, String(rollsSinceLegendary)); } catch { /* Keep the meter active for this visit. */ }
    updateLuckMeter();
    const duplicate = inventory.some(power => power.name === finalPower.name && power.rarity === finalPower.rarity);
    addToInventory(finalPower);
    displayResult(finalPower, duplicate);
    window.Achievements?.unlock('power_first_roll');
    if (rarityRank >= rarities.findIndex(item => item.key === 'legendary')) window.Achievements?.unlock('power_legendary');
    if (finalPower.rarity === 'mythic') window.Achievements?.unlock('power_mythic');
    const uniquePowers = new Set(inventory.map(power => `${power.name.toLowerCase()}::${power.rarity}`));
    if (uniquePowers.size >= 10) window.Achievements?.unlock('power_collection');
    if (finalPower.name === 'Summon the RNG God') {
      setTimeout(() => {
        const message = document.createElement('div');
        message.style.cssText = 'color:#5ec6ff;font-size:13px;margin-top:10px';
        message.textContent = 'The RNG God grants you a bonus roll!';
        resultDiv.appendChild(message);
        setTimeout(rollSuperpower, 1200);
      }, 800);
    }
  }
  rollBtn.disabled = false;
  rollBtn.textContent = '🎲 Roll for a Superpower!';
}

function rollSuperpower() {
  if (rollBtn.disabled) return;
  rollBtn.disabled = true;
  rollBtn.textContent = 'Rolling...';
  if (instantRollToggle.checked) {
    finishRoll(pickRollPower());
    return;
  }
  let flashes = 0;
  const flashInterval = setInterval(() => {
    const preview = getRandomSuperpower(getRandomRarity());
    if (preview) displayResult(preview);
    flashes++;
    if (flashes >= 8) {
      clearInterval(flashInterval);
      finishRoll(pickRollPower());
    }
  }, 85);
}

async function sharePowerToChat(power, button) {
  const message = `I rolled ${power.name} (${rarityLabel(power.rarity)}) in Superpower RNG! ${power.desc}`;
  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: 'My Superpower RNG drop', text: message });
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(message);
    } else {
      const copyField = document.createElement('textarea');
      copyField.value = message;
      copyField.style.position = 'fixed';
      copyField.style.opacity = '0';
      document.body.appendChild(copyField);
      copyField.select();
      const copied = document.execCommand('copy');
      copyField.remove();
      if (!copied) throw new Error('Copy unavailable');
    }
    button.textContent = 'COPIED!';
    setTimeout(() => { button.textContent = 'FLEX POWER ↗'; }, 1600);
  } catch {
    button.textContent = 'SHARE UNAVAILABLE';
    setTimeout(() => { button.textContent = 'FLEX POWER ↗'; }, 1600);
  }
}

function updateInventoryList() {
  inventoryList.replaceChildren();
  if (inventory.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'No superpowers yet! Roll to get some.';
    inventoryList.appendChild(empty);
    return;
  }

  for (const power of [...inventory].reverse()) {
    const item = document.createElement('li');
    item.className = 'inventory-item';
    const rarity = document.createElement('span');
    rarity.className = `superpower-rarity ${rarityClass(power.rarity)}`;
    rarity.textContent = rarityLabel(power.rarity);
    const name = document.createElement('b');
    name.textContent = power.name;
    const description = document.createElement('div');
    description.className = 'desc';
    description.textContent = power.desc;
    const shareButton = document.createElement('button');
    shareButton.type = 'button';
    shareButton.className = 'flex-power-btn';
    shareButton.textContent = 'FLEX POWER ↗';
    shareButton.setAttribute('aria-label', `Share ${power.name}`);
    shareButton.addEventListener('click', () => sharePowerToChat(power, shareButton));
    item.append(rarity, name, description, shareButton);
    inventoryList.appendChild(item);
  }
}

function openModal(modal, content) {
  modal.classList.add('is-open');
  content.focus();
}

function closeModal(modal) {
  modal.classList.remove('is-open');
}

function showInventory() {
  updateInventoryList();
  openModal(inventoryModal, inventoryContent);
}

function populateCheatSelect() {
  cheatSelect.replaceChildren();
  superpowers.forEach((power, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = `[${rarityLabel(power.rarity)}] ${power.name}`;
    cheatSelect.appendChild(option);
  });
}

function showCheatModal() {
  populateCheatSelect();
  cheatStatus.textContent = '';
  openModal(cheatModal, cheatContent);
}

rollBtn.addEventListener('click', rollSuperpower);
inventoryBtn.addEventListener('click', showInventory);
closeInventoryBtn.addEventListener('click', () => closeModal(inventoryModal));
closeCheatBtn.addEventListener('click', () => closeModal(cheatModal));

inventoryModal.addEventListener('click', event => {
  if (event.target === inventoryModal) closeModal(inventoryModal);
});
cheatModal.addEventListener('click', event => {
  if (event.target === cheatModal) closeModal(cheatModal);
});

cheatForm.addEventListener('submit', event => {
  event.preventDefault();
  const power = superpowers[Number(cheatSelect.value)];
  if (!power) return;
  const duplicate = inventory.some(owned => owned.name === power.name && owned.rarity === power.rarity);
  addToInventory(power);
  updateInventoryList();
  displayResult(power, duplicate);
  cheatStatus.textContent = `Added "${power.name}" to your inventory!`;
});

document.querySelectorAll('[data-admin-action]').forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.adminAction;
    if (action === 'ten') {
      for (let index = 0; index < 10; index++) {
        const power = pickRollPower() || getRandomSuperpower(getRandomRarity());
        if (power) addToInventory(power);
      }
      cheatStatus.textContent = 'Added 10 random powers using your active roll mods.';
    } else if (action === 'all') {
      const owned = new Set(inventory.map(power => `${power.name.toLowerCase()}::${power.rarity}`));
      const missing = superpowers.filter(power => !owned.has(`${power.name.toLowerCase()}::${power.rarity}`));
      inventory.push(...missing);
      saveInventory();
      cheatStatus.textContent = `Added ${missing.length} powers. Your collection now has every power.`;
    } else if (action === 'duplicate') {
      if (!inventory.length) { cheatStatus.textContent = 'Roll or add a power first.'; return; }
      addToInventory({ ...inventory[inventory.length - 1] });
      cheatStatus.textContent = 'Duplicated your latest power.';
    } else if (action === 'remove') {
      if (!inventory.length) { cheatStatus.textContent = 'Your inventory is already empty.'; return; }
      const removed = inventory.pop();
      saveInventory();
      cheatStatus.textContent = `Removed ${removed.name} from your inventory.`;
    } else if (action === 'clear') {
      if (!inventory.length) { cheatStatus.textContent = 'Your inventory is already empty.'; return; }
      if (!window.confirm('Clear every power from your inventory?')) return;
      inventory = [];
      saveInventory();
      cheatStatus.textContent = 'Inventory cleared.';
    }
    updateInventoryList();
  });
});

forcedRaritySelect.addEventListener('change', saveAdminMods);
noDuplicatesToggle.addEventListener('change', saveAdminMods);
instantRollToggle.addEventListener('change', saveAdminMods);

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal(inventoryModal);
    closeModal(cheatModal);
  }
  if (event.key.toLowerCase() === 'i' && !event.repeat) {
    event.preventDefault();
    if (inventoryModal.classList.contains('is-open')) closeModal(inventoryModal);
    else showInventory();
  }
});

const cheatKeys = new Set();
let cheatChordActive = false;
document.addEventListener('keydown', event => {
  if (cheatModal.classList.contains('is-open') || event.repeat || event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
  const key = event.key.toLowerCase();
  if (['p', 'a', 'x'].includes(key)) cheatKeys.add(key);
  if (cheatKeys.size === 3 && !cheatChordActive) {
    cheatChordActive = true;
    showCheatModal();
  }
});
document.addEventListener('keyup', event => {
  cheatKeys.delete(event.key.toLowerCase());
  if (cheatKeys.size < 3) cheatChordActive = false;
});
window.addEventListener('blur', () => { cheatKeys.clear(); cheatChordActive = false; });

if (inventory.length > 0) displayResult(inventory[inventory.length - 1]);
