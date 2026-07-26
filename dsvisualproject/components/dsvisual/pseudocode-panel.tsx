import { ChevronRight, Code2 } from "lucide-react"
import styles from "./pseudocode-panel.module.css"

interface PseudocodePanelProps {
  lines: string[]
  activeLine: number
}

export function PseudocodePanel({ lines, activeLine }: PseudocodePanelProps) {
  return (
    <section className={styles.wrap} aria-labelledby="pseudocode-heading">
      <div className={styles.head}>
        <h2 id="pseudocode-heading" className={styles.title}>
          <Code2 className={styles.titleIcon} aria-hidden="true" />
          Pseudocode
        </h2>
        <span className={styles.running}>
          <span className={styles.dot} aria-hidden="true" />
          running
        </span>
      </div>

      <ol className={styles.list}>
        {lines.map((line, index) => {
          const active = index === activeLine
          return (
            <li
              key={index}
              aria-current={active ? "step" : undefined}
              className={styles.line}
              data-active={active || undefined}
            >
              <ChevronRight className={styles.caret} aria-hidden="true" />
              <span className={styles.num} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.code}>{line}</span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
