import type { AlgorithmMeta } from "@/lib/algorithms"
import { Check, X } from "lucide-react"
import styles from "./complexity-panel.module.css"

interface ComplexityPanelProps {
  complexity: AlgorithmMeta["complexity"]
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metric}>
      <dt className={styles.metricLabel}>{label}</dt>
      <dd className={styles.metricValue}>{value}</dd>
    </div>
  )
}

export function ComplexityPanel({ complexity }: ComplexityPanelProps) {
  return (
    <section className={styles.wrap} aria-labelledby="complexity-heading">
      <h2 id="complexity-heading" className={styles.title}>
        How fast &amp; how much memory?
      </h2>

      <dl className={styles.metrics}>
        <Metric label="Best time" value={complexity.best} />
        <Metric label="Average time" value={complexity.average} />
        <Metric label="Worst time" value={complexity.worst} />
        <Metric label="Extra space" value={complexity.space} />
      </dl>

      <div className={styles.stable} data-stable={complexity.stable || undefined}>
        {complexity.stable ? (
          <Check className={styles.stableIcon} aria-hidden="true" />
        ) : (
          <X className={styles.stableIcon} aria-hidden="true" />
        )}
        {complexity.stable ? "Stable sort" : "Not a stable sort"}
      </div>
    </section>
  )
}
