const SAVE_KEY = 'neon-arcade-alchemy-v1';
const starters = [
  { name: 'Water', icon: '💧', hint: 'A clear beginning.' },
  { name: 'Fire', icon: '🔥', hint: 'A spark of possibility.' },
  { name: 'Earth', icon: '🌱', hint: 'Ground for something new.' },
  { name: 'Wind', icon: '🌬️', hint: 'A breath of fresh ideas.' }
];

const recipeBook = new Map();
function pairKey(first, second) {
  return [first.toLowerCase(), second.toLowerCase()].sort().join('::');
}
function addRecipe(first, second, name, icon, hint) {
  recipeBook.set(pairKey(first, second), { name, icon, hint });
}

[
  ['Water', 'Fire', 'Steam', '♨️', 'Water rises in a warm cloud.'],
  ['Water', 'Earth', 'Mud', '🟤', 'The ground softens after the rain.'],
  ['Water', 'Wind', 'Wave', '🌊', 'Wind gives water a rolling rhythm.'],
  ['Fire', 'Earth', 'Lava', '🌋', 'The earth glows from within.'],
  ['Fire', 'Wind', 'Smoke', '💨', 'A little fire leaves a cloudy trail.'],
  ['Earth', 'Wind', 'Dust', '🌪️', 'The ground takes flight.'],
  ['Water', 'Water', 'Lake', '🏞️', 'A little water becomes a gathering place.'],
  ['Fire', 'Fire', 'Energy', '⚡', 'One spark inspires another.'],
  ['Earth', 'Earth', 'Mountain', '⛰️', 'Small pieces become a towering peak.'],
  ['Wind', 'Wind', 'Tornado', '🌪️', 'A breeze finds its wild side.'],
  ['Steam', 'Wind', 'Cloud', '☁️', 'A floating cloud takes shape.'],
  ['Steam', 'Earth', 'Geyser', '♨️', 'A pressurized surprise bursts upward.'],
  ['Steam', 'Fire', 'Engine', '🚂', 'Heat and vapor get things moving.'],
  ['Cloud', 'Water', 'Rain', '🌧️', 'The clouds give a little back.'],
  ['Cloud', 'Wind', 'Storm', '⛈️', 'The sky gets dramatic.'],
  ['Cloud', 'Fire', 'Lightning', '🌩️', 'A flash lights up the clouds.'],
  ['Rain', 'Earth', 'Plant', '🌿', 'A little rain helps life take root.'],
  ['Rain', 'Fire', 'Rainbow', '🌈', 'Sunshine finds the rain.'],
  ['Rain', 'Wind', 'Umbrella', '☂️', 'Best bring some cover.'],
  ['Plant', 'Water', 'Flower', '🌸', 'A bloom opens up.'],
  ['Plant', 'Fire', 'Ash', '🪵', 'A plant leaves a trace behind.'],
  ['Plant', 'Wind', 'Seed', '🌰', 'A seed is ready to travel.'],
  ['Plant', 'Earth', 'Forest', '🌳', 'One plant becomes a whole forest.'],
  ['Lava', 'Water', 'Stone', '🪨', 'Hot rock cools into solid stone.'],
  ['Lava', 'Wind', 'Volcano', '🌋', 'A mountain with a fiery secret.'],
  ['Lava', 'Earth', 'Obsidian', '⬛', 'Molten rock cools into dark glass.'],
  ['Lava', 'Fire', 'Dragon', '🐉', 'A legendary creature rises from the heat.'],
  ['Smoke', 'Water', 'Fog', '🌫️', 'Smoke and water soften the view.'],
  ['Smoke', 'Wind', 'Pollution', '🏭', 'The air has seen better days.'],
  ['Smoke', 'Fire', 'Campfire', '🏕️', 'A cozy place to gather.'],
  ['Dust', 'Water', 'Clay', '🏺', 'The earth becomes easy to shape.'],
  ['Dust', 'Wind', 'Sand', '🏜️', 'Tiny grains travel together.'],
  ['Dust', 'Fire', 'Glass', '🪟', 'Heat transforms grains into something clear.'],
  ['Wave', 'Earth', 'Beach', '🏖️', 'The shoreline is a perfect meeting place.'],
  ['Wave', 'Wind', 'Surf', '🏄', 'Ride the wind across the water.'],
  ['Wave', 'Fire', 'Steam', '♨️', 'A hot wave turns into rising vapor.'],
  ['Stone', 'Fire', 'Metal', '🔩', 'The stone gives up a useful material.'],
  ['Stone', 'Wind', 'Canyon', '🏜️', 'Wind slowly carves a path.'],
  ['Stone', 'Water', 'Pebble', '🪨', 'The water smooths a little stone.'],
  ['Stone', 'Stone', 'Wall', '🧱', 'Stack them up and make a barrier.'],
  ['Mountain', 'Water', 'River', '🏞️', 'Water finds a way down the mountain.'],
  ['Mountain', 'Wind', 'Eagle', '🦅', 'A keen eye watches from above.'],
  ['Mountain', 'Fire', 'Volcano', '🌋', 'The mountain wakes up.'],
  ['Forest', 'Fire', 'Charcoal', '⚫', 'The forest leaves a dark resource.'],
  ['Forest', 'Water', 'Swamp', '🐸', 'A soggy forest becomes a new habitat.'],
  ['Forest', 'Wind', 'Leaves', '🍃', 'The trees catch the breeze.'],
  ['Flower', 'Wind', 'Perfume', '🌺', 'A lovely scent rides on the air.'],
  ['Flower', 'Water', 'Tea', '🍵', 'A calming cup begins with a blossom.'],
  ['Seed', 'Earth', 'Tree', '🌲', 'A tiny seed grows into something mighty.'],
  ['Seed', 'Water', 'Sprout', '🌱', 'The first green shoots appear.'],
  ['Tree', 'Fire', 'Wood', '🪵', 'A tree becomes a useful material.'],
  ['Tree', 'Wind', 'Paper', '📄', 'Wood pulp becomes a blank page.'],
  ['Tree', 'Water', 'Boat', '⛵', 'A tree sets sail.'],
  ['Metal', 'Fire', 'Sword', '⚔️', 'A useful tool for a heroic quest.'],
  ['Metal', 'Wind', 'Airplane', '✈️', 'Metal takes to the skies.'],
  ['Metal', 'Water', 'Rust', '🧡', 'Time and water leave their mark.'],
  ['Glass', 'Sand', 'Hourglass', '⌛', 'Sand gets a timer of its own.'],
  ['Glass', 'Fire', 'Lightbulb', '💡', 'A bright idea takes shape.'],
  ['Glass', 'Water', 'Aquarium', '🐠', 'A tiny window into an underwater world.'],
  ['Sand', 'Water', 'Beach', '🏖️', 'Sand and water make a sunny shore.'],
  ['Sand', 'Fire', 'Glass', '🪟', 'A hot transformation makes something transparent.'],
  ['River', 'Earth', 'Delta', '🗺️', 'A river branches out as it meets the land.'],
  ['River', 'Wind', 'Sailboat', '⛵', 'A sail catches the river breeze.'],
  ['Storm', 'Water', 'Flood', '🌊', 'The rain just keeps coming.'],
  ['Storm', 'Fire', 'Thunderbolt', '⚡', 'A powerful flash from the storm.'],
  ['Lightning', 'Earth', 'Fossil', '🦴', 'A flash reveals something ancient.'],
  ['Lightning', 'Metal', 'Robot', '🤖', 'A bolt of energy brings metal to life.'],
  ['Energy', 'Water', 'Life', '🧬', 'Energy flows into the spark of life.'],
  ['Life', 'Earth', 'Animal', '🦊', 'Something begins to move.'],
  ['Life', 'Water', 'Fish', '🐟', 'Life explores the water.'],
  ['Life', 'Wind', 'Bird', '🐦', 'Life takes to the air.'],
  ['Life', 'Fire', 'Phoenix', '🦅', 'Life rises again, brighter than before.'],
  ['Life', 'Plant', 'Garden', '🪴', 'A home for growing things.'],
  ['Animal', 'Forest', 'Wolf', '🐺', 'A wild friend calls the forest home.'],
  ['Animal', 'Water', 'Whale', '🐋', 'A giant of the deep appears.'],
  ['Animal', 'Fire', 'Salamander', '🦎', 'A little creature loves the warmth.'],
  ['Bird', 'Fire', 'Phoenix', '🦅', 'A legendary bird rises from the flames.'],
  ['Bird', 'Earth', 'Nest', '🪺', 'A safe home takes shape.'],
  ['Fish', 'Fire', 'Sushi', '🍣', 'A surprising kitchen discovery.'],
  ['Fish', 'Earth', 'Fossil', '🦴', 'A creature from long ago leaves a trace.'],
  ['Wood', 'Fire', 'Charcoal', '⚫', 'The wood transforms in the heat.'],
  ['Wood', 'Water', 'Paper', '📄', 'Wood becomes a surface for stories.'],
  ['Paper', 'Wind', 'Kite', '🪁', 'A sheet catches the breeze.'],
  ['Paper', 'Fire', 'Ash', '🪵', 'A page leaves a little ash.'],
  ['Paper', 'Water', 'Book', '📚', 'A few pages become a story.'],
  ['Book', 'Life', 'Story', '📖', 'Characters come alive in your imagination.'],
  ['Book', 'Fire', 'Knowledge', '🧠', 'A bright idea survives the pages.'],
  ['Knowledge', 'Earth', 'Fossil', '🦴', 'The past leaves clues in the ground.'],
  ['Robot', 'Life', 'Cyborg', '🦾', 'Technology meets biology.'],
  ['Robot', 'Fire', 'Computer', '🖥️', 'A machine gets a powerful upgrade.'],
  ['Computer', 'Wind', 'Internet', '🌐', 'Information travels everywhere.'],
  ['Computer', 'Water', 'Data', '💾', 'A stream of information.'],
  ['Internet', 'Life', 'Community', '🫂', 'People connect across the world.'],
  ['Dragon', 'Water', 'Sea Dragon', '🐲', 'A mythical creature explores the deep.'],
  ['Dragon', 'Wind', 'Flying Dragon', '🐉', 'A dragon takes to the open sky.'],
  ['Dragon', 'Earth', 'Cave', '🪨', 'A dragon needs a lair.'],
  ['Obsidian', 'Water', 'Mirror', '🪞', 'Polished volcanic glass reflects the world.'],
  ['Ice', 'Fire', 'Water', '💧', 'The ice melts away.'],
  ['Snow', 'Sun', 'Water', '💧', 'Warm sunshine melts the snow.'],
  ['Cloud', 'Cold', 'Snow', '❄️', 'A chilly cloud lets flakes fall.'],
  ['Water', 'Cold', 'Ice', '🧊', 'Water freezes into ice.'],
  ['Fire', 'Sun', 'Solar Power', '☀️', 'The sun shares its energy.'],
  ['Sun', 'Water', 'Rainbow', '🌈', 'Sunlight paints the rain.'],
  ['Sun', 'Earth', 'Desert', '🏜️', 'Sunshine dries the land.'],
  ['Sun', 'Plant', 'Sunflower', '🌻', 'A flower turns toward the light.'],
  ['Moon', 'Water', 'Tide', '🌙', 'The moon pulls at the ocean.'],
  ['Moon', 'Wind', 'Night', '🌌', 'The sky grows quiet and dark.'],
  ['Night', 'Sun', 'Day', '🌅', 'A new morning begins.'],
  ['Day', 'Night', 'Time', '⏳', 'The days and nights keep turning.'],
  ['Time', 'Life', 'History', '📜', 'Every life leaves a story behind.'],
  ['Ocean', 'Wind', 'Wave', '🌊', 'The ocean dances with the wind.'],
  ['Ocean', 'Life', 'Whale', '🐋', 'A gentle giant swims by.'],
  ['Human', 'Fire', 'Cook', '🍳', 'A clever use for a flame.'],
  ['Human', 'Earth', 'Farmer', '🧑‍🌾', 'A person tends to the land.'],
  ['Human', 'Water', 'Sailor', '🧭', 'An explorer sets out across the sea.'],
  ['Human', 'Computer', 'Programmer', '👩‍💻', 'A human teaches a machine new tricks.'],
  ['Human', 'Animal', 'Friend', '🤝', 'A connection between two kinds of life.'],
  ['Human', 'Life', 'Family', '👨‍👩‍👧', 'Life finds its way together.'],
  ['Human', 'Wind', 'Pilot', '🧑‍✈️', 'A person learns to navigate the sky.'],
  ['Human', 'Book', 'Writer', '✍️', 'A person creates a new story.'],
  ['Music', 'Water', 'Singing', '🎤', 'A tune travels over the waves.'],
  ['Music', 'Wind', 'Flute', '🪈', 'Air makes a melody.'],
  ['Earth', 'Life', 'Human', '🧑', 'A curious mind emerges.'],
  ['Sun', 'Wind', 'Solar Wind', '✨', 'A stream of particles from the sun.'],
  ['Ice', 'Earth', 'Glacier', '🏔️', 'A frozen river slowly shapes the land.'],
  ['Ice', 'Wind', 'Blizzard', '🌨️', 'A cold wind sweeps through.'],
  ['Ash', 'Water', 'Lye', '🧪', 'An old material becomes a useful solution.'],
  ['Clay', 'Fire', 'Pottery', '🏺', 'Clay hardens into a lasting shape.'],
  ['Pottery', 'Plant', 'Flowerpot', '🪴', 'A cozy home for a plant.'],
  ['Metal', 'Water', 'Bridge', '🌉', 'A strong crossing connects two sides.'],
  ['Mountain', 'Snow', 'Avalanche', '🏔️', 'Snow rushes down the mountainside.'],
  ['Cave', 'Fire', 'Torch', '🔦', 'A little light for the dark.'],
  ['Cave', 'Animal', 'Bat', '🦇', 'A cave-dweller takes flight.'],
  ['Ocean', 'Earth', 'Island', '🏝️', 'A little land surrounded by sea.'],
  ['Island', 'Fire', 'Volcano', '🌋', 'A volcanic island rises from the ocean.'],
  ['Life', 'Time', 'Evolution', '🧬', 'Life changes over generations.'],
  ['Energy', 'Metal', 'Electricity', '🔌', 'A current flows through metal.'],
  ['Electricity', 'Water', 'Hydro Power', '💡', 'Moving water generates a current.'],
  ['Electricity', 'Fire', 'Plasma', '🔮', 'A superheated state of matter appears.'],
  ['Internet', 'Human', 'Social Network', '📱', 'A new way for people to connect.'],
  ['Sand', 'Wind', 'Dune', '🏜️', 'The wind piles sand into hills.'],
  ['Flower', 'Earth', 'Garden', '🌷', 'A flower finds a place to grow.']
].forEach(recipe => addRecipe(...recipe));

