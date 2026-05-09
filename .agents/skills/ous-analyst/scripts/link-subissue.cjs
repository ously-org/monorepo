const { execSync } = require('child_process');

function run(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8' });
  } catch (e) {
    return null;
  }
}

const parentNum = process.argv[2];
const childNum = process.argv[3];

if (!parentNum || !childNum) {
  console.log('Usage: node link-subissue.cjs <parent_num> <child_num>');
  process.exit(1);
}

// 1. Resolve Global IDs
const parentId = run(`gh issue view ${parentNum} --repo ously-org/monorepo --json id -q .id`).trim();
const childId = run(`gh issue view ${childNum} --repo ously-org/monorepo --json id -q .id`).trim();

if (!parentId || !childId) {
  console.log('Error: Could not resolve IDs.');
  process.exit(1);
}

// 2. Execute Mutation
const mutation = `
mutation {
  addSubIssue(input: { issueId: "${parentId}", subIssueId: "${childId}" }) {
    issue {
      number
      subIssuesProgress {
        totalCount
        completedCount
      }
    }
  }
}
`;

const result = run(`gh api graphql -f query='${mutation}'`);
if (result) {
  console.log(`✅ Successfully linked #${childNum} as a sub-issue of #${parentNum}`);
} else {
  console.log('❌ Failed to link issues.');
}
