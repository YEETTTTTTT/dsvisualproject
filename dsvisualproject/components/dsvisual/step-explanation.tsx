import { Lightbulb } from "lucide-react"
import styles from "./step-explanation.module.css"

interface StepExplanationProps {
  explanation: string
  step: number
  totalSteps: number
}

export function StepExplanation({ explanation, step, totalSteps }: StepExplanationProps) {
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
    </section>
  )
}
