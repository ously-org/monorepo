import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Link } from "../Link";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Link", () => {
  it("renders with the correct href", () => {
    render(<Link href="/dashboard">Dashboard</Link>);
    const link = screen.getByRole("link", { name: /dashboard/i });
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("renders icon alongside title", () => {
    render(<Link href="/" icon="phosphor.house" title="Home" />);
    const link = screen.getByRole("link", { name: /home/i });
    expect(link).toBeInTheDocument();
    expect(link.querySelector("svg")).toBeInTheDocument();
  });

  it("renders children when title is not provided", () => {
    render(
      <Link href="/test">
        <span data-testid="child">Child</span>
      </Link>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies target and rel attributes", () => {
    render(
      <Link href="/external" target="_blank" rel="noopener">
        External
      </Link>,
    );
    const link = screen.getByRole("link", { name: /external/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });
});
