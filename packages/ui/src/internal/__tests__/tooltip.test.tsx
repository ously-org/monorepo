import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

describe("Tooltip Component", () => {
  it("renders the trigger correctly", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tooltip content</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("shows tooltip content on hover", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent data-testid="tooltip-content">
            Tooltip content
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    const trigger = screen.getByText("Hover me");
    await user.hover(trigger);

    await waitFor(() => {
      expect(screen.getByTestId("tooltip-content")).toBeInTheDocument();
    });
  });
});
