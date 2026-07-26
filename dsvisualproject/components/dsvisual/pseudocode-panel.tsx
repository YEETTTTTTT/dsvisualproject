"use client"

import { ChevronRight, Code2 } from "lucide-react"
import { useId, useState } from "react"
import type { AlgorithmId } from "@/lib/algorithms"
import styles from "./pseudocode-panel.module.css"

interface PseudocodePanelProps {
  lines: string[]
  activeLine: number
  algorithmId: AlgorithmId
}

type Language = "Python" | "Java" | "C++" | "JavaScript"

const IMPLEMENTATIONS: Record<AlgorithmId, Record<Language, string>> = {
  bubble: {
    Python: `def bubble_sort(values):
    result = values[:]
    for end in range(len(result) - 1, 0, -1):
        for index in range(end):
            if result[index] > result[index + 1]:
                result[index], result[index + 1] = result[index + 1], result[index]
    return result`,
    Java: `static int[] bubbleSort(int[] values) {
    int[] result = values.clone();
    for (int end = result.length - 1; end > 0; end--) {
        for (int index = 0; index < end; index++) {
            if (result[index] > result[index + 1]) {
                int temp = result[index];
                result[index] = result[index + 1];
                result[index + 1] = temp;
            }
        }
    }
    return result;
}`,
    "C++": `vector<int> bubbleSort(vector<int> values) {
    for (int end = values.size() - 1; end > 0; --end) {
        for (int index = 0; index < end; ++index) {
            if (values[index] > values[index + 1]) {
                swap(values[index], values[index + 1]);
            }
        }
    }
    return values;
}`,
    JavaScript: `function bubbleSort(values) {
  const result = [...values];
  for (let end = result.length - 1; end > 0; end--) {
    for (let index = 0; index < end; index++) {
      if (result[index] > result[index + 1]) {
        [result[index], result[index + 1]] = [result[index + 1], result[index]];
      }
    }
  }
  return result;
}`,
  },
  selection: {
    Python: `def selection_sort(values):
    result = values[:]
    for index in range(len(result) - 1):
        minimum = index
        for candidate in range(index + 1, len(result)):
            if result[candidate] < result[minimum]:
                minimum = candidate
        result[index], result[minimum] = result[minimum], result[index]
    return result`,
    Java: `static int[] selectionSort(int[] values) {
    int[] result = values.clone();
    for (int index = 0; index < result.length - 1; index++) {
        int minimum = index;
        for (int candidate = index + 1; candidate < result.length; candidate++) {
            if (result[candidate] < result[minimum]) minimum = candidate;
        }
        int temp = result[index];
        result[index] = result[minimum];
        result[minimum] = temp;
    }
    return result;
}`,
    "C++": `vector<int> selectionSort(vector<int> values) {
    for (int index = 0; index < values.size() - 1; ++index) {
        int minimum = index;
        for (int candidate = index + 1; candidate < values.size(); ++candidate) {
            if (values[candidate] < values[minimum]) minimum = candidate;
        }
        swap(values[index], values[minimum]);
    }
    return values;
}`,
    JavaScript: `function selectionSort(values) {
  const result = [...values];
  for (let index = 0; index < result.length - 1; index++) {
    let minimum = index;
    for (let candidate = index + 1; candidate < result.length; candidate++) {
      if (result[candidate] < result[minimum]) minimum = candidate;
    }
    [result[index], result[minimum]] = [result[minimum], result[index]];
  }
  return result;
}`,
  },
  insertion: {
    Python: `def insertion_sort(values):
    result = values[:]
    for index in range(1, len(result)):
        key = result[index]
        position = index - 1
        while position >= 0 and result[position] > key:
            result[position + 1] = result[position]
            position -= 1
        result[position + 1] = key
    return result`,
    Java: `static int[] insertionSort(int[] values) {
    int[] result = values.clone();
    for (int index = 1; index < result.length; index++) {
        int key = result[index];
        int position = index - 1;
        while (position >= 0 && result[position] > key) {
            result[position + 1] = result[position--];
        }
        result[position + 1] = key;
    }
    return result;
}`,
    "C++": `vector<int> insertionSort(vector<int> values) {
    for (int index = 1; index < values.size(); ++index) {
        int key = values[index];
        int position = index - 1;
        while (position >= 0 && values[position] > key) {
            values[position + 1] = values[position--];
        }
        values[position + 1] = key;
    }
    return values;
}`,
    JavaScript: `function insertionSort(values) {
  const result = [...values];
  for (let index = 1; index < result.length; index++) {
    const key = result[index];
    let position = index - 1;
    while (position >= 0 && result[position] > key) {
      result[position + 1] = result[position--];
    }
    result[position + 1] = key;
  }
  return result;
}`,
  },
  merge: {
  Python: `def merge_sort(values):
  if len(values) <= 1:
      return values
  mid = len(values) // 2
  left = merge_sort(values[:mid])
  right = merge_sort(values[mid:])
  result = []
  while left and right:
      result.append((left if left[0] <= right[0] else right).pop(0))
  return result + left + right`,
  Java: `static int[] mergeSort(int[] values) {
  if (values.length <= 1) return values;
  int mid = values.length / 2;
  int[] left = mergeSort(Arrays.copyOfRange(values, 0, mid));
  int[] right = mergeSort(Arrays.copyOfRange(values, mid, values.length));
  int[] result = new int[values.length];
  for (int i = 0, l = 0, r = 0; i < result.length; i++)
      result[i] = r == right.length || (l < left.length && left[l] <= right[r]) ? left[l++] : right[r++];
  return result;
}`,
  "C++": `vector<int> mergeSort(vector<int> values) {
  if (values.size() <= 1) return values;
  auto mid = values.begin() + values.size() / 2;
  vector<int> left(values.begin(), mid), right(mid, values.end());
  left = mergeSort(left); right = mergeSort(right);
  vector<int> result;
  merge(left.begin(), left.end(), right.begin(), right.end(), back_inserter(result));
  return result;
}`,
  JavaScript: `function mergeSort(values) {
  if (values.length <= 1) return values;
  const mid = Math.floor(values.length / 2);
  const left = mergeSort(values.slice(0, mid));
  const right = mergeSort(values.slice(mid));
  const result = [];
  while (left.length && right.length) {
  result.push(left[0] <= right[0] ? left.shift() : right.shift());
  }
  return [...result, ...left, ...right];
}`,
  },
  quick: {
  Python: `def quick_sort(values):
  if len(values) <= 1:
      return values
  pivot = values[-1]
  smaller = [value for value in values[:-1] if value < pivot]
  greater = [value for value in values[:-1] if value >= pivot]
  return quick_sort(smaller) + [pivot] + quick_sort(greater)`,
  Java: `static void quickSort(int[] values, int lo, int hi) {
  if (lo >= hi) return;
  int pivot = values[hi], next = lo;
  for (int index = lo; index < hi; index++) {
      if (values[index] < pivot) {
          int temp = values[next]; values[next++] = values[index]; values[index] = temp;
      }
  }
  int temp = values[next]; values[next] = values[hi]; values[hi] = temp;
  quickSort(values, lo, next - 1); quickSort(values, next + 1, hi);
}`,
  "C++": `void quickSort(vector<int>& values, int lo, int hi) {
  if (lo >= hi) return;
  int pivot = values[hi], next = lo;
  for (int index = lo; index < hi; ++index)
      if (values[index] < pivot) swap(values[next++], values[index]);
  swap(values[next], values[hi]);
  quickSort(values, lo, next - 1); quickSort(values, next + 1, hi);
}`,
  JavaScript: `function quickSort(values) {
  if (values.length <= 1) return values;
  const pivot = values.at(-1);
  const smaller = values.slice(0, -1).filter((value) => value < pivot);
  const greater = values.slice(0, -1).filter((value) => value >= pivot);
  return [...quickSort(smaller), pivot, ...quickSort(greater)];
}`,
  },
  heap: {
  Python: `def heap_sort(values):
  result = values[:]
  def sift(root, size):
      while root * 2 + 1 < size:
          child = root * 2 + 1
          if child + 1 < size and result[child] < result[child + 1]:
              child += 1
          if result[root] >= result[child]: break
          result[root], result[child] = result[child], result[root]
          root = child
  for root in range(len(result) // 2 - 1, -1, -1): sift(root, len(result))
  for end in range(len(result) - 1, 0, -1):
      result[0], result[end] = result[end], result[0]; sift(0, end)
  return result`,
  Java: `static void heapSort(int[] values) {
  for (int root = values.length / 2 - 1; root >= 0; root--) sift(values, root, values.length);
  for (int end = values.length - 1; end > 0; end--) {
      int temp = values[0]; values[0] = values[end]; values[end] = temp;
      sift(values, 0, end);
  }
}
static void sift(int[] values, int root, int size) {
  for (int child; (child = root * 2 + 1) < size; root = child) {
      if (child + 1 < size && values[child] < values[child + 1]) child++;
      if (values[root] >= values[child]) return;
      int temp = values[root]; values[root] = values[child]; values[child] = temp;
  }
}`,
  "C++": `void heapSort(vector<int>& values) {
  auto sift = [&](int root, int size) {
      for (int child; (child = root * 2 + 1) < size; root = child) {
          if (child + 1 < size && values[child] < values[child + 1]) ++child;
          if (values[root] >= values[child]) break;
          swap(values[root], values[child]);
      }
  };
  for (int root = values.size() / 2 - 1; root >= 0; --root) sift(root, values.size());
  for (int end = values.size() - 1; end > 0; --end) {
      swap(values[0], values[end]); sift(0, end);
  }
}`,
  JavaScript: `function heapSort(values) {
  const result = [...values];
  const sift = (root, size) => {
  for (let child; (child = root * 2 + 1) < size; root = child) {
    if (child + 1 < size && result[child] < result[child + 1]) child++;
    if (result[root] >= result[child]) return;
    [result[root], result[child]] = [result[child], result[root]];
  }
  };
  for (let root = Math.floor(result.length / 2) - 1; root >= 0; root--) sift(root, result.length);
  for (let end = result.length - 1; end > 0; end--) {
  [result[0], result[end]] = [result[end], result[0]]; sift(0, end);
  }
  return result;
}`,
  },
  counting: {
  Python: `def counting_sort(values):
  counts = [0] * (max(values) + 1)
  for value in values:
      counts[value] += 1
  result = []
  for value, count in enumerate(counts):
      result.extend([value] * count)
  return result`,
  Java: `static int[] countingSort(int[] values) {
  int max = Arrays.stream(values).max().orElse(0);
  int[] counts = new int[max + 1], result = new int[values.length];
  for (int value : values) counts[value]++;
  for (int value = 1; value < counts.length; value++) counts[value] += counts[value - 1];
  for (int index = values.length - 1; index >= 0; index--) result[--counts[values[index]]] = values[index];
  return result;
}`,
  "C++": `vector<int> countingSort(const vector<int>& values) {
  int maximum = *max_element(values.begin(), values.end());
  vector<int> counts(maximum + 1), result;
  for (int value : values) ++counts[value];
  for (int value = 0; value <= maximum; ++value)
      result.insert(result.end(), counts[value], value);
  return result;
}`,
  JavaScript: `function countingSort(values) {
  const counts = Array(Math.max(...values) + 1).fill(0);
  for (const value of values) counts[value]++;
  const result = [];
  for (let value = 0; value < counts.length; value++) {
  result.push(...Array(counts[value]).fill(value));
  }
  return result;
}`,
  },
  radix: {
  Python: `def radix_sort(values):
  result, place = values[:], 1
  while max(result) // place > 0:
      buckets = [[] for _ in range(10)]
      for value in result:
          buckets[value // place % 10].append(value)
      result = [value for bucket in buckets for value in bucket]
      place *= 10
  return result`,
  Java: `static int[] radixSort(int[] values) {
  int[] result = values.clone(), output = new int[values.length];
  for (int place = 1; Arrays.stream(result).max().orElse(0) / place > 0; place *= 10) {
      int[] counts = new int[10];
      for (int value : result) counts[value / place % 10]++;
      for (int digit = 1; digit < 10; digit++) counts[digit] += counts[digit - 1];
      for (int index = result.length - 1; index >= 0; index--) output[--counts[result[index] / place % 10]] = result[index];
      System.arraycopy(output, 0, result, 0, result.length);
  }
  return result;
}`,
  "C++": `vector<int> radixSort(vector<int> values) {
  int maximum = *max_element(values.begin(), values.end());
  for (int place = 1; maximum / place > 0; place *= 10) {
      vector<int> output(values.size()); int counts[10] = {};
      for (int value : values) ++counts[value / place % 10];
      for (int digit = 1; digit < 10; ++digit) counts[digit] += counts[digit - 1];
      for (int index = values.size() - 1; index >= 0; --index) output[--counts[values[index] / place % 10]] = values[index];
      values = output;
  }
  return values;
}`,
  JavaScript: `function radixSort(values) {
  let result = [...values];
  for (let place = 1; Math.floor(Math.max(...result) / place) > 0; place *= 10) {
  const buckets = Array.from({ length: 10 }, () => []);
  for (const value of result) buckets[Math.floor(value / place) % 10].push(value);
  result = buckets.flat();
  }
  return result;
}`,
  },
  bucket: {
  Python: `def bucket_sort(values):
  count = max(1, int(len(values) ** 0.5))
  low, high = min(values), max(values)
  width = max(1, (high - low + count) // count)
  buckets = [[] for _ in range(count)]
  for value in values:
      buckets[min(count - 1, (value - low) // width)].append(value)
  return [value for bucket in buckets for value in sorted(bucket)]`,
  Java: `static int[] bucketSort(int[] values) {
  int count = Math.max(1, (int) Math.ceil(Math.sqrt(values.length)));
  int low = Arrays.stream(values).min().orElse(0), high = Arrays.stream(values).max().orElse(0);
  int width = Math.max(1, (int) Math.ceil((high - low + 1.0) / count));
  List<List<Integer>> buckets = IntStream.range(0, count).mapToObj(i -> new ArrayList<Integer>()).toList();
  for (int value : values) buckets.get(Math.min(count - 1, (value - low) / width)).add(value);
  return buckets.stream().flatMap(List::stream).sorted().mapToInt(Integer::intValue).toArray();
}`,
  "C++": `vector<int> bucketSort(const vector<int>& values) {
  int count = max(1, int(ceil(sqrt(values.size())));
  int low = *min_element(values.begin(), values.end()), high = *max_element(values.begin(), values.end());
  int width = max(1, int(ceil(double(high - low + 1) / count)));
  vector<vector<int>> buckets(count);
  for (int value : values) buckets[min(count - 1, (value - low) / width)].push_back(value);
  vector<int> result;
  for (auto& bucket : buckets) { stable_sort(bucket.begin(), bucket.end()); result.insert(result.end(), bucket.begin(), bucket.end()); }
  return result;
}`,
  JavaScript: `function bucketSort(values) {
  const count = Math.max(1, Math.ceil(Math.sqrt(values.length)));
  const low = Math.min(...values), high = Math.max(...values);
  const width = Math.max(1, Math.ceil((high - low + 1) / count));
  const buckets = Array.from({ length: count }, () => []);
  for (const value of values) buckets[Math.min(count - 1, Math.floor((value - low) / width))].push(value);
  return buckets.flatMap((bucket) => bucket.sort((left, right) => left - right));
}`,
  },
}

