import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HeaderBreadcrumb } from "../breadcrumbWIthPart";

// Mock next/link to avoid issues in test environment
vi.mock("next/link", () => {
  return {
    default: ({
      children,
      href,
    }: {
      children: React.ReactNode;
      href: string;
    }) => {
      return <a href={href}>{children}</a>;
    },
  };
});

describe("HeaderBreadcrumb Component", () => {
  it("renders correctly for the home path", () => {
    render(<HeaderBreadcrumb pathname="/" />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    // For home path, there should be no separators or additional items
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });

  it("renders correctly for a deep path", () => {
    render(<HeaderBreadcrumb pathname="/docs/components/breadcrumb" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
    expect(screen.getByText("Breadcrumb")).toBeInTheDocument();

    // Check if the last item is a page (aria-current="page")
    const lastItem = screen.getByText("Breadcrumb");
    expect(lastItem).toHaveAttribute("aria-current", "page");
  });

  it("formats segment labels correctly", () => {
    render(<HeaderBreadcrumb pathname="/my-cool-component" />);
    expect(screen.getByText("My cool component")).toBeInTheDocument();
  });

  it("returns null if pathname is null", () => {
    const { container } = render(<HeaderBreadcrumb pathname={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
