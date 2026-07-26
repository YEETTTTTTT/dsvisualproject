// Step-based sorting engine

export type HighlightKind =
  | "compare" 
  | "swap" 
  | "pivot" 
  | "key" 
  | "sorted" 

/**
 * A human-readable description of the comparison happening this step.
 * Drives the live comparison indicator so learners can see exactly which
 * relation is being evaluated and what the engine decides to do.
 */
export interface StepCompare {
  left: string 
  right: string 
  leftValue: number
  rightValue: number
  op: ">" | "<" | "≥" | "≤" | "=" | "≠"
  result: boolean
  action: string // what the algorithm does as a result
}

export interface SortStep {
  array: number[]
  highlights: Record<number, HighlightKind>
  explanation: string
  line: number
  compare?: StepCompare
}

export interface AlgorithmMeta {
  id: AlgorithmId
  name: string
  summary: string
  pseudocode: string[]
  complexity: {
    best: string
    average: string
    worst: string
    space: string
    stable: boolean
  }
  generate: (input: number[]) => SortStep[]
}

export type AlgorithmId =
  | "bubble"
  | "selection"
  | "insertion"
  | "merge"
  | "quick"

// ---------------------------------------------------------------------------
// Bubble sort
// ---------------------------------------------------------------------------
function bubbleSort(input: number[]): SortStep[] {
  const a = [...input]
  const n = a.length
  const steps: SortStep[] = []
  const sorted = new Set<number>()

  const push = (
    highlights: Record<number, HighlightKind>,
    explanation: string,
    line: number,
    compare?: StepCompare,
  ) => {
    const merged: Record<number, HighlightKind> = {}
    sorted.forEach((i) => (merged[i] = "sorted"))
    Object.assign(merged, highlights)
    steps.push({ array: [...a], highlights: merged, explanation, line, compare })
  }

  push({}, "Starting bubble sort. We repeatedly compare neighbours and let larger values bubble to the end.", 0)

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      const willSwap = a[j] > a[j + 1]
      push(
        { [j]: "compare", [j + 1]: "compare" },
        `Compare positions ${j} and ${j + 1} (${a[j]} vs ${a[j + 1]}).`,
        2,
        {
          left: `a[${j}]`,
          right: `a[${j + 1}]`,
          leftValue: a[j],
          rightValue: a[j + 1],
          op: ">",
          result: willSwap,
          action: willSwap ? "swap them" : "already in order",
        },
      )
      if (willSwap) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        push({ [j]: "swap", [j + 1]: "swap" }, `${a[j + 1]} is larger than ${a[j]}, so we swap them.`, 3)
      }
    }
    sorted.add(n - 1 - i)
    push({}, `Position ${n - 1 - i} now holds its final value.`, 4)
  }
  sorted.add(0)
  push({}, "The array is fully sorted.", 5)
  return steps
}

// ---------------------------------------------------------------------------
// Selection sort
// ---------------------------------------------------------------------------
function selectionSort(input: number[]): SortStep[] {
  const a = [...input]
  const n = a.length
  const steps: SortStep[] = []
  const sorted = new Set<number>()

  const push = (
    highlights: Record<number, HighlightKind>,
    explanation: string,
    line: number,
    compare?: StepCompare,
  ) => {
    const merged: Record<number, HighlightKind> = {}
    sorted.forEach((i) => (merged[i] = "sorted"))
    Object.assign(merged, highlights)
    steps.push({ array: [...a], highlights: merged, explanation, line, compare })
  }

  push({}, "Starting selection sort. Each pass finds the smallest remaining value and moves it to the front.", 0)

  for (let i = 0; i < n - 1; i++) {
    let min = i
    push({ [i]: "key", [min]: "pivot" }, `Assume position ${i} holds the smallest remaining value.`, 1)
    for (let j = i + 1; j < n; j++) {
      const isSmaller = a[j] < a[min]
      push(
        { [min]: "pivot", [j]: "compare" },
        `Compare candidate minimum ${a[min]} with ${a[j]}.`,
        3,
        {
          left: `a[${j}]`,
          right: `a[${min}]`,
          leftValue: a[j],
          rightValue: a[min],
          op: "<",
          result: isSmaller,
          action: isSmaller ? "new minimum" : "keep current minimum",
        },
      )
      if (isSmaller) {
        min = j
        push({ [min]: "pivot" }, `${a[j]} is smaller — it becomes the new minimum.`, 4)
      }
    }
    if (min !== i) {
      ;[a[i], a[min]] = [a[min], a[i]]
      push({ [i]: "swap", [min]: "swap" }, `Swap the smallest value into position ${i}.`, 5)
    }
    sorted.add(i)
    push({}, `Position ${i} is now sorted.`, 6)
  }
  sorted.add(n - 1)
  push({}, "The array is fully sorted.", 7)
  return steps
}

