import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Separator } from "../separator";

describe("Separator Component", () => {
  it("renders correctly", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toBeInTheDocument();
  });

  it("applies the correct orientation class", () => {
    const { rerender } = render(<Separator orientation="horizontal" data-testid="separator" />);
    expect(screen.getByTestId("separator")).toHaveAttribute("data-orientation", "horizontal");

    rerender(<Separator orientation="vertical" data-testid="separator" />);
    expect(screen.getByTestId("separator")).toHaveAttribute("data-orientation", "vertical");
  });

  it("applies custom className", () => {
    render(<Separator className="custom-class" data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator).toHaveClass("custom-class");
  });
});
