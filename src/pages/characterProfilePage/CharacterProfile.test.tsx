import { render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterProfile from "./characterProfile";
import { vi } from "vitest";

const mockCharacter = {
  id: 1,
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1" },
  location: { name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20" },
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
};

const mockEpisodes = [
  { id: 1, episode: "S01E01", name: "Pilot" },
  { id: 2, episode: "S01E02", name: "Lawnmower Dog" },
];

const mockOriginLocation = {
  id: 1,
  name: "Earth (C-137)",
  dimension: "Dimension C-137",
  residents: ["https://rickandmortyapi.com/api/character/1"],
};

const mockCurrentLocation = {
  id: 20,
  name: "Earth (Replacement Dimension)",
  dimension: "Replacement Dimension",
  residents: ["https://rickandmortyapi.com/api/character/20"],
};

describe("CharacterProfile Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn(async (url: string) => {
      if (url === `https://rickandmortyapi.com/api/character/1`) {
        return {
          json: async () => mockCharacter,
        };
      }
      if (url === `https://rickandmortyapi.com/api/episode/1,2`) {
        return {
          json: async () => mockEpisodes,
        };
      }
      if (url === mockCharacter.origin.url) {
        return {
          json: async () => mockOriginLocation,
        };
      }
      if (url === mockCharacter.location.url) {
        return {
          json: async () => mockCurrentLocation,
        };
      }
      return { json: async () => ({}) };
    }) as unknown as typeof fetch;
  });

  it("shows loading initially", () => {
    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterProfile />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("fetches and displays character data and related info", async () => {
    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterProfile />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the character name to appear
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: /rick sanchez/i })).toBeInTheDocument()
    );

    // Check character info
    expect(screen.getByText(/alive/i)).toBeInTheDocument();
    expect(screen.getByText(/human/i)).toBeInTheDocument();

    // Origin section scoped checks
    const originSection = screen.getByRole("heading", { name: /origin/i }).parentElement!;
    const originWithin = within(originSection);
    expect(originWithin.getByText(/earth \(c-137\)/i)).toBeInTheDocument();
    expect(originWithin.getByText(/dimension c-137/i)).toBeInTheDocument();
    expect(originWithin.getByText(/residents/i)).toBeInTheDocument();

    // Current Location section scoped checks
    const locationSection = screen.getByRole("heading", { name: /current location/i }).parentElement!;
    const locationWithin = within(locationSection);
    expect(locationWithin.getByText(/earth \(replacement dimension\)/i)).toBeInTheDocument();
    expect(locationWithin.getAllByText(/replacement dimension/i).length).toBeGreaterThan(0);
    expect(locationWithin.getByText(/residents/i)).toBeInTheDocument();

    // Episodes section
    expect(screen.getByRole("heading", { name: /episodes/i })).toBeInTheDocument();
    expect(screen.getByText(/pilot/i)).toBeInTheDocument();
    expect(screen.getByText(/lawnmower dog/i)).toBeInTheDocument();
  });
});
