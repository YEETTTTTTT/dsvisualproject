"use client"

import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react"
import styles from "./playback-controls.module.css"

const SPEEDS = [0.5, 1, 2, 5] as const

interface PlaybackControlsProps {
  isPlaying: boolean
  onPlayPause: () => void
  onPrev: () => void
  onNext: () => void
  onRestart: () => void
  onSeek: (step: number) => void
  canPrev: boolean
  canNext: boolean
  step: number
  totalSteps: number
  speed: number
  onSpeedChange: (speed: number) => void
}

export function PlaybackControls({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
  onRestart,
  onSeek,
  canPrev,
  canNext,
  step,
  totalSteps,
  speed,
  onSpeedChange,
}: PlaybackControlsProps) {
  const progress = totalSteps > 1 ? (step / (totalSteps - 1)) * 100 : 0

  return (
    <div className={styles.wrap}>
      <div className={styles.scrubRow}>
        <label htmlFor="scrubber" className={styles.srOnly}>
          Seek to step
        </label>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${progress}%` }} />
          <input
            id="scrubber"
            type="range"
            min={0}
            max={Math.max(totalSteps - 1, 0)}
            value={step}
            onChange={(e) => onSeek(Number(e.target.value))}
            className={styles.range}
            aria-valuetext={`Step ${step + 1} of ${totalSteps}`}
          />
        </div>
        <span className={styles.count}>
          {step + 1}/{totalSteps}
        </span>
      </div>

      {/* Transport + speed */}
      <div className={styles.transportRow}>
        <div className={styles.transport}>
          <button type="button" onClick={onRestart} className={styles.iconBtn} aria-label="Restart from the beginning">
            <RotateCcw className={styles.iconMd} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onPrev}
            disabled={!canPrev}
            className={styles.iconBtn}
            aria-label="Previous step"
          >
            <SkipBack className={styles.iconMd} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onPlayPause}
            className={styles.play}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className={styles.iconLg} aria-hidden="true" />
            ) : (
              <Play className={`${styles.iconLg} ${styles.playGlyph}`} aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className={styles.iconBtn}
            aria-label="Next step"
          >
            <SkipForward className={styles.iconMd} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.speed} role="radiogroup" aria-label="Playback speed">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={s === speed}
              onClick={() => onSpeedChange(s)}
              className={styles.speedBtn}
              data-selected={s === speed || undefined}
            >
              {s}&times;
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
