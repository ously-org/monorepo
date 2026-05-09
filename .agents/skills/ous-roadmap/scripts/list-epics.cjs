const { execSync } = require('child_process');

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' });
  } catch (e) {
    return null;
  }
}

const mode = process.argv[2] || 'list'; // list, short, detailed

const issuesJson = run('gh issue list --repo ously-org/monorepo --label "Epic" --json number,title,body,state');
if (!issuesJson) {
  console.log('Error: Could not fetch Epics.');
  process.exit(1);
}

const epics = JSON.parse(issuesJson);

// Fetch project items to calculate progress
const itemsJson = run('gh project item-list 1 --owner ously-org --format json');
const items = itemsJson ? JSON.parse(itemsJson).items : [];

epics.forEach(epic => {
  if (mode === 'list') {
    console.log(`#${epic.number} - ${epic.title} [${epic.state}]`);
  } else {
    // Calculate progress based on sub-issues
    const subIssues = items.filter(item => {
      // This is a heuristic: check if the item's body or title links to this epic 
      // or if it has a 'Parent issue' field that matches (if gh provides it)
      // In a real scenario, we might use gh api graphql to get exact sub-issues
      return false; // Placeholder for exact logic
    });
    
    if (mode === 'short') {
      console.log(`#${epic.number} - ${epic.title}`);
      console.log(`   Status: ${epic.state}`);
    } else if (mode === 'detailed') {
      console.log('='.repeat(40));
      console.log(`#${epic.number} - ${epic.title}`);
      console.log(`Status: ${epic.state}`);
      console.log('-'.repeat(20));
      console.log(epic.body || 'No description.');
      console.log('='.repeat(40));
    }
  }
});
