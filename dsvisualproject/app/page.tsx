"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ALGORITHMS, type AlgorithmId, randomArray } from "@/lib/algorithms"
import { Header } from "@/components/dsvisual/header"
import { AlgorithmSelector } from "@/components/dsvisual/algorithm-selector"
import { ArrayControls } from "@/components/dsvisual/array-controls"
import { BarVisualization } from "@/components/dsvisual/bar-visualization"
import { ComparisonIndicator } from "@/components/dsvisual/comparison-indicator"
import { PlaybackControls } from "@/components/dsvisual/playback-controls"
import { StepExplanation } from "@/components/dsvisual/step-explanation"
import { PseudocodePanel } from "@/components/dsvisual/pseudocode-panel"
import { ComplexityPanel } from "@/components/dsvisual/complexity-panel"
import { Legend } from "@/components/dsvisual/legend"
import styles from "./page.module.css"

const DEFAULT_ARRAY = [23, 41, 100, 91, 55, 81, 23, 55, 56, 17, 85, 63]

const BASE_DELAY = 750 // ms at 1x speed

export default function Page() {
  const [algorithmId, setAlgorithmId] = useState<AlgorithmId>("bubble")
  const [baseArray, setBaseArray] = useState<number[]>(DEFAULT_ARRAY)
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(1)

  const algorithm = ALGORITHMS[algorithmId]
  const steps = useMemo(() => algorithm.generate(baseArray), [algorithm, baseArray])
  const totalSteps = steps.length
  const safeStep = Math.min(step, totalSteps - 1)
  const current = steps[safeStep]
  const isLast = step >= totalSteps - 1

  const resetPlayback = useCallback(() => {
    setStep(0)
    setIsPlaying(false)
  }, [])

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!isPlaying) return
    if (isLast) return
    timerRef.current = setTimeout(() => {
      setStep((s) => Math.min(s + 1, totalSteps - 1))
    }, BASE_DELAY / speed)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, step, isLast, speed, totalSteps])

  const handlePlayPause = useCallback(() => {
    if (isLast) {
      setStep(0)
      setIsPlaying(true)
      return
    }
    setIsPlaying((playing) => !playing)
  }, [isLast])

  const handlePrev = useCallback(() => {
    setIsPlaying(false)
    setStep((s) => Math.max(0, s - 1))
  }, [])

  const handleNext = useCallback(() => {
    setIsPlaying(false)
    setStep((s) => Math.min(totalSteps - 1, s + 1))
  }, [totalSteps])

  const handleRestart = useCallback(() => {
    setIsPlaying(false)
    setStep(0)
  }, [])

  const handleSeek = useCallback((s: number) => {
    setIsPlaying(false)
    setStep(s)
  }, [])

  const handleAlgorithmChange = useCallback((id: AlgorithmId) => {
    setAlgorithmId(id)
    resetPlayback()
  }, [resetPlayback])

  const handleRandom = useCallback(() => {
    setBaseArray(randomArray(12))
    resetPlayback()
  }, [resetPlayback])

  const handleCustom = useCallback((values: number[]) => {
    setBaseArray(values)
    resetPlayback()
  }, [resetPlayback])

  // Keyboard shortcuts (ignored while typing in the custom-array input).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return
      if (e.key === " ") {
        e.preventDefault()
        handlePlayPause()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        handleNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        handlePrev()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [handlePlayPause, handleNext, handlePrev])

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Header />
        <AlgorithmSelector value={algorithmId} onChange={handleAlgorithmChange} />
        <div className={styles.workspace}>
          <section className={styles.stage} aria-label="Array visualization">
            <div className={styles.stageTop}>
              <ArrayControls onRandom={handleRandom} onCustom={handleCustom} />
              <Legend />
            </div>

            <ComparisonIndicator compare={current.compare} stepKey={safeStep} />

            <div className={styles.bars}>
              <BarVisualization array={current.array} highlights={current.highlights} />
            </div>

            <PlaybackControls
              isPlaying={isPlaying && !isLast}
              onPlayPause={handlePlayPause}
              onPrev={handlePrev}
              onNext={handleNext}
              onRestart={handleRestart}
              onSeek={handleSeek}
              canPrev={step > 0}
              canNext={!isLast}
              step={safeStep}
              totalSteps={totalSteps}
              speed={speed}
              onSpeedChange={setSpeed}
            />
          </section>

          <aside className={styles.side}>
            <div className={styles.softCard}>
              <StepExplanation
                explanation={current.explanation}
                step={safeStep}
                totalSteps={totalSteps}
                variables={current.variables}
              />
            </div>
            <div className={styles.softCard}>
              <PseudocodePanel
                lines={algorithm.pseudocode}
                activeLine={current.line}
                algorithmId={algorithm.id}
              />
            </div>
          </aside>
        </div>

        <div className={styles.complexity}>
          <ComplexityPanel complexity={algorithm.complexity} />
        </div>
      </main>
    </div>
  )
}
