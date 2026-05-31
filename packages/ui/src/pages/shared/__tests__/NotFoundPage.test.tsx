import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NotFoundPage } from "../NotFoundPage";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("NotFoundPage", () => {
  it("renders default content", () => {
    render(<NotFoundPage />);
    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The page you're looking for doesn't exist or has been moved.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go home/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("renders custom content via props", () => {
    render(
      <NotFoundPage
        title="403"
        heading="Access Denied"
        message="No permission."
        actionLabel="Back"
        actionHref="/dashboard"
      />,
    );
    expect(screen.getByText("403")).toBeInTheDocument();
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(screen.getByText("No permission.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back/i })).toHaveAttribute(
      "href",
      "/dashboard",
    );
  });

  it("renders the compass icon", () => {
    render(<NotFoundPage />);
    expect(document.querySelector("svg")).toBeInTheDocument();
  });
});
