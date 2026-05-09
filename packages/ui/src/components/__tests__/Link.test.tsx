import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Link } from "../Link";
import { Home } from "lucide-react";

// Mock next/link to avoid issues with Next.js router in tests
vi.mock("next/link", () => {
  return {
    default: ({ children, href, className, ...props }: any) => {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    },
  };
});

describe("Link", () => {
  it("renders an anchor tag with the correct href", () => {
    render(<Link href="/test">Test Link</Link>);
    const link = screen.getByRole("link", { name: /test link/i });
    expect(link).toBeDefined();
    expect(link.getAttribute("href")).toBe("/test");
  });

  it("renders icon when provided", () => {
    const { container } = render(
      <Link href="/test" icon={Home} title="Home" />,
    );
    expect(container.querySelector("svg")).toBeDefined();
    expect(screen.getByText("Home")).toBeDefined();
  });

  it("applies variant classes", () => {
    const { container } = render(
      <Link href="/test" variant="primary">
        Primary Link
      </Link>,
    );
    expect(container.firstChild).toHaveClass("text-primary");
  });

  it("applies size classes", () => {
    const { container } = render(
      <Link href="/test" size="sm">
        Small Link
      </Link>,
    );
    expect(container.firstChild).toHaveClass("text-xs");
  });

  it("renders title inside Typography as a span", () => {
    render(<Link href="/test" title="Typed Title" />);
    const title = screen.getByText("Typed Title");
    expect(title.nodeName).toBe("SPAN");
  });

  it("renders children when title is not provided", () => {
    render(
      <Link href="/test">
        <span data-testid="custom-child">Custom Child</span>
      </Link>,
    );
    expect(screen.getByTestId("custom-child")).toBeDefined();
  });
});
