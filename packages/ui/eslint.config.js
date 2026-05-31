import nextConfig from "eslint-config-next";

const RAW_HTML_TAGS = new Set([
  "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base",
  "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption",
  "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del",
  "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset",
  "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5",
  "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img",
  "input", "ins", "kbd", "label", "legend", "li", "link", "main", "map",
  "mark", "menu", "meta", "meter", "nav", "noscript", "object", "ol",
  "optgroup", "option", "output", "p", "picture", "pre", "progress", "q",
  "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "slot",
  "small", "source", "span", "strong", "style", "sub", "summary", "sup",
  "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead",
  "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr",
]);

const noRawHtmlOutsideInternal = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow raw HTML elements outside of src/internal/",
    },
    messages: {
      noRawHtml:
        "Raw HTML element '<{{ tagName }}>' is not allowed outside of 'src/internal/'. Use a wrapped component instead.",
    },
    schema: [],
  },
  create(context) {
    return {
      JSXElement(node) {
        const tagName = node.openingElement.name;
        if (!tagName || typeof tagName.name !== "string") return;
        if (!RAW_HTML_TAGS.has(tagName.name)) return;

        const filename = context.filename || context.getFilename();
        if (filename.includes("/internal/")) return;
        if (filename.includes("/__stories__/")) return;
        if (filename.includes("/__tests__/")) return;

        context.report({
          node,
          messageId: "noRawHtml",
          data: { tagName: tagName.name },
        });
      },
    };
  },
};

const config = [
  ...nextConfig,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    plugins: {
      ously: {
        rules: {
          "no-raw-html-outside-internal": noRawHtmlOutsideInternal,
        },
      },
    },
    rules: {
      "ously/no-raw-html-outside-internal": "error",
    },
  },
  {
    files: ["src/internal/**"],
    rules: {
      "ously/no-raw-html-outside-internal": "off",
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: [".next/*", "dist/*", "node_modules/*", "storybook-static/*"],
  },
];

export default config;
