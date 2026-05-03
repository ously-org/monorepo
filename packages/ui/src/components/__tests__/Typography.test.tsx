import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Typography } from "../Typography";

describe("Typography", () => {
  it("renders with 'text' prop", () => {
    render(<Typography text="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders with 'children' as fallback for 'text' prop", () => {
    render(<Typography>Fallback Text</Typography>);
    expect(screen.getByText("Fallback Text")).toBeInTheDocument();
  });

  it("prioritizes 'text' prop over 'children'", () => {
    render(<Typography text="Prop Text">Children Text</Typography>);
    expect(screen.getByText("Prop Text")).toBeInTheDocument();
    expect(screen.queryByText("Children Text")).not.toBeInTheDocument();
  });

  it("renders as a paragraph by default", () => {
    render(<Typography text="Default text" />);
    const element = screen.getByText("Default text");
    expect(element.tagName).toBe("P");
    expect(element).toHaveClass("text-foreground");
  });

  it("renders as an h1 when variant is h1", () => {
    render(<Typography variant="h1" text="Heading 1" />);
    const element = screen.getByText("Heading 1");
    expect(element.tagName).toBe("H1");
    expect(element).toHaveClass("text-4xl");
  });

  it("renders with primary color when color prop is primary", () => {
    render(<Typography color="primary" text="Primary Text" />);
    const element = screen.getByText("Primary Text");
    expect(element).toHaveClass("text-primary");
  });

  it("renders with natural color when color prop is natural", () => {
    render(<Typography color="natural" text="Natural Text" />);
    const element = screen.getByText("Natural Text");
    expect(element).toHaveClass("text-muted-foreground");
  });

  it("renders as a custom element when 'as' prop is provided", () => {
    render(<Typography variant="h1" as="span" text="Span Heading" />);
    const element = screen.getByText("Span Heading");
    expect(element.tagName).toBe("SPAN");
    expect(element).toHaveClass("text-4xl");
  });

  it("renders as a blockquote with correct styles", () => {
    render(<Typography variant="blockquote" text="Quote" />);
    const element = screen.getByText("Quote");
    expect(element.tagName).toBe("BLOCKQUOTE");
    expect(element).toHaveClass("border-l-2");
  });

  it("renders as a code element for inlineCode variant", () => {
    render(<Typography variant="inlineCode" text="npm install" />);
    const element = screen.getByText("npm install");
    expect(element.tagName).toBe("CODE");
    expect(element).toHaveClass("font-mono");
  });
});
