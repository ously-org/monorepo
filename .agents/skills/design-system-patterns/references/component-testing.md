# Component Testing Patterns

## Overview

Test behavior, not render. Focus on what the component **does** for the user, not what HTML it produces. Avoid asserting on class names, tag names, or internal structure.

## Core Principles

1. **Test from the user's perspective** — use `getByRole`, `getByLabelText`, `getByText`
2. **Never assert on class names** — classes are implementation details
3. **Never assert on tag names** — semantic HTML can change
4. **Test accessibility** — verify roles, labels, and keyboard interactions
5. **Prefer behavior queries** — `byRole` over `byTestId`, `byText` over `byTestId`

## ✅ Good: Behavior Tests

```tsx
describe("Link", () => {
  it("navigates to the correct href", () => {
    render(<Link href="/dashboard">Dashboard</Link>);
    const link = screen.getByRole("link", { name: /dashboard/i });
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("shows icon alongside text", () => {
    render(<Link href="/" icon={Home} title="Home" />);
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("img", { hidden: true })).toBeInTheDocument(); // icon
  });
});
```

```tsx
describe("Typography", () => {
  it("renders text content", () => {
    render(<Typography text="Hello" />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("prioritizes text prop over children", () => {
    render(<Typography text="Prop">Child</Typography>);
    expect(screen.getByText("Prop")).toBeInTheDocument();
    expect(screen.queryByText("Child")).not.toBeInTheDocument();
  });
});
```

```tsx
describe("Header", () => {
  it("parses pathname into breadcrumb segments", () => {
    render(
      <SidebarProvider>
        <Header pathname="/dashboard/settings" />
      </SidebarProvider>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders sidebar toggle button", () => {
    render(
      <SidebarProvider>
        <Header pathname="/" />
      </SidebarProvider>,
    );
    expect(screen.getByText("Toggle Sidebar")).toBeInTheDocument();
  });
});
```

```tsx
describe("OuslySidebar", () => {
  it("renders footer navigation links", () => {
    render(
      <TooltipProvider>
        <SidebarProvider>
          <OuslySidebar footer={[{ title: "Logout", href: "/logout" }]} />
        </SidebarProvider>
      </TooltipProvider>,
    );
    expect(screen.getByRole("link", { name: /logout/i })).toHaveAttribute(
      "href",
      "/logout",
    );
  });
});
```

## ❌ Bad: Render Tests

```tsx
// DON'T: assert on class names
it("applies display classes", () => {
  const { container } = render(<Box display="flex">Content</Box>);
  expect(container.firstChild).toHaveClass("flex"); // ❌ implementation detail
});

// DON'T: assert on tag names
it("renders as a paragraph by default", () => {
  render(<Typography text="Hi" />);
  expect(screen.getByText("Hi").tagName).toBe("P"); // ❌ implementation detail
});

// DON'T: assert on component internals
it("applies variant classes", () => {
  const { container } = render(<Button variant="primary">Click</Button>);
  expect(container.firstChild).toHaveClass("bg-primary"); // ❌ implementation detail
});
```

## What to Test

| What                  | Example                            |
| --------------------- | ---------------------------------- |
| Content rendering     | Text/content appears correctly     |
| Navigation            | Links have correct hrefs           |
| User interaction      | Click, hover, focus behavior       |
| Conditional rendering | Content shows/hides based on props |
| Accessibility         | Roles, labels, keyboard support    |
| State changes         | Open/close, active/inactive        |

## What NOT to Test

| What                  | Why                                         |
| --------------------- | ------------------------------------------- |
| Class names           | Implementation detail, changes with styling |
| Tag names             | Semantic HTML can change                    |
| Internal state        | Should test through user-facing behavior    |
| Third-party libraries | Already tested by their maintainers         |
| CSS/styling           | Visual regression tests are separate        |
