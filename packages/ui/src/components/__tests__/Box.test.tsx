import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Box } from "../Box";

describe("Box", () => {
  it("renders children", () => {
    const { getByText } = render(<Box>Content</Box>);
    expect(getByText("Content")).toBeInTheDocument();
  });

  it("renders as a section when asChild wraps section", () => {
    const { container } = render(
      <Box asChild>
        <section>Section Content</section>
      </Box>,
    );
    expect(container.firstChild?.nodeName).toBe("SECTION");
  });
});
