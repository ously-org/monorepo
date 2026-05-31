import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RatioDonut } from "../RatioDonut";

describe("RatioDonut", () => {
  it("renders an SVG element", () => {
    const { container } = render(<RatioDonut value={50} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("shows percentage label by default", () => {
    const { getByText } = render(<RatioDonut value={75} max={100} />);
    expect(getByText("75%")).toBeInTheDocument();
  });

  it("renders custom center content", () => {
    const { getByText } = render(
      <RatioDonut value={50}>
        <span>Custom</span>
      </RatioDonut>,
    );
    expect(getByText("Custom")).toBeInTheDocument();
  });

  it("hides label when showLabel is false and no children", () => {
    const { container } = render(<RatioDonut value={50} showLabel={false} />);
    const centerDiv = container.querySelector(".absolute.inset-0");
    expect(centerDiv).not.toBeInTheDocument();
  });

  it("clamps percentage between 0 and 100", () => {
    const { getByText } = render(<RatioDonut value={150} max={100} />);
    expect(getByText("100%")).toBeInTheDocument();

    const { getByText: getByText2 } = render(
      <RatioDonut value={-10} max={100} />,
    );
    expect(getByText2("0%")).toBeInTheDocument();
  });

  it("renders two circles (track + arc)", () => {
    const { container } = render(<RatioDonut value={50} />);
    const circles = container.querySelectorAll("circle");
    expect(circles.length).toBe(2);
  });
});