const elementList = document.getElementById('element-list');
const searchInput = document.getElementById('element-search');
const countLabel = document.getElementById('discovery-count');
const message = document.getElementById('discovery-message');
const journal = document.getElementById('recipe-journal');
const combineButton = document.getElementById('combine-button');
const selected = [null, null];
let elements = [...starters];
let discoveredRecipes = {};
let journalEntries = [];

try {
  const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || '{}');
  if (Array.isArray(saved.elements)) {
    const valid = saved.elements.filter(item => item && typeof item.name === 'string' && typeof item.icon === 'string' && typeof item.hint === 'string');
    elements = [...starters];
    valid.forEach(item => { if (!elements.some(element => element.name === item.name)) elements.push(item); });
  }
  if (saved.discoveredRecipes && typeof saved.discoveredRecipes === 'object' && !Array.isArray(saved.discoveredRecipes)) {
    discoveredRecipes = Object.fromEntries(Object.entries(saved.discoveredRecipes).filter(([key, value]) => typeof key === 'string' && value && typeof value.name === 'string' && typeof value.icon === 'string' && typeof value.hint === 'string'));
  }
  if (Array.isArray(saved.journalEntries)) journalEntries = saved.journalEntries.filter(entry => entry && typeof entry.first === 'string' && typeof entry.second === 'string' && entry.result && typeof entry.result.name === 'string' && typeof entry.result.icon === 'string').slice(-60);
} catch { /* Start a fresh collection if saved data is unavailable. */ }

