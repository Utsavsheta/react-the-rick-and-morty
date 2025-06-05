import { render, screen } from "@testing-library/react";
import SectionBlock from "./SectionBlock";

describe("SectionBlock Component", () => {
  it("renders title and children correctly", () => {
    render(
      <SectionBlock title="Episode Details">
        <p>Episode 1: Pilot</p>
      </SectionBlock>
    );

    expect(screen.getByRole("heading", { level: 2, name: /episode details/i })).toBeInTheDocument();
    expect(screen.getByText(/episode 1: pilot/i)).toBeInTheDocument();
  });

  it("renders children properly even if empty", () => {
    render(
      <SectionBlock title="Empty Section">
        {/* Provide empty children */}
        <></>
      </SectionBlock>
    );
    expect(screen.getByRole("heading", { level: 2, name: /empty section/i })).toBeInTheDocument();
  });
});
