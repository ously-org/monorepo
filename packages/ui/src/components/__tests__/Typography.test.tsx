import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Typography } from "../Typography";

describe("Typography", () => {
  it("renders text content", () => {
    render(<Typography text="Hello World" />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("renders children as fallback", () => {
    render(<Typography>Fallback Text</Typography>);
    expect(screen.getByText("Fallback Text")).toBeInTheDocument();
  });

  it("prioritizes text prop over children", () => {
    render(<Typography text="Prop Text">Children Text</Typography>);
    expect(screen.getByText("Prop Text")).toBeInTheDocument();
    expect(screen.queryByText("Children Text")).not.toBeInTheDocument();
  });

  it("renders as a custom element via as prop", () => {
    render(<Typography as="span" text="Span Element" />);
    expect(screen.getByText("Span Element").tagName).toBe("SPAN");
  });
});
