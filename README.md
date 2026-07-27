# DS Visual Project

An algorithm visualizer designed to be easy to follow. 
<img width="1508" height="847" alt="image" src="https://github.com/user-attachments/assets/a5f3431b-cc05-4d6c-9f42-fd6a621f20fa" />

## Features

- Step-by-step visualizations for nine sorting algorithms:
  - Bubble Sort
  - Selection Sort
  - Insertion Sort
  - Merge Sort
  - Quick Sort
  - Heap Sort
  - Counting Sort
  - Radix Sort
  - Bucket Sort
- Random or custom arrays (up to 20 values, clamped to the range 1-100)
- Play, pause, restart, seek, and adjustable playback speed
- Highlighted comparisons, swaps, pivots, keys, and sorted values
- Live explanations paired with a variable tracker that shows the current pseudocode values, such as `i`, `j`, `n`, `key`, `pivot`, and `min`
- Highlighted active pseudocode lines, language-specific implementations, and complexity details
- Keyboard controls: <kbd>Space</kbd> to play or pause, <kbd>Left Arrow</kbd> and <kbd>Right Arrow</kbd> to move between steps

## Getting Started

The Next.js application is in the `dsvisualproject` directory.

### Prerequisites

- Node.js 20 or later
- pnpm

### Install and run

```bash
cd dsvisualproject
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available Scripts

Run these commands from the `dsvisualproject` directory:

```bash
pnpm dev      # Start the development server
pnpm build    # Create a production build
pnpm start    # Run the production server
pnpm lint     # Run ESLint
```

## Project Structure

```text
dsvisualproject/
├── app/                  # Next.js routes and page styles
├── components/dsvisual/  # Visualizer UI components
├── lib/algorithms.ts     # Algorithm metadata and step generators
└── lib/bar-state.tsx     # Shared visualization state helpers
```

## Technology

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
