"use client"

import type React from "react"

import { useState } from "react"
import { parseArray } from "@/lib/algorithms"
import { Shuffle, Check, AlertCircle } from "lucide-react"
import styles from "./array-controls.module.css"

interface ArrayControlsProps {
  onRandom: () => void
  onCustom: (values: number[]) => void
  disabled?: boolean
}

export function ArrayControls({ onRandom, onCustom, disabled }: ArrayControlsProps) {
  const [raw, setRaw] = useState("")
  const [error, setError] = useState<string | null>(null)

  const applyCustom = (e: React.FormEvent) => {
    e.preventDefault()
    const values = parseArray(raw)
    if (values.length < 2) {
      setError("Enter at least 2 numbers, separated by commas.")
      return
    }
    setError(null)
    onCustom(values)
  }

  return (
    <section className={styles.bar} aria-label="Array data controls">
      <button type="button" onClick={onRandom} disabled={disabled} className={styles.shuffle}>
        <Shuffle className={styles.icon} aria-hidden="true" />
        Shuffle
      </button>

      <form onSubmit={applyCustom} className={styles.form}>
        <label htmlFor="custom-array" className={styles.srOnly}>
          Custom values
        </label>
        <input
          id="custom-array"
          type="text"
          inputMode="numeric"
          value={raw}
          disabled={disabled}
          onChange={(e) => {
            setRaw(e.target.value)
            if (error) setError(null)
          }}
          placeholder="Type your own: 34, 7, 12, 90, 5"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "custom-array-error" : "custom-array-hint"}
          className={styles.input}
          data-error={error ? true : undefined}
        />
        <button type="submit" disabled={disabled} className={styles.apply}>
          <Check className={styles.icon} aria-hidden="true" />
          Use
        </button>
      </form>

      {error ? (
        <p id="custom-array-error" role="alert" className={styles.error}>
          <AlertCircle className={styles.iconSm} aria-hidden="true" />
          {error}
        </p>
      ) : (
        <p id="custom-array-hint" className={styles.hint}>
          Up to 20 numbers, each 1&ndash;100.
        </p>
      )}
    </section>
  )
}
