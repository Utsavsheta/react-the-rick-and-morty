import React from "react";
import styles from "./EpisodeList.module.css";
import type { episodeListProps } from "../../types/interface";

export const EpisodeList: React.FC<episodeListProps> = ({ episodes }) => (
  <ul className={styles.list}>
    {episodes.map((ep) => (
      <li key={ep.id}>
        {ep.episode} — {ep.name}
      </li>
    ))}
  </ul>
);

export default EpisodeList;
