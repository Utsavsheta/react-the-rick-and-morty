import { useState, useMemo } from "react";
import debounce from "lodash.debounce";
import type { Filters } from "../types/interface";

type OnFilterChange = (filters: Filters) => void;

export function useCharacterFilters(onFilterChange: OnFilterChange) {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    status: "",
    gender: "",
  });

  // Memoize debounced function
  const debouncedOnChange = useMemo(() => {
    return debounce(onFilterChange, 500);
  }, [onFilterChange]);

  const handleChange = (key: keyof Filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);

    // Debounce only on name changes
    if (key === "name") {
      debouncedOnChange(updatedFilters);
    } else {
      onFilterChange(updatedFilters);
    }
  };

  return { filters, handleChange };
}
