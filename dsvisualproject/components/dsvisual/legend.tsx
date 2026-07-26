import { BAR_STATES, LEGEND_STATES } from "@/lib/bar-state"
import styles from "./legend.module.css"

export function Legend() {
  return (
    <div className={styles.wrap} aria-label="Legend for bar states">
      {LEGEND_STATES.map((state) => {
        const meta = BAR_STATES[state]
        const Icon = meta.icon
        return (
          <div key={state} className={styles.item}>
            <span className={styles.chip} data-state={state} aria-hidden="true">
              <Icon className={styles.chipIcon} />
            </span>
            <span className={styles.label}>{meta.label}</span>
          </div>
        )
      })}
    </div>
  )
}
