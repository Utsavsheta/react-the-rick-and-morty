import React from "react";
import styles from "./CharacterFilters.module.css";
import { useCharacterFilters } from "../../hooks/useCharacterFilters";

interface Props {
  onFilterChange: (filters: Record<string, string>) => void;
}

export const CharacterFilters: React.FC<Props> = ({ onFilterChange }) => {
  const { filters, handleChange } = useCharacterFilters(onFilterChange);

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterItem}>
        <label htmlFor="name">Search</label>
        <input
          id="name"
          type="text"
          value={filters.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter character name"
        />
      </div>

      <div className={styles.filterItem}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={filters.status}
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <option value="">All</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className={styles.filterItem}>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={filters.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
    </div>
  );
};

export default CharacterFilters;
