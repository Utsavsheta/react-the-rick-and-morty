import { render, screen } from "@testing-library/react";
import CharacterCard from "./CharacterCard";
import "@testing-library/jest-dom";
import type { CharacterCardProps } from "../../types/interface";

// Full mock data
const fullMockProps: CharacterCardProps = {
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  status: "Alive",
  species: "Human",
  location: "Earth (Replacement Dimension)",
  firstSeen: "Pilot",
  gender: "Male",
  type: "Scientist"
};

// Partial mock for optional props testing
const partialMockProps: CharacterCardProps = {
  ...fullMockProps,
  firstSeen: "",
  gender: "",
  type: ""
};

describe("CharacterCard Component", () => {
  it("renders all character data correctly", () => {
    render(<CharacterCard {...fullMockProps} />);

    // Name
    expect(screen.getByRole("heading", { name: /rick sanchez/i })).toBeInTheDocument();

    // Status & Species
    expect(screen.getByText(/alive - human/i)).toBeInTheDocument();

    // Location
    expect(screen.getByText(/last known location:/i)).toBeInTheDocument();
    expect(screen.getByText(/earth \(replacement dimension\)/i)).toBeInTheDocument();

    // First seen
    expect(screen.getByText(/first seen in:/i)).toBeInTheDocument();
    expect(screen.getByText(/pilot/i)).toBeInTheDocument();

    // Gender
    expect(screen.getByText(/gender: male/i)).toBeInTheDocument();

    // Type
    expect(screen.getByText(/type: scientist/i)).toBeInTheDocument();

    // Image
    const img = screen.getByAltText(/rick sanchez/i);
    expect(img).toHaveAttribute("src", fullMockProps.image);
  });

  it("hides optional fields when not provided", () => {
    render(<CharacterCard {...partialMockProps} />);

    // Optional fields should not appear
    expect(screen.queryByText(/first seen in:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/gender:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/type:/i)).not.toBeInTheDocument();
  });
});
