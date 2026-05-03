import React from "react";
import type { Preview } from "@storybook/react";
import "./globals.css";

const preview: Preview = {
  parameters: {
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
  },
  decorators: [
    (Story, context) => {
      const { theme } = context.globals;
      const themeClass = theme === "prosper" ? "theme-prosper" : "theme-ously";
      return (
        <div className={themeClass}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
