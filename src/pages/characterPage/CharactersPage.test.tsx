import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import * as apiModule from "../../services/api";
import CharactersPage from "./charactersPage";

beforeAll(() => {
  global.IntersectionObserver = class {
    root: Element | null = null;
    rootMargin: string = "";
    thresholds: ReadonlyArray<number> = [];

    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  } as unknown as typeof IntersectionObserver;
});

const mockCharactersResponse = {
  data: {
    info: { next: null },
    results: [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        location: { name: "Earth" },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/1"],
      },
    ],
  },
};

const mockEpisodeResponse = {
  name: "Pilot",
};

vi.spyOn(global, "fetch").mockImplementation((url) => {
  if (url === "https://rickandmortyapi.com/api/episode/1") {
    return Promise.resolve({
      json: () => Promise.resolve(mockEpisodeResponse),
    } as Response);
  }
  return Promise.reject("Unknown URL");
});

vi.spyOn(apiModule.api, "get").mockResolvedValue(mockCharactersResponse);

describe("CharactersPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the page header and filters", () => {
    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/the rick and morty api/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
  });

  it("fetches and displays characters with episode info", async () => {
    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>
    );

    // Wait for character card to appear
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /rick sanchez/i })).toBeInTheDocument();
    });

    // Check for first seen episode name
    expect(screen.getByText(/first seen in:/i)).toBeInTheDocument();
    expect(screen.getByText(/pilot/i)).toBeInTheDocument();
  });

  it("updates filters and fetches filtered data", async () => {
    render(
      <MemoryRouter>
        <CharactersPage />
      </MemoryRouter>
    );

    const searchInput = screen.getByLabelText(/search/i);
    fireEvent.change(searchInput, { target: { value: "Rick" } });

    await waitFor(() => {
      expect(apiModule.api.get).toHaveBeenCalledWith(expect.stringContaining("name=Rick"));
    });
  });
});
