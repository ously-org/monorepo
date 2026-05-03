import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { OuslySidebar } from "../OuslySidebar";
import { SidebarProvider } from "../../internal/sidebar";
import { TooltipProvider } from "../../internal/tooltip";

// Mock useIsMobile hook
vi.mock("../../hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

describe("OuslySidebar", () => {
  it("renders correctly with title", () => {
    render(
      <TooltipProvider>
        <SidebarProvider>
          <OuslySidebar title="TEST PROSPER" />
        </SidebarProvider>
      </TooltipProvider>,
    );

    expect(screen.getByText("TEST PROSPER")).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <TooltipProvider>
        <SidebarProvider>
          <OuslySidebar>
            <div data-testid="sidebar-content">Content</div>
          </OuslySidebar>
        </SidebarProvider>
      </TooltipProvider>,
    );

    expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
  });

  it("renders footer correctly", () => {
    render(
      <TooltipProvider>
        <SidebarProvider>
          <OuslySidebar footer={[{ title: "Footer Link", href: "/footer" }]} />
        </SidebarProvider>
      </TooltipProvider>,
    );

    expect(screen.getByText("Footer Link")).toBeInTheDocument();
  });

  it("applies justify-center to the NavHeader Link", () => {
    render(
      <TooltipProvider>
        <SidebarProvider>
          <OuslySidebar
            title="NAV HEADER TEST"
            footer={[{ title: "Footer Link", href: "/footer" }]}
          />
        </SidebarProvider>
      </TooltipProvider>,
    );

    const link = screen.getByRole("link", { name: /NAV HEADER TEST/i });
    expect(link).toHaveClass("justify-center");
  });
});
