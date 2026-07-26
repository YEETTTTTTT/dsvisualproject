"use client"

import type { StepCompare } from "@/lib/algorithms"
import { ArrowRight, Check, Minus, X } from "lucide-react"
import styles from "./comparison-indicator.module.css"

interface ComparisonIndicatorProps {
  compare?: StepCompare
  stepKey: number
}

function Operand({ label, value }: { label: string; value: number }) {
  return (
    <span className={styles.operand}>
      <span className={styles.operandLabel}>{label}</span>
      <span className={styles.operandValue}>{value}</span>
    </span>
  )
}

export function ComparisonIndicator({ compare, stepKey }: ComparisonIndicatorProps) {
  if (!compare) {
    return (
      <div key={stepKey} className={`${styles.wrap} ${styles.idle} dsv-fade-in`} aria-hidden="true">
        <span className={styles.idleText}>
          <Minus className={styles.idleIcon} aria-hidden="true" />
          Getting ready&hellip;
        </span>
      </div>
    )
  }

  const { left, right, leftValue, rightValue, op, result, action } = compare

  return (
    <div key={stepKey} className={`${styles.wrap} dsv-pop-in`} role="status" aria-live="polite">
      <Operand label={left} value={leftValue} />

      <span className={styles.op} aria-hidden="true">
        {op}
      </span>

      <Operand label={right} value={rightValue} />

      <ArrowRight className={styles.arrow} aria-hidden="true" />

      <span className={styles.result} data-true={result || undefined}>
        {result ? (
          <Check className={styles.resultIcon} aria-hidden="true" />
        ) : (
          <X className={styles.resultIcon} aria-hidden="true" />
        )}
        {result ? "true" : "false"}
      </span>

      <span className={styles.action}>{action}</span>

      <span className={styles.srOnly}>
        {`${left} equals ${leftValue}, ${right} equals ${rightValue}, ${leftValue} ${op} ${rightValue} is ${result}. Action: ${action}.`}
      </span>
    </div>
  )
}
