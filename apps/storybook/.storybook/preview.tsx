import React, { useEffect } from "react";
import type { Preview } from "storybook";
import { INITIAL_VIEWPORTS } from "storybook/viewport";
import "./globals.css";

/**
 * Decorator that applies theme classes to both the story wrapper AND
 * document.documentElement/body so that Radix UI portaled content
 * (dropdown menus, tooltips, popovers, dialogs) inherits the correct
 * theme CSS variables.
 */
function ThemeDecorator({
  theme,
  mode,
  children,
}: {
  theme: string;
  mode: string;
  children: React.ReactNode;
}) {
  const themeClass = theme === "prosper" ? "theme-prosper" : "theme-ously";
  const otherThemeClass = theme === "prosper" ? "theme-ously" : "theme-prosper";
  const isDark = mode === "dark";

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Apply theme class to both html and body for portal coverage
    root.classList.add(themeClass);
    root.classList.remove(otherThemeClass);
    body.classList.add(themeClass);
    body.classList.remove(otherThemeClass);

    // Toggle dark class
    if (isDark) {
      root.classList.add("dark");
      body.classList.add("dark");
      root.setAttribute("data-mode", "dark");
    } else {
      root.classList.remove("dark");
      body.classList.remove("dark");
      root.setAttribute("data-mode", "light");
    }

    // Apply background/foreground to body for portaled content
    body.style.backgroundColor = "var(--background)";
    body.style.color = "var(--foreground)";
    root.style.setProperty("--font-mono", '"JetBrains Mono", monospace');

    return () => {
      root.classList.remove(themeClass, "dark");
      body.classList.remove(themeClass, "dark");
      root.removeAttribute("data-mode");
      body.style.backgroundColor = "";
      body.style.color = "";
    };
  }, [themeClass, otherThemeClass, isDark]);

  return (
    <div className={`${themeClass}${isDark ? " dark" : ""} font-mono`} data-mode={mode}>
      {children}
    </div>
  );
}

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "ously",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "ously", icon: "circle", title: "Ously" },
          { value: "prosper", icon: "circle", title: "Prosper" },
        ],
        showName: true,
      },
    },
    mode: {
      description: "Light/Dark mode",
      defaultValue: "light",
      toolbar: {
        title: "Mode",
        icon: "moon",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme, mode } = context.globals;
      return (
        <ThemeDecorator theme={theme} mode={mode}>
          <Story />
        </ThemeDecorator>
      );
    },
  ],
};

export default preview;
