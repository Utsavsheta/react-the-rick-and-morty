import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./characterProfile.module.css";
import InfoItem from "../../components/infoItem/InfoItem";
import SectionBlock from "../../components/sectionBlock/SectionBlock";
import EpisodeList from "../../components/episodeList/EpisodeList";
import type { Character, Episode, Location } from "../../types/interface";
import CharacterCard from "../../components/characterCard/CharacterCard";

const CharacterProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [originDetails, setOriginDetails] = useState<Location | null>(null);
  const [locationDetails, setLocationDetails] = useState<Location | null>(null);

  useEffect(() => {
    async function fetchCharacter() {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/${id}`
      );
      const data = await res.json();
      setCharacter(data);

      const episodeIds = data.episode
        .map((ep: string) => ep.split("/").pop())
        .join(",");
      const episodeRes = await fetch(
        `https://rickandmortyapi.com/api/episode/${episodeIds}`
      );
      const episodeData = await episodeRes.json();
      setEpisodes(Array.isArray(episodeData) ? episodeData : [episodeData]);

      if (data.origin.url) {
        const originRes = await fetch(data.origin.url);
        setOriginDetails(await originRes.json());
      }
      if (data.location.url) {
        const locationRes = await fetch(data.location.url);
        setLocationDetails(await locationRes.json());
      }
    }

    fetchCharacter();
  }, [id]);

  if (!character) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.card}>
        <CharacterCard
          name={character.name}
          image={character.image}
          status={character.status}
          species={character.species}
          location={character.location.name}
          gender={character.gender}
          type={character.type}
        />
        <div className={styles.origin_location}>
          <SectionBlock title="Origin">
            <InfoItem label="Name" value={character.origin.name} />
            {originDetails && (
              <>
                <InfoItem
                  label="Dimension"
                  value={originDetails.dimension || "Unknown"}
                />
                <InfoItem
                  label="Residents"
                  value={originDetails.residents?.length || 0}
                />
              </>
            )}
          </SectionBlock>

          <SectionBlock title="Current Location">
            <InfoItem label="Name" value={character.location.name} />
            {locationDetails && (
              <>
                <InfoItem
                  label="Dimension"
                  value={locationDetails.dimension || "Unknown"}
                />
                <InfoItem
                  label="Residents"
                  value={locationDetails.residents?.length || 0}
                />
              </>
            )}
          </SectionBlock>
        </div>

        <SectionBlock title="Episodes">
          <EpisodeList episodes={episodes} />
        </SectionBlock>
      </div>
    </div>
  );
};

export default CharacterProfile;
