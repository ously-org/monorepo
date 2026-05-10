const fs = require('fs');
const path = require('path');

/**
 * Scans the ODS components directory.
 */
function scanComponents() {
  const dir = path.join(process.cwd(), 'packages/ui/src/components');
  if (!fs.existsSync(dir)) return [];
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.tsx'))
      .map(f => f.replace('.tsx', ''));
  } catch (e) {
    return [];
  }
}

/**
 * Scans apps for route structures.
 */
function scanApps() {
  const appsDir = path.join(process.cwd(), 'apps');
  const apps = [];
  if (!fs.existsSync(appsDir)) return apps;
  
  try {
    const directories = fs.readdirSync(appsDir);
    for (const appName of directories) {
      if (appName === 'storybook' || appName === 'api') continue;
      
      const appPath = path.join(appsDir, appName, 'app');
      if (fs.existsSync(appPath)) {
        const routes = [];
        function findRoutes(currentPath, routePrefix = '') {
          try {
            const items = fs.readdirSync(currentPath);
            for (const item of items) {
              if (item === 'node_modules' || item === '.next' || item === '_components') continue;
              
              const fullPath = path.join(currentPath, item);
              const stat = fs.statSync(fullPath);
              
              if (stat.isDirectory()) {
                // Skip route groups like (marketing)
                const segment = item.startsWith('(') && item.endsWith(')') ? '' : item;
                findRoutes(fullPath, segment ? `${routePrefix}/${segment}` : routePrefix);
              } else if (item === 'page.tsx') {
                routes.push(routePrefix || '/');
              }
            }
          } catch (e) {
            // Skip problematic paths
          }
        }
        findRoutes(appPath);
        apps.push({
          name: appName,
          routes: [...new Set(routes)],
          mainComponents: [] // Still placeholder for now
        });
      }
    }
  } catch (e) {
    // Top level error
  }
  return apps;
}

/**
 * Extracts theme tokens from tailwind-preset.
 */
function getTheme() {
  const presetPath = path.join(process.cwd(), 'packages/ui/src/tailwind-preset.ts');
  // Simple regex extraction as we are in a script context without full TS support
  if (fs.existsSync(presetPath)) {
    const content = fs.readFileSync(presetPath, 'utf8');
    const themeMatch = content.match(/colors: \{([\s\S]+?)\},/);
    if (themeMatch) {
      // Very basic extraction of primary/background for now
      return {
        colors: {
          primary: 'var(--primary)',
          background: 'var(--background)',
          foreground: 'var(--foreground)',
        },
        spacing: { base: '4px', md: '8px', lg: '16px' },
        typography: { sans: 'system-ui, sans-serif' }
      };
    }
  }
  return {
    colors: { primary: '#000' },
    spacing: {},
    typography: {}
  };
}

const context = {
  apps: scanApps(),
  ods: {
    components: scanComponents(),
    theme: getTheme()
  },
  functionality: [
    "Authentication (Better Auth)",
    "Monorepo management (Turborepo)",
    "Shared UI system (shadcn/ui wrapped)"
  ]
};

process.stdout.write(JSON.stringify(context, null, 2));
