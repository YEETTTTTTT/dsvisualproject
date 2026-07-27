"use client"

import type { HighlightKind } from "@/lib/algorithms"
import { BAR_STATES, type BarState } from "@/lib/bar-state"
import styles from "./bar-visualization.module.css"

interface BarVisualizationProps {
  array: number[]
  highlights: Partial<Record<number, HighlightKind>>
}

export function BarVisualization({ array, highlights }: BarVisualizationProps) {
  const max = Math.max(...array, 1)
  const compact = array.length > 14

  return (
    <div
      className={styles.stage}
      role="img"
      aria-label={`Array with ${array.length} bars: ${array.join(", ")}`}
    >
      {array.map((value, index) => {
        const state: BarState = highlights[index] ?? "default"
        const meta = BAR_STATES[state]
        const Icon = meta.icon
        const heightPct = 14 + (value / max) * 86
        const isActive = state !== "default" && state !== "sorted"

        return (
          <div key={index} className={styles.col}>
            <div className={styles.marker}>
              {state !== "default" && (
                <span
                  className={styles.chip}
                  data-state={state}
                  data-active={isActive || undefined}
                  title={meta.label}
                >
                  <Icon className={styles.chipIcon} aria-hidden="true" />
                  <span className={styles.srOnly}>{meta.label}</span>
                </span>
              )}
            </div>

            <div
              className={styles.bar}
              data-state={state}
              data-active={isActive || undefined}
              style={{ height: `${heightPct}%` }}
            >
              {!compact && <span className={styles.value}>{value}</span>}
            </div>

            <span className={styles.index}>{index}</span>
          </div>
        )
      })}
    </div>
  )
}
