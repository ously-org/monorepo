import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { RatioDonutCompare } from "../RatioDonutCompare";
import type { RatioDonutCompareItem } from "../RatioDonutCompare";

const sampleItems: RatioDonutCompareItem[] = [
  { name: "A", value: 50 },
  { name: "B", value: 30 },
  { name: "C", value: 20 },
];

describe("RatioDonutCompare", () => {
  it("renders an SVG element", () => {
    const { container } = render(<RatioDonutCompare items={sampleItems} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders the correct number of segments for main items", () => {
    const { container } = render(
      <RatioDonutCompare items={sampleItems} smallPercentageThreshold={0} />,
    );
    const circles = container.querySelectorAll("svg circle");
    expect(circles.length).toBe(sampleItems.length);
  });

  it("groups small items into Other segment", () => {
    const items = [
      { name: "Large", value: 90 },
      { name: "Small", value: 6 },
      { name: "Tiny", value: 4 },
    ];
    const { container } = render(
      <RatioDonutCompare items={items} smallPercentageThreshold={5} />,
    );
    const circles = container.querySelectorAll("svg circle");
    expect(circles.length).toBe(2);
  });

  it("renders a single circle for one item", () => {
    const { container } = render(
      <RatioDonutCompare
        items={[{ name: "Only", value: 100 }]}
        smallPercentageThreshold={0}
      />,
    );
    const circles = container.querySelectorAll("svg circle");
    expect(circles.length).toBe(1);
  });

  it("handles empty items gracefully", () => {
    const { container } = render(<RatioDonutCompare items={[]} />);
    const circles = container.querySelectorAll("svg circle");
    expect(circles.length).toBe(1);
  });

  it("filters out zero values", () => {
    const items = [
      { name: "A", value: 100 },
      { name: "B", value: 0 },
    ];
    const { container } = render(
      <RatioDonutCompare items={items} smallPercentageThreshold={0} />,
    );
    const circles = container.querySelectorAll("svg circle");
    expect(circles.length).toBe(1);
  });

  it("renders with custom size classes", () => {
    const { container } = render(
      <RatioDonutCompare items={sampleItems} size="lg" />,
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("shows center total by default", () => {
    const { getByText } = render(<RatioDonutCompare items={sampleItems} />);
    expect(getByText("100")).toBeInTheDocument();
  });

  it("hides center total when showTotal is false", () => {
    const { queryByText } = render(
      <RatioDonutCompare items={sampleItems} showTotal={false} />,
    );
    expect(queryByText("100")).not.toBeInTheDocument();
  });

  it("renders prefix with center total", () => {
    const { getByText } = render(
      <RatioDonutCompare items={sampleItems} prefix="$" />,
    );
    expect(getByText("$100")).toBeInTheDocument();
  });

  it("uses barSize when provided", () => {
    const { container } = render(
      <RatioDonutCompare items={sampleItems} barSize="sm" />,
    );
    const circles = container.querySelectorAll("svg circle");
    expect(circles.length).toBeGreaterThan(0);
  });

  it("renders detail section when showDetail is true", () => {
    const { getByText } = render(
      <RatioDonutCompare items={sampleItems} showDetail={true} />,
    );
    expect(getByText("100")).toBeInTheDocument();
  });

  it("renders item names in detail section", () => {
    const { getByText } = render(
      <RatioDonutCompare
        items={sampleItems}
        showDetail={true}
        smallPercentageThreshold={0}
      />,
    );
    expect(getByText("A")).toBeInTheDocument();
    expect(getByText("B")).toBeInTheDocument();
    expect(getByText("C")).toBeInTheDocument();
  });
});
