// src/components/CharacterCard/CharacterCard.tsx
import React from "react";
import styles from "./CharacterCard.module.css";
import type { CharacterCardProps } from "../../types/interface";

// give css to status dot
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "alive":
      return styles.statusAlive;
    case "dead":
      return styles.statusDead;
    default:
      return styles.statusUnknown;
  }
};


// render component with data
export const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  image,
  status,
  species,
  location,
  firstSeen,
  gender,
  type
}) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.cardContent}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.status}>
          <span
            className={`${styles.statusDot} ${getStatusColor(status)}`}
          ></span>
          {status} - {species}
        </p>
        <div className={styles.meta}>
          <p className={styles.label}>Last known location:</p>
          <p>{location}</p>
          {firstSeen && (
            <>
              <p className={styles.label}>First seen in:</p>
              <p>{firstSeen}</p>
            </>
          )}
          {gender && (
            <>
              <p className={styles.label}>Gender: {gender}</p>
            </>
          )}
          {type && (
            <>
              <p className={styles.label}>Type: {type}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
