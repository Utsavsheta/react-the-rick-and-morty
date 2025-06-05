import { render, screen } from "@testing-library/react";
import EpisodeList from "./EpisodeList";
import type { episodeListProps } from "../../types/interface";

const mockEpisodes: episodeListProps["episodes"] = [
  { id: 1, episode: "S01E01", name: "Pilot" },
  { id: 2, episode: "S01E02", name: "Lawnmower Dog" },
];

describe("EpisodeList Component", () => {
  it("renders a list of episodes correctly", () => {
    render(<EpisodeList episodes={mockEpisodes} />);

    // Check that both episodes are rendered
    mockEpisodes.forEach(({ episode, name }) => {
      expect(screen.getByText(new RegExp(`${episode} — ${name}`, "i"))).toBeInTheDocument();
    });

    // Check if the list element is rendered
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Check if the correct number of list items rendered
    expect(screen.getAllByRole("listitem")).toHaveLength(mockEpisodes.length);
  });

  it("renders an empty list when no episodes passed", () => {
    render(<EpisodeList episodes={[]} />);
    // List should be empty
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
