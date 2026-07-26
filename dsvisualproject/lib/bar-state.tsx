import type { HighlightKind } from "@/lib/algorithms"
import { ArrowLeftRight, Check, Circle, Scale, Target } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type BarState = "default" | HighlightKind

interface BarStateMeta {
  key: BarState
  label: string
  description: string
  icon: LucideIcon
}

export const BAR_STATES: Record<BarState, BarStateMeta> = {
  default: {
    key: "default",
    label: "Unsorted",
    description: "Waiting to be processed.",
    icon: Circle,
  },
  compare: {
    key: "compare",
    label: "Comparing",
    description: "Being compared this step.",
    icon: Scale,
  },
  swap: {
    key: "swap",
    label: "Swapping",
    description: "Values are being moved.",
    icon: ArrowLeftRight,
  },
  pivot: {
    key: "pivot",
    label: "Minimum / key",
    description: "Reference element for this pass.",
    icon: Target,
  },
  key: {
    key: "key",
    label: "Current key",
    description: "Element being placed.",
    icon: Target,
  },
  sorted: {
    key: "sorted",
    label: "Sorted",
    description: "In its final position.",
    icon: Check,
  },
}

export const LEGEND_STATES: BarState[] = ["default", "compare", "swap", "pivot", "sorted"]
