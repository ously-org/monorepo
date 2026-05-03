import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent } from "../sidebar";

// Mock useIsMobile hook
vi.mock("../hooks/use-mobile", () => ({
  useIsMobile: vi.fn(() => false),
}));

describe("Sidebar Component", () => {
  it("renders correctly and toggles state", async () => {
    const user = userEvent.setup();
    render(
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
        <SidebarTrigger data-testid="trigger" />
      </SidebarProvider>
    );

    const trigger = screen.getByTestId("trigger");
    const sidebar = document.body.querySelector('[data-slot="sidebar"]');
    
    // Check initial state
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveAttribute("data-state", "expanded");

    await user.click(trigger);
    
    // Check collapsed state
    expect(sidebar).toHaveAttribute("data-state", "collapsed");
  });
});
