import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";

describe("Collapsible Component", () => {
  it("renders correctly and toggles content", async () => {
    const user = userEvent.setup();
    render(
      <Collapsible>
        <CollapsibleTrigger>Toggle</CollapsibleTrigger>
        <CollapsibleContent data-testid="content">
          Hidden Content
        </CollapsibleContent>
      </Collapsible>,
    );

    // Content should be hidden initially (Radix uses data-state or hidden)
    const content = screen.queryByTestId("content");
    expect(content).not.toBeVisible();

    const trigger = screen.getByText("Toggle");
    await user.click(trigger);

    // After click, it should be visible
    expect(screen.getByTestId("content")).toBeVisible();
  });
});
