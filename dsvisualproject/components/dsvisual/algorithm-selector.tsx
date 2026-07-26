"use client"

import { ALGORITHM_LIST, type AlgorithmId } from "@/lib/algorithms"
import styles from "./algorithm-selector.module.css"

interface AlgorithmSelectorProps {
  value: AlgorithmId
  onChange: (id: AlgorithmId) => void
  disabled?: boolean
}

export function AlgorithmSelector({ value, onChange, disabled }: AlgorithmSelectorProps) {
  const active = ALGORITHM_LIST.find((a) => a.id === value)!

  return (
    <section className={styles.wrap} aria-labelledby="algo-heading">
      <h2 id="algo-heading" className={styles.srOnly}>
        Choose a sorting algorithm
      </h2>

      <div role="radiogroup" aria-label="Sorting algorithm" className={styles.pills}>
        {ALGORITHM_LIST.map((algo) => {
          const selected = algo.id === value
          return (
            <button
              key={algo.id}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onChange(algo.id)}
              className={styles.pill}
              data-selected={selected || undefined}
            >
              {algo.name.replace(" Sort", "")}
            </button>
          )
        })}
      </div>

      <p className={styles.summary}>
        <span className={styles.summaryName}>{active.name}</span>
        {active.summary}
      </p>
    </section>
  )
}
