import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import "@testing-library/jest-dom";
import CharacterFilters from "./CharacterFilters";

describe("CharacterFilters", () => {
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers(); // Handles debounce
    mockOnFilterChange.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders all filter fields correctly", () => {
    render(<CharacterFilters onFilterChange={mockOnFilterChange} />);

    expect(screen.getByLabelText(/search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
  });

  it("updates name input and triggers filter change", () => {
    render(<CharacterFilters onFilterChange={mockOnFilterChange} />);

    const input = screen.getByLabelText(/search/i);
    fireEvent.change(input, { target: { value: "Rick" } });

    // Advance timers to process debounce if any
    vi.runAllTimers();

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Rick" })
    );
  });

  it("updates status select and triggers filter change", () => {
    render(<CharacterFilters onFilterChange={mockOnFilterChange} />);

    const select = screen.getByLabelText(/status/i);
    fireEvent.change(select, { target: { value: "alive" } });

    vi.runAllTimers();

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ status: "alive" })
    );
  });

  it("updates gender select and triggers filter change", () => {
    render(<CharacterFilters onFilterChange={mockOnFilterChange} />);

    const select = screen.getByLabelText(/gender/i);
    fireEvent.change(select, { target: { value: "female" } });

    vi.runAllTimers();

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({ gender: "female" })
    );
  });
});
