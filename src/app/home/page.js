import Image from "next/image";
import styles from "../page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Home Page with Event Feed</h1>
      </main>
    </div>
  );
}
