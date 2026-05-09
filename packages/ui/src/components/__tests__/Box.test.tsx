import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Box } from "../Box";

describe("Box", () => {
  it("renders as a div by default", () => {
    const { container } = render(<Box>Test Content</Box>);
    expect(container.firstChild?.nodeName).toBe("DIV");
    expect(screen.getByText("Test Content")).toBeDefined();
  });

  it("applies display classes", () => {
    const { container } = render(<Box display="flex">Flex Box</Box>);
    expect(container.firstChild).toHaveClass("flex");
  });

  it("applies flex direction classes", () => {
    const { container } = render(
      <Box display="flex" direction="col">
        Column Box
      </Box>,
    );
    expect(container.firstChild).toHaveClass("flex");
    expect(container.firstChild).toHaveClass("flex-col");
  });

  it("applies alignment and justification classes", () => {
    const { container } = render(
      <Box display="flex" align="center" justify="between">
        Aligned Box
      </Box>,
    );
    expect(container.firstChild).toHaveClass("items-center");
    expect(container.firstChild).toHaveClass("justify-between");
  });

  it("applies padding and gap semantic variants", () => {
    const { container } = render(
      <Box display="flex" padding="lg" gap="sm">
        Spaced Box
      </Box>,
    );
    expect(container.firstChild).toHaveClass("p-4");
    expect(container.firstChild).toHaveClass("gap-2");
  });

  it("renders as a different element when asChild is used", () => {
    const { container } = render(
      <Box asChild>
        <section>Section Box</section>
      </Box>,
    );
    expect(container.firstChild?.nodeName).toBe("SECTION");
    expect(screen.getByText("Section Box")).toBeDefined();
  });
});
