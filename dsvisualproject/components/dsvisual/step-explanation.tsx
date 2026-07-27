import { Lightbulb } from "lucide-react"
import styles from "./step-explanation.module.css"

interface StepExplanationProps {
  explanation: string
  step: number
  totalSteps: number
  variables: Record<string, number | string>
}

export function StepExplanation({ explanation, step, totalSteps, variables }: StepExplanationProps) {
  const entries = Object.entries(variables)

  return (
    <section className={styles.wrap} aria-labelledby="explanation-heading">
      <div className={styles.head}>
        <span className={styles.badge}>
          <Lightbulb className={styles.badgeIcon} aria-hidden="true" />
        </span>
        <h2 id="explanation-heading" className={styles.title}>
          What&apos;s happening
        </h2>
        <span className={styles.step}>
          Step {step + 1} of {totalSteps}
        </span>
      </div>
      <p key={step} className={`${styles.body} dsv-fade-in`} aria-live="polite">
        {explanation}
      </p>
      <section className={styles.variables} aria-label="Live variable tracker">
        <h3 className={styles.variablesTitle}>Live variables</h3>
        <dl className={styles.variableList}>
          {entries.map(([name, value]) => (
            <div key={name} className={styles.variable}>
              <dt>{name}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </section>
  )
}
