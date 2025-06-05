import React from "react";
import styles from "./InfoItem.module.css";
import type { infoItemProps } from "../../types/interface";

const InfoItem: React.FC<infoItemProps> = ({ label, value }) => (
  <p className={styles.item}>
    <strong>{label}:</strong> {value || "Unknown"}
  </p>
);

export default InfoItem;
