/**
 * Simple matcher logic to compare Stitch design output against ODS.
 */
function runMatcher(spec, context) {
  if (!spec || !context) {
    throw new Error('Missing spec or context');
  }

  const ods = (context.ods?.components || []).map(c => c.toLowerCase());
  const content = spec.output?.content || '';

  // Improved regex: match capitalized words or words starting with UI/ODS
  // Also match kebab-case if needed, but ODS components are PascalCase
  const potentialComponents = [...new Set(content.match(/[A-Z][a-zA-Z0-9]+/g) || [])];
  
  const matches = [];
  const gaps = [];

  const ignoreList = [
    'React', 'Component', 'Props', 'Export', 'Default', 'Import', 
    'Type', 'Function', 'Element', 'Node', 'Children', 'Layout'
  ];

  for (const comp of potentialComponents) {
    if (ignoreList.includes(comp)) continue;
    if (comp.length < 3) continue;

    const lowerComp = comp.toLowerCase();
    const existingIndex = ods.indexOf(lowerComp);

    if (existingIndex !== -1) {
      matches.push({
        designComponentName: comp,
        existingComponentName: context.ods.components[existingIndex],
        matchScore: 0.9,
        recommendation: 'reuse',
        notes: 'Direct match found in @ously/ui'
      });
    } else {
      // If it looks like a UI component
      if (/(Card|Button|List|Input|Modal|Dialog|Menu|Header|Footer|Section|Container)$/.test(comp)) {
        gaps.push({
          name: comp,
          description: `Design uses ${comp} which is missing from ODS.`,
          priority: 'high'
        });
      }
    }
  }

  return {
    specId: spec.id,
    matches,
    gaps
  };
}

// Export for module usage
if (typeof module !== 'undefined') {
  module.exports = { runMatcher };
}

// For CLI usage
if (require.main === module) {
  try {
    const spec = JSON.parse(process.argv[2] || '{}');
    const context = JSON.parse(process.argv[3] || '{}');
    process.stdout.write(JSON.stringify(runMatcher(spec, context), null, 2));
  } catch (e) {
    process.stderr.write(`Error: ${e.message}\nUsage: node matcher.js <spec_json> <context_json>\n`);
    process.exit(1);
  }
}
