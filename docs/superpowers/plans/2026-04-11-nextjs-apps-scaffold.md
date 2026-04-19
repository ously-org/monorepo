# Next.js Apps Scaffolding Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold two Next.js applications (`web-main`, `web-prosper`) in the monorepo, injecting shared Tailwind configuration and defining per-app color schemes.

**Architecture:** Two independent Next.js apps sharing Tailwind configuration, UI components, and TypeScript settings from the monorepo's `packages/`.

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, TypeScript, Cloudflare Wrangler.

---

### Task 1: Scaffold `apps/web-main` (Ously)

**Files:**
- Create: `apps/web-main/package.json`
- Create: `apps/web-main/tailwind.config.ts`
- Create: `apps/web-main/app/globals.css`
- Create: `apps/web-main/tsconfig.json`
- Create: `apps/web-main/postcss.config.mjs`

- [ ] **Step 1: Create `apps/web-main/package.json`**

```json
{
  "name": "web-main",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@ously/auth": "workspace:*",
    "@ously/db": "workspace:*",
    "@ously/ods": "workspace:*",
    "@ously/types": "workspace:*",
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@ously/config-tailwind": "workspace:*",
    "@ously/tsconfig": "workspace:*",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create `apps/web-main/tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";
import sharedConfig from "@ously/config-tailwind";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  presets: [sharedConfig as any],
};
export default config;
```

- [ ] **Step 3: Create `apps/web-main/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%; /* Ously Blue */
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

- [ ] **Step 4: Create `apps/web-main/tsconfig.json`**

```json
{
  "extends": "@ously/tsconfig/base.json",
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Create `apps/web-main/postcss.config.mjs`**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
```

---

### Task 2: Scaffold `apps/web-prosper` (Prosper)

**Files:**
- Create: `apps/web-prosper/package.json`
- Create: `apps/web-prosper/tailwind.config.ts`
- Create: `apps/web-prosper/app/globals.css`
- Create: `apps/web-prosper/tsconfig.json`
- Create: `apps/web-prosper/postcss.config.mjs`

- [ ] **Step 1: Create `apps/web-prosper/package.json`**

```json
{
  "name": "web-prosper",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@ously/auth": "workspace:*",
    "@ously/db": "workspace:*",
    "@ously/ods": "workspace:*",
    "@ously/types": "workspace:*",
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@ously/config-tailwind": "workspace:*",
    "@ously/tsconfig": "workspace:*",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

- [ ] **Step 2: Create `apps/web-prosper/tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";
import sharedConfig from "@ously/config-tailwind";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  presets: [sharedConfig as any],
};
export default config;
```

- [ ] **Step 3: Create `apps/web-prosper/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 142.1 76.2% 36.3%; /* Prosper Green */
  --primary-foreground: 355.7 100% 97.3%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 142.1 76.2% 36.3%;
  --radius: 0.5rem;
}
```

- [ ] **Step 4: Create `apps/web-prosper/tsconfig.json`**

```json
{
  "extends": "@ously/tsconfig/base.json",
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Create `apps/web-prosper/postcss.config.mjs`**

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;
```

---

### Task 3: Create Layout and Home Page for `web-main`

**Files:**
- Create: `apps/web-main/app/layout.tsx`
- Create: `apps/web-main/app/page.tsx`

- [ ] **Step 1: Create `apps/web-main/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ously",
  description: "Ously monorepo main app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Create `apps/web-main/app/page.tsx`**

```tsx
import { Button } from "@ously/ods";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Ously</h1>
      <Button>Ously Button</Button>
    </main>
  );
}
```

---

### Task 4: Create Layout and Home Page for `web-prosper`

**Files:**
- Create: `apps/web-prosper/app/layout.tsx`
- Create: `apps/web-prosper/app/page.tsx`

- [ ] **Step 1: Create `apps/web-prosper/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prosper",
  description: "Ously monorepo prosper app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Create `apps/web-prosper/app/page.tsx`**

```tsx
import { Button } from "@ously/ods";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Prosper</h1>
      <Button>Prosper Button</Button>
    </main>
  );
}
```

---

### Task 5: Create `wrangler.toml` for both apps

**Files:**
- Create: `apps/web-main/wrangler.toml`
- Create: `apps/web-prosper/wrangler.toml`

- [ ] **Step 1: Create `apps/web-main/wrangler.toml`**

```toml
name = "web-main"
compatibility_date = "2024-05-29"
pages_build_output_dir = ".next"

[env.production]
name = "web-main-prod"
route = "ously.com"
```

- [ ] **Step 2: Create `apps/web-prosper/wrangler.toml`**

```toml
name = "web-prosper"
compatibility_date = "2024-05-29"
pages_build_output_dir = ".next"

[env.production]
name = "web-prosper-prod"
route = "prosper.ously.com"
```

---

### Task 6: Install and Commit

- [ ] **Step 1: Run `pnpm install`**

Run: `pnpm install`
Expected: SUCCESS

- [ ] **Step 2: Commit changes**

Run: `git add . && git commit -m "feat: Next.js apps scaffold (web-main, web-prosper)"`
Expected: SUCCESS
