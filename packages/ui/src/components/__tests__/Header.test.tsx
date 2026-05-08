import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Header } from "../Header";
import { SidebarProvider } from "../../internal/sidebar";

// Mock useIsMobile hook
vi.mock("../../hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

describe("Header", () => {
  it("renders correctly with breadcrumbs", () => {
    render(
      <SidebarProvider>
        <Header pathname="/dashboard/settings" />
      </SidebarProvider>,
    );

    // HeaderBreadcrumb should render "Home", "Dashboard", "Settings"
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders SidebarTrigger", () => {
    render(
      <SidebarProvider>
        <Header pathname="/" />
      </SidebarProvider>,
    );

    // SidebarTrigger has a sr-only text "Toggle Sidebar"
    expect(screen.getByText("Toggle Sidebar")).toBeInTheDocument();
  });
});
