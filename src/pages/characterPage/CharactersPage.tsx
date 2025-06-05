import React, { useEffect, useState, useRef, useCallback } from "react";
import { api } from "../../services/api";
import CharacterCard from "../../components/characterCard/CharacterCard";
import styles from "./charactersPage.module.css";
import { Link } from "react-router-dom";
import type { Character } from "../../types/interface";
import CharacterFilters from "../../components/characterFilters/CharacterFilters";

interface CharacterWithEpisode extends Character {
  firstSeenName: string;
}

const CharactersPage: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterWithEpisode[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [filters, setFilters] = useState({ name: "", status: "", gender: "" });

  const handleFilterChange = (filters: Record<string, string>) => {
  // Ensure the filters object has all keys with default empty strings if missing
  setFilters({
    name: filters.name || "",
    status: filters.status || "",
    gender: filters.gender || "",
  });
};

  // Fetch characters based on filters + page
  const fetchCharacters = async (pageNum: number, reset: boolean = false) => {
    const params = new URLSearchParams({
      page: pageNum.toString(),
      ...(filters.name && { name: filters.name }),
      ...(filters.status && { status: filters.status }),
      ...(filters.gender && { gender: filters.gender }),
    });

    try {
      const res = await api.get(`/character?${params.toString()}`);
      const results = res.data.results;

      const charactersWithEpisodes = await Promise.all(
        results.map(async (char: Character) => {
          const firstEpisodeUrl = char.episode[0];
          const episodeRes = await fetch(firstEpisodeUrl);
          const episodeData = await episodeRes.json();

          return {
            ...char,
            firstSeenName: episodeData.name,
          };
        })
      );

      setCharacters((prev) =>
        reset ? charactersWithEpisodes : [...prev, ...charactersWithEpisodes]
      );
      setHasMore(res.data.info.next !== null);
    } catch (err) {
      console.error("Error fetching characters:", err);
    }
  };

  // Load characters when page changes
  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  // Re-fetch when filters change
  useEffect(() => {
    setPage(1); // Reset to first page
    fetchCharacters(1, true); // Replace characters
  }, [filters]);

  // Infinite scroll observer
  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div>
      <div className={styles.pageHeader}> The Rick and Morty API </div>

      <CharacterFilters onFilterChange={handleFilterChange} />

      <div className={styles.grid}>
        {characters.map((char, index) => {
          const isLast = index === characters.length - 1;
          return (
            <div key={index} ref={isLast ? lastCardRef : null}>
              <Link to={`/character/${char.id}`} className={styles.cardLink}>
                <CharacterCard
                  name={char.name}
                  image={char.image}
                  status={char.status}
                  species={char.species}
                  location={char.location.name}
                  firstSeen={char.firstSeenName}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CharactersPage;
