import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from "../input";

describe("Input Component", () => {
  it("renders correctly", () => {
    render(<Input placeholder="Test input" />);
    const input = screen.getByPlaceholderText("Test input");
    expect(input).toBeInTheDocument();
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Test input" />);
    const input = screen.getByPlaceholderText("Test input");
    await user.type(input, "Hello World");
    expect(input).toHaveValue("Hello World");
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Input placeholder="Test input" disabled />);
    const input = screen.getByPlaceholderText("Test input");
    expect(input).toBeDisabled();
  });

  it("renders as the specified type", () => {
    render(<Input placeholder="Test input" type="password" />);
    const input = screen.getByPlaceholderText("Test input");
    expect(input).toHaveAttribute("type", "password");
  });

  it("applies custom className", () => {
    render(<Input placeholder="Test input" className="custom-class" />);
    const input = screen.getByPlaceholderText("Test input");
    expect(input).toHaveClass("custom-class");
  });
});
