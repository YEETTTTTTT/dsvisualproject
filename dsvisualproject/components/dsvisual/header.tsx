import styles from "./header.module.css"

export function Header() {
  return (
    <header className={styles.hero}>
      <span className={styles.eyebrow}>Learn by watching</span>
      <h1 className={styles.title} aria-label="DSVisual">
        <span className={styles.blue}>D</span>
        <span className={styles.red}>S</span>
        <span className={styles.ink}>Visual</span>
      </h1>
      <p className={styles.intro}>
        A friendly playground for sorting algorithms. Pick an algorithm, press play, and
        watch each comparison and swap unfold one calm step at a time.
      </p>
    </header>
  )
}