function saveProgress() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({ elements, discoveredRecipes, journalEntries })); }
  catch { message.textContent = 'Could not save right now, but you can keep crafting.'; }
}
function findElement(name) { return elements.find(element => element.name === name); }
function hash(text) {
  let value = 0;
  for (const character of text) value = (value * 31 + character.charCodeAt(0)) >>> 0;
  return value;
}
function inventResult(first, second) {
  const names = [first.name, second.name].sort((a, b) => a.localeCompare(b));
  const signature = names.join(' + ');
  const number = hash(signature);
  const icons = ['🪄', '🔮', '🧬', '🌟', '🪐', '🧪', '🌀', '💎', '🦄', '✨', '🛸', '🧿'];
  let name = `${names[0]} ${names[1]}`;
  if (name.length > 34) name = `${names[0].slice(0, 15)} ${names[1].slice(0, 15)}`;
  if (elements.some(element => element.name.toLowerCase() === name.toLowerCase())) name += ` ${number % 97 + 2}`;
  return { name, icon: icons[number % icons.length], hint: `${first.name} and ${second.name} become something unexpected. Try it with another discovery!` };
}
function renderElements() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = elements.filter(element => element.name.toLowerCase().includes(query));
  elementList.replaceChildren();
  visible.forEach(element => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `element-chip${selected.includes(element.name) ? ' is-selected' : ''}`;
    button.draggable = true;
    button.setAttribute('aria-label', `${element.name}: ${element.hint}. Select to combine.`);
    const icon = document.createElement('span'); icon.className = 'element-emoji'; icon.textContent = element.icon;
    const name = document.createElement('span'); name.className = 'element-name'; name.textContent = element.name;
    button.append(icon, name);
    button.addEventListener('click', () => selectElement(element.name));
    button.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/plain', element.name);
      event.dataTransfer.effectAllowed = 'copy';
    });
    elementList.appendChild(button);
  });
  countLabel.textContent = `${elements.length} DISCOVERED`;
}
function updateSlots() {
  [0, 1].forEach((index) => {
    const slot = document.getElementById(index === 0 ? 'slot-one' : 'slot-two');
    const element = selected[index] && findElement(selected[index]);
    slot.classList.toggle('is-filled', Boolean(element));
    slot.setAttribute('aria-label', element ? `${index ? 'Second' : 'First'} ingredient: ${element.name}. Click to clear.` : `${index ? 'Second' : 'First'} ingredient. Choose an element.`);
    const content = document.createElement('span'); content.className = 'slot-content';
    if (element) {
      const icon = document.createElement('span'); icon.className = 'slot-icon'; icon.textContent = element.icon;
      const name = document.createElement('span'); name.className = 'slot-name'; name.textContent = element.name;
      const hint = document.createElement('span'); hint.className = 'slot-hint'; hint.textContent = 'CLICK TO REMOVE';
      content.append(icon, name, hint);
    } else {
      const hint = document.createElement('span'); hint.className = 'slot-hint'; hint.innerHTML = index ? 'DROP OR SELECT<br>SECOND ELEMENT' : 'DROP OR SELECT<br>FIRST ELEMENT';
      content.appendChild(hint);
    }
    slot.replaceChildren(content);
  });
  combineButton.disabled = !selected[0] || !selected[1];
  renderElements();
}
function selectElement(name) {
  const existing = selected.indexOf(name);
  if (existing === 0 && !selected[1]) selected[1] = name;
  else if (existing !== -1) selected[existing] = null;
  else if (!selected[0]) selected[0] = name;
  else if (!selected[1]) selected[1] = name;
  else { selected[0] = selected[1]; selected[1] = name; }
  message.textContent = '';
  updateSlots();
}
function renderJournal() {
  journal.replaceChildren();
  [...journalEntries].reverse().slice(0, 16).forEach(entry => {
    const chip = document.createElement('span');
    chip.className = 'journal-chip';
    chip.textContent = `${entry.first} + ${entry.second} → ${entry.result.icon} ${entry.result.name}`;
    journal.appendChild(chip);
  });
  if (!journalEntries.length) {
    const empty = document.createElement('span'); empty.className = 'journal-chip'; empty.textContent = 'Your first discovery is waiting...'; journal.appendChild(empty);
  }
}
function combine() {
  if (!selected[0] || !selected[1]) return;
  const first = findElement(selected[0]);
  const second = findElement(selected[1]);
  if (!first || !second) return;
  const key = pairKey(first.name, second.name);
  const known = discoveredRecipes[key] || recipeBook.get(key);
  const result = known || inventResult(first, second);
  const isNewRecipe = !discoveredRecipes[key];
  const isNewElement = !elements.some(element => element.name.toLowerCase() === result.name.toLowerCase());
  discoveredRecipes[key] = result;
  if (isNewElement) elements.push(result);
  if (isNewRecipe) journalEntries.push({ first: first.name, second: second.name, result });
  message.textContent = isNewElement ? `NEW DISCOVERY! ${result.icon} ${result.name} — ${result.hint}` : isNewRecipe ? `New combination! You already discovered ${result.name}.` : `You already discovered ${result.name}. Try a different combination!`;
  message.style.color = isNewElement ? '#7bdf8b' : '#ffb45e';
  if (isNewElement) {
    window.Achievements?.unlock('alchemy_first');
    if (elements.length >= 10) window.Achievements?.unlock('alchemy_10');
    if (elements.length >= 25) window.Achievements?.unlock('alchemy_25');
  }
  saveProgress();
  selected[0] = null;
  selected[1] = null;
  renderJournal();
  renderElements();
}