// ---------------------------------------------------------------------------
// Insertion sort
// ---------------------------------------------------------------------------
function insertionSort(input: number[]): SortStep[] {
  const a = [...input]
  const n = a.length
  const steps: SortStep[] = []
  const sorted = new Set<number>()

  const push = (
    highlights: Record<number, HighlightKind>,
    explanation: string,
    line: number,
    compare?: StepCompare,
  ) => {
    const merged: Record<number, HighlightKind> = {}
    sorted.forEach((i) => (merged[i] = "sorted"))
    Object.assign(merged, highlights)
    steps.push({ array: [...a], highlights: merged, explanation, line, compare })
  }

  push({}, "Starting insertion sort. We grow a sorted region on the left, inserting each new value into place.", 0)
  sorted.add(0)

  for (let i = 1; i < n; i++) {
    const key = a[i]
    push({ [i]: "key" }, `Take ${key} and find where it belongs in the sorted region.`, 1)
    let j = i - 1
    while (j >= 0 && a[j] > key) {
      push(
        { [j]: "compare", [j + 1]: "key" },
        `${a[j]} is greater than ${key}, so shift it right.`,
        3,
        {
          left: `a[${j}]`,
          right: "key",
          leftValue: a[j],
          rightValue: key,
          op: ">",
          result: true,
          action: "shift right",
        },
      )
      a[j + 1] = a[j]
      j--
    }

    if (j >= 0) {
      push(
        { [j]: "compare", [j + 1]: "key" },
        `${a[j]} is not greater than ${key}, so ${key} belongs here.`,
        3,
        {
          left: `a[${j}]`,
          right: "key",
          leftValue: a[j],
          rightValue: key,
          op: ">",
          result: false,
          action: "insert key here",
        },
      )
    }
    a[j + 1] = key
    push({ [j + 1]: "swap" }, `Insert ${key} at position ${j + 1}.`, 5)
    sorted.add(i)
  }
  push({}, "The array is fully sorted.", 6)
  return steps
}

// ---------------------------------------------------------------------------
// Merge sort
// ---------------------------------------------------------------------------
function mergeSort(input: number[]): SortStep[] {
  const a = [...input]
  const n = a.length
  const steps: SortStep[] = []

  const push = (
    highlights: Record<number, HighlightKind>,
    explanation: string,
    line: number,
    compare?: StepCompare,
  ) => {
    steps.push({ array: [...a], highlights: { ...highlights }, explanation, line, compare })
  }

  push({}, "Starting merge sort. We split the array down to single elements, then merge sorted pieces back together.", 0)

  const merge = (lo: number, mid: number, hi: number) => {
    const left = a.slice(lo, mid + 1)
    const right = a.slice(mid + 1, hi + 1)
    let i = 0
    let j = 0
    let k = lo
    while (i < left.length && j < right.length) {
      const li = lo + i
      const ri = mid + 1 + j
      const leftWins = left[i] <= right[j]
      push(
        { [li]: "compare", [ri]: "compare" },
        `Merging: compare ${left[i]} and ${right[j]}.`,
        4,
        {
          left: `L[${i}]`,
          right: `R[${j}]`,
          leftValue: left[i],
          rightValue: right[j],
          op: "≤",
          result: leftWins,
          action: leftWins ? `write ${left[i]}` : `write ${right[j]}`,
        },
      )
      if (leftWins) {
        a[k] = left[i]
        push({ [k]: "swap" }, `${left[i]} is smaller, write it to position ${k}.`, 5)
        i++
      } else {
        a[k] = right[j]
        push({ [k]: "swap" }, `${right[j]} is smaller, write it to position ${k}.`, 5)
        j++
      }
      k++
    }
    while (i < left.length) {
      a[k] = left[i]
      push({ [k]: "swap" }, `Copy remaining ${left[i]} to position ${k}.`, 6)
      i++
      k++
    }
    while (j < right.length) {
      a[k] = right[j]
      push({ [k]: "swap" }, `Copy remaining ${right[j]} to position ${k}.`, 6)
      j++
      k++
    }
  }

  const sort = (lo: number, hi: number) => {
    if (lo >= hi) return
    const mid = Math.floor((lo + hi) / 2)
    const range: Record<number, HighlightKind> = {}
    for (let x = lo; x <= hi; x++) range[x] = "key"
    push(range, `Split the range [${lo}…${hi}] into two halves.`, 2)
    sort(lo, mid)
    sort(mid + 1, hi)
    merge(lo, mid, hi)
  }

  sort(0, n - 1)
  push({}, "The array is fully sorted.", 7)
  return steps
}