export function PseudocodePanel({ lines, activeLine, algorithmId }: PseudocodePanelProps) {
  const [showCode, setShowCode] = useState(false)
  const [language, setLanguage] = useState<Language>("Python")
  const toggleId = useId()
  const implementation = IMPLEMENTATIONS[algorithmId as keyof typeof IMPLEMENTATIONS]?.[language]

  return (
    <section className={styles.wrap} aria-labelledby="pseudocode-heading">
      <div className={styles.head}>
        <h2 id="pseudocode-heading" className={styles.title}>
          <Code2 className={styles.titleIcon} aria-hidden="true" />
          {showCode ? "Code implementation" : "Pseudocode"}
        </h2>
        <div className={styles.controls}>
          {showCode && (
            <label className={styles.languageLabel}>
              <span className={styles.srOnly}>Programming language</span>
              <select
                className={styles.languageSelect}
                value={language}
                onChange={(event) => setLanguage(event.target.value as Language)}
              >
                {Object.keys(IMPLEMENTATIONS.bubble).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          )}
          <label className={styles.toggleLabel} htmlFor={toggleId}>
            <span>Pseudocode</span>
            <input
              id={toggleId}
              className={styles.toggleInput}
              type="checkbox"
              checked={showCode}
              onChange={(event) => setShowCode(event.target.checked)}
            />
            <span className={styles.toggle} aria-hidden="true" />
            <span>Code</span>
          </label>
        </div>
      </div>

      {showCode && implementation ? (
        <pre className={styles.implementation} aria-label={`${language} implementation`}>
          <code>{implementation}</code>
        </pre>
      ) : (
        <ol className={styles.list}>
          {lines.map((line, index) => {
            const active = index === activeLine
            return (
              <li
                key={index}
                aria-current={active ? "step" : undefined}
                className={styles.line}
                data-active={active || undefined}
              >
                <ChevronRight className={styles.caret} aria-hidden="true" />
                <span className={styles.num} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.code}>{line}</span>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}
