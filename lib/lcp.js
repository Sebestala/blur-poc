/**
 * LCP measurement utilities using PerformanceObserver API.
 * Stores results in localStorage for the results dashboard.
 */

/**
 * Observe LCP on the current page.
 * Returns a cleanup function.
 */
export function observeLCP(callback) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return () => {};
  }

  let lastEntry = null;

  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    for (const entry of entries) {
      lastEntry = entry;
      callback({
        value: Math.round(entry.startTime),
        element: entry.element?.tagName || 'unknown',
        url: entry.url || '',
        size: entry.size || 0,
      });
    }
  });

  observer.observe({ type: 'largest-contentful-paint', buffered: true });

  return () => {
    observer.disconnect();
  };
}

/**
 * Store an LCP result in localStorage
 */
export function storeLCPResult(template, solution, speed, data) {
  if (typeof window === 'undefined') return;

  const key = 'blur-poc-lcp-results';
  const existing = JSON.parse(localStorage.getItem(key) || '{}');
  const resultKey = `${template}-${solution}-${speed}`;

  existing[resultKey] = {
    ...data,
    template,
    solution,
    speed,
    timestamp: Date.now(),
  };

  localStorage.setItem(key, JSON.stringify(existing));
}

/**
 * Get all stored LCP results
 */
export function getAllResults() {
  if (typeof window === 'undefined') return {};
  return JSON.parse(localStorage.getItem('blur-poc-lcp-results') || '{}');
}

/**
 * Clear all stored results
 */
export function clearResults() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('blur-poc-lcp-results');
}

/**
 * Get LCP rating color
 */
export function getLCPRating(value) {
  if (value <= 2500) return 'good';
  if (value <= 4000) return 'needs-improvement';
  return 'poor';
}
