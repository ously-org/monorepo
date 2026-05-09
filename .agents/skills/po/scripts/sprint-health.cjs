const { execSync } = require('child_process');

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' });
  } catch (e) {
    return null;
  }
}

// 1. Get Project Items
const itemsJson = run('gh project item-list 1 --owner ously-org --format json');
if (!itemsJson) {
  console.log('Error: Could not fetch project items.');
  process.exit(1);
}

const items = JSON.parse(itemsJson).items;

// 2. Find Current Iteration
// We look for items that have an iteration set and pick the first one's iteration as "current" 
// (or could be improved to check date ranges)
const currentItemWithIteration = items.find(i => i.iteration);
if (!currentItemWithIteration) {
  console.log('Error: No active iteration found in project.');
  process.exit(1);
}

const iter = currentItemWithIteration.iteration;
const startDate = new Date(iter.startDate);
const durationDays = iter.duration;
const endDate = new Date(startDate);
endDate.setDate(startDate.getDate() + durationDays);

const now = new Date();
const daysPassed = Math.max(0, Math.floor((now - startDate) / (1000 * 60 * 60 * 24)));
const totalDays = durationDays;

// 3. Calculate Capacity via gws calendar (Mocking the logic since gws might not be in env)
// In a real env, we'd run: gws calendar --from startDate --to endDate
// For now, let's assume we fetch the agenda and count "[Ously]" blocks
const capacityUnits = 14; // Defaulting to the target in SKILL.md for now, 
                          // will be replaced with real gws parsing logic.

// 4. Calculate Points (Units)
let totalPlannedUnits = 0;
let completedUnits = 0;
let inProgressUnits = 0;

items.forEach(item => {
  if (item.iteration && item.iteration.iterationId === iter.iterationId) {
    const est = item.estimate || 0;
    totalPlannedUnits += est;
    if (item.status === 'Done') completedUnits += est;
    else if (item.status === 'In progress' || item.status === 'In review') inProgressUnits += est;
  }
});

// 5. Sprint Health Logic
const timeProgress = daysPassed / totalDays;
const workProgress = completedUnits / totalPlannedUnits;
const health = workProgress >= timeProgress ? '✅ ON TRACK' : '⚠️ BEHIND';

console.log(`Sprint: ${iter.title} (${iter.startDate} to ${endDate.toISOString().split('T')[0]})`);
console.log(`Time: ${daysPassed}/${totalDays} days passed (${(timeProgress * 100).toFixed(1)}%)`);
console.log(`Work: ${completedUnits}/${totalPlannedUnits} Units completed (${(workProgress * 100).toFixed(1)}%)`);
console.log(`Current Capacity: ${capacityUnits} Units total.`);
console.log(`Status: ${health}`);
if (health === '⚠️ BEHIND') {
  console.log(`Warning: You should have completed ~${(timeProgress * totalPlannedUnits).toFixed(1)} Units by now.`);
}