// ---------------------------------------------------------------------------
// Quick sort
// ---------------------------------------------------------------------------
function quickSort(input: number[]): SortStep[] {
  const a = [...input]
  const n = a.length
  const steps: SortStep[] = []
  const sorted = new Set<number>()

  const push = (
    highlights: Record<number, HighlightKind>,
    explanation: string,
    line: number,
    compare?: StepCompare,
  ) => {
    const merged: Record<number, HighlightKind> = {}
    sorted.forEach((i) => (merged[i] = "sorted"))
    Object.assign(merged, highlights)
    steps.push({ array: [...a], highlights: merged, explanation, line, compare })
  }

  push({}, "Starting quick sort. We pick a pivot, partition values around it, then recurse on each side.", 0)

  const partition = (lo: number, hi: number) => {
    const pivot = a[hi]
    push({ [hi]: "pivot" }, `Choose ${pivot} (position ${hi}) as the pivot.`, 2)
    let i = lo
    for (let j = lo; j < hi; j++) {
      const isLess = a[j] < pivot
      push(
        { [hi]: "pivot", [j]: "compare" },
        `Compare ${a[j]} with pivot ${pivot}.`,
        4,
        {
          left: `a[${j}]`,
          right: "pivot",
          leftValue: a[j],
          rightValue: pivot,
          op: "<",
          result: isLess,
          action: isLess ? "move left" : "leave in place",
        },
      )
      if (isLess) {
        if (i !== j) {
          ;[a[i], a[j]] = [a[j], a[i]]
          push({ [hi]: "pivot", [i]: "swap", [j]: "swap" }, `${a[i]} is less than the pivot, move it left.`, 5)
        }
        i++
      }
    }
    ;[a[i], a[hi]] = [a[hi], a[i]]
    push({ [i]: "swap", [hi]: "swap" }, `Place the pivot into its final position ${i}.`, 6)
    sorted.add(i)
    return i
  }

  const sort = (lo: number, hi: number) => {
    if (lo > hi) return
    if (lo === hi) {
      sorted.add(lo)
      return
    }
    const p = partition(lo, hi)
    sort(lo, p - 1)
    sort(p + 1, hi)
  }

  sort(0, n - 1)
  for (let i = 0; i < n; i++) sorted.add(i)
  push({}, "The array is fully sorted.", 7)
  return steps
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------
export const ALGORITHMS: Record<AlgorithmId, AlgorithmMeta> = {
  bubble: {
    id: "bubble",
    name: "Bubble Sort",
    summary: "Repeatedly compares adjacent items and swaps them until the largest values bubble to the end.",
    pseudocode: [
      "for i = 0 to n - 1",
      "  for j = 0 to n - i - 2",
      "    if a[j] > a[j + 1]",
      "      swap a[j], a[j + 1]",
      "    mark a[n - i - 1] as sorted",
      "return a",
    ],
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: true },
    generate: bubbleSort,
  },
  selection: {
    id: "selection",
    name: "Selection Sort",
    summary: "Finds the smallest remaining value on each pass and moves it into the sorted region.",
    pseudocode: [
      "for i = 0 to n - 1",
      "  min = i",
      "  for j = i + 1 to n - 1",
      "    if a[j] < a[min]",
      "      min = j",
      "  swap a[i], a[min]",
      "  mark a[i] as sorted",
      "return a",
    ],
    complexity: { best: "O(n²)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: false },
    generate: selectionSort,
  },
  insertion: {
    id: "insertion",
    name: "Insertion Sort",
    summary: "Builds a sorted region one element at a time by inserting each new value into place.",
    pseudocode: [
      "for i = 1 to n - 1",
      "  key = a[i]",
      "  j = i - 1",
      "  while j >= 0 and a[j] > key",
      "    a[j + 1] = a[j]; j = j - 1",
      "  a[j + 1] = key",
      "return a",
    ],
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)", stable: true },
    generate: insertionSort,
  },
  merge: {
    id: "merge",
    name: "Merge Sort",
    summary: "Recursively splits the array in half, then merges the sorted halves back together.",
    pseudocode: [
      "function sort(lo, hi)",
      "  if lo >= hi return",
      "  mid = (lo + hi) / 2",
      "  sort(lo, mid); sort(mid + 1, hi)",
      "  while both halves have items",
      "    copy the smaller front value",
      "  copy any remaining values",
      "return a",
    ],
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)", stable: true },
    generate: mergeSort,
  },
  quick: {
    id: "quick",
    name: "Quick Sort",
    summary: "Picks a pivot, partitions values around it, then recursively sorts each partition.",
    pseudocode: [
      "function sort(lo, hi)",
      "  if lo >= hi return",
      "  pivot = a[hi]; i = lo",
      "  for j = lo to hi - 1",
      "    if a[j] < pivot",
      "      swap a[i], a[j]; i = i + 1",
      "  swap a[i], a[hi]",
      "  sort(lo, i-1); sort(i+1, hi)",
    ],
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)", stable: false },
    generate: quickSort,
  },
}

export const ALGORITHM_LIST: AlgorithmMeta[] = [
  ALGORITHMS.bubble,
  ALGORITHMS.selection,
  ALGORITHMS.insertion,
]

export function randomArray(size = 12, min = 5, max = 100): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

/** Parse a user string like "5, 12, 8" into a clamped numeric array. */
export function parseArray(raw: string): number[] {
  return raw
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => Number(t))
    .filter((n) => Number.isFinite(n))
    .map((n) => Math.max(1, Math.min(100, Math.round(n))))
    .slice(0, 20)
}
