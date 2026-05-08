import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../sheet";

describe("Sheet Component", () => {
  it("renders the trigger and opens the sheet on click", async () => {
    const user = userEvent.setup();
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent data-testid="content">
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );

    const trigger = screen.getByText("Open");
    expect(trigger).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.getByText("Sheet Title")).toBeInTheDocument();
  });
});
