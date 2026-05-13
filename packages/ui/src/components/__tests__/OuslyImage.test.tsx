import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OuslyImage } from "../OuslyImage";

describe("OuslyImage", () => {
  it("renders with src and alt attributes", () => {
    const { container } = render(<OuslyImage src="/logo.png" alt="Logo" />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", "/logo.png");
    expect(img).toHaveAttribute("alt", "Logo");
  });

  it("applies width and height when provided", () => {
    const { container } = render(<OuslyImage src="/test.png" alt="Test" width={100} height={50} />);
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("width", "100");
    expect(img).toHaveAttribute("height", "50");
  });
});