[document.getElementById('slot-one'), document.getElementById('slot-two')].forEach((slot, index) => {
  slot.addEventListener('click', () => { selected[index] = null; updateSlots(); });
  slot.addEventListener('dragover', event => { event.preventDefault(); slot.classList.add('is-over'); });
  slot.addEventListener('dragleave', () => slot.classList.remove('is-over'));
  slot.addEventListener('drop', event => {
    event.preventDefault(); slot.classList.remove('is-over');
    const name = event.dataTransfer.getData('text/plain');
    if (findElement(name)) { selected[index] = name; updateSlots(); }
  });
});
combineButton.addEventListener('click', combine);
document.getElementById('surprise-button').addEventListener('click', () => {
  if (elements.length < 2) return;
  const first = Math.floor(Math.random() * elements.length);
  let second = Math.floor(Math.random() * elements.length);
  if (elements.length > 1 && second === first) second = (second + 1) % elements.length;
  selected[0] = elements[first].name;
  selected[1] = elements[second].name;
  updateSlots();
  combine();
});
document.getElementById('clear-button').addEventListener('click', () => { selected[0] = null; selected[1] = null; message.textContent = ''; updateSlots(); });
searchInput.addEventListener('input', renderElements);
document.getElementById('reset-button').addEventListener('click', () => {
  if (!window.confirm('Reset your discoveries and start a fresh collection?')) return;
  elements = [...starters]; discoveredRecipes = {}; journalEntries = [];
  selected[0] = null; selected[1] = null; message.textContent = '';
  saveProgress(); renderJournal(); renderElements();
});

