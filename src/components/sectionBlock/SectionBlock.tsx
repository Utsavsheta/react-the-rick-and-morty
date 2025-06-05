import React from "react";
import styles from "./SectionBlock.module.css";
import type { sectionBlockProps } from "../../types/interface";

export const SectionBlock: React.FC<sectionBlockProps> = ({ title, children }) => (
  <div className={styles.section}>
    <h2>{title}</h2>
    <div>{children}</div>
  </div>
);

export default SectionBlock;
