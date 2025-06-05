import { render, screen } from "@testing-library/react";
import InfoItem from "./InfoItem";

describe("InfoItem Component", () => {
  it("renders label and value correctly", () => {
    render(<InfoItem label="Status" value="Alive" />);
    expect(screen.getByText(/status:/i)).toBeInTheDocument();
    expect(screen.getByText(/alive/i)).toBeInTheDocument();
  });

  it("renders 'Unknown' when value is empty or falsy", () => {
    render(<InfoItem label="Type" value="" />);
    expect(screen.getByText(/type:/i)).toBeInTheDocument();
    expect(screen.getByText(/unknown/i)).toBeInTheDocument();
  });
});