const adminOverlay = document.getElementById('alchemy-admin-overlay');
const adminForm = document.getElementById('alchemy-admin-form');
const adminStatus = document.getElementById('alchemy-admin-status');
function toggleAlchemyAdmin(open = !adminOverlay.classList.contains('is-open')) {
  adminOverlay.classList.toggle('is-open', open);
  if (open) document.getElementById('admin-element-name').focus();
}
document.getElementById('alchemy-admin-close').addEventListener('click', () => toggleAlchemyAdmin(false));
adminOverlay.addEventListener('click', event => {
  if (event.target === adminOverlay) toggleAlchemyAdmin(false);
});
adminForm.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('admin-element-name').value.trim();
  const icon = document.getElementById('admin-element-icon').value.trim() || '✨';
  const hint = document.getElementById('admin-element-hint').value.trim() || 'A custom admin-added discovery.';
  if (!name) return;
  if (elements.some(element => element.name.toLowerCase() === name.toLowerCase())) {
    adminStatus.textContent = `${name} is already in your collection.`;
    return;
  }
  elements.push({ name, icon, hint });
  saveProgress();
  updateSlots();
  adminStatus.textContent = `${icon} ${name} added to your inventory!`;
  adminForm.reset();
  document.getElementById('admin-element-icon').value = '✨';
});

const adminKeys = new Set();
let adminChordActive = false;
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') toggleAlchemyAdmin(false);
  if (event.repeat || event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
  const key = event.key.toLowerCase();
  if (['p', 'a', 'x'].includes(key)) adminKeys.add(key);
  if (adminKeys.size === 3 && !adminChordActive) {
    adminChordActive = true;
    toggleAlchemyAdmin(true);
  }
});
document.addEventListener('keyup', event => {
  adminKeys.delete(event.key.toLowerCase());
  if (adminKeys.size < 3) adminChordActive = false;
});
window.addEventListener('blur', () => { adminKeys.clear(); adminChordActive = false; });

renderJournal();
updateSlots();
