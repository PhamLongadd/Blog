import Link from "next/link";
import styles from "./index.module.css";

export default function Header({ name }) {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} href="/">
        <h1>{name}</h1>
      </Link>
    </div>
  );
}
