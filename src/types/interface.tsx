import type { ReactNode } from "react";

export interface CharacterCardProps {
  name: string;
  image: string;
  status: string;
  species: string;
  location: string;
  firstSeen?: string;
  gender?: string;
  type?: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
}

export interface CharacterWithEpisode extends Character {
  firstSeenName: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date?: string;
  episode: string;
  characters?: string[];
}

export interface Location {
  id?: number;
  name: string;
  type: string;
  dimension?: string;
  residents?: string[];
  url?: string;
}

export interface episodeListProps {
  episodes: Episode[];
}

export interface infoItemProps {
  label: string;
  value: string | number;
}

export interface sectionBlockProps {
  title: string;
  children: ReactNode;
}

export interface Filters {
  name: string;
  status: string;
  gender: string;
  [key: string]: string;
}
