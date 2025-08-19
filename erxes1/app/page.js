"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [isHidden, setIsHidden] = useState(true);
  const hideBtn = () => {
    setIsHidden(!isHidden)
  }
  return (
    <div className={styles.page}>
      <button onClick={hideBtn}>
        {isHidden ? "show text" : "hide text"}
      </button>
      <p>{isHidden ? "" : "abc"}</p>
    
    </div>
  );
}
