import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { SignInPage } from "../SignInPage";

describe("SignInPage", () => {
  it("renders default content", () => {
    render(<SignInPage signInUrl="/auth/google" />);
    expect(screen.getByText("Welcome to")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in with google/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/accept/i),
    ).toBeInTheDocument();
  });

  it("renders appName when provided", () => {
    render(<SignInPage signInUrl="/auth/google" appName="Prosper" />);
    expect(screen.getByText("Prosper")).toBeInTheDocument();
  });

  it("renders logo image when provided", () => {
    render(
      <SignInPage signInUrl="/auth/google" logoImage="https://example.com/logo.png" />,
    );
    const img = screen.getByAltText("App Logo");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/logo.png");
  });

  it("renders custom logo alt text", () => {
    render(
      <SignInPage
        signInUrl="/auth/google"
        logoImage="https://example.com/logo.png"
        logoAlt="Custom Logo"
      />,
    );
    expect(screen.getByAltText("Custom Logo")).toBeInTheDocument();
  });

  it("does not render logo when not provided", () => {
    render(<SignInPage signInUrl="/auth/google" />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("disables sign-in button until terms are accepted", async () => {
    const user = userEvent.setup();
    render(<SignInPage signInUrl="/auth/google" />);

    const button = screen.getByRole("button", { name: /sign in with google/i });
    expect(button).toBeDisabled();

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(button).toBeEnabled();
  });
});
