import { useState, useEffect, useRef } from 'react';
import { useDemo } from '@context/DemoContext';
import { observeLCP, storeLCPResult, getLCPRating } from '@lib/lcp';
import styles from './LcpMeasure.module.css';

export default function LcpMeasure({ template, solution, speed }) {
  const { setLcpData } = useDemo();
  const [displayedLcp, setDisplayedLcp] = useState(null);
  const [measuring, setMeasuring] = useState(true);
  const latestLcpRef = useRef(null);
  const stabilizeTimerRef = useRef(null);

  useEffect(() => {
    setDisplayedLcp(null);
    setMeasuring(true);
    latestLcpRef.current = null;

    const cleanup = observeLCP((data) => {
      // Store every entry but don't display yet - wait for stabilization
      latestLcpRef.current = data;

      // Reset stabilization timer on each new entry
      if (stabilizeTimerRef.current) {
        clearTimeout(stabilizeTimerRef.current);
      }

      // After 2s without new entries, consider it the final LCP
      stabilizeTimerRef.current = setTimeout(() => {
        const finalData = latestLcpRef.current;
        if (finalData) {
          setDisplayedLcp(finalData);
          setLcpData(finalData);
          storeLCPResult(template, solution, speed, finalData);
          setMeasuring(false);
        }
      }, 2000);
    });

    // Stop measuring after 15s max
    const timeout = setTimeout(() => {
      // If we have a pending LCP, display it now
      if (latestLcpRef.current && !displayedLcp) {
        const finalData = latestLcpRef.current;
        setDisplayedLcp(finalData);
        setLcpData(finalData);
        storeLCPResult(template, solution, speed, finalData);
      }
      setMeasuring(false);
    }, 15000);

    return () => {
      cleanup();
      clearTimeout(timeout);
      if (stabilizeTimerRef.current) {
        clearTimeout(stabilizeTimerRef.current);
      }
    };
  }, [template, solution, speed, setLcpData]);

  const rating = displayedLcp ? getLCPRating(displayedLcp.value) : null;

  return (
    <div className={`${styles.badge} ${rating ? styles[rating] : ''}`}>
      <div className={styles.label}>LCP</div>
      <div className={styles.content}>
        {measuring && !displayedLcp ? (
          <div className={styles.value}>...</div>
        ) : displayedLcp ? (
          <>
            <div className={styles.value}>
              {displayedLcp.value >= 1000
                ? `${(displayedLcp.value / 1000).toFixed(2)}s`
                : `${displayedLcp.value}ms`}
            </div>
            <div className={styles.meta}>
              {displayedLcp.element} {displayedLcp.size > 0 && `(${displayedLcp.size}px)`}
            </div>
          </>
        ) : (
          <div className={styles.value}>No LCP</div>
        )}
      </div>
      <button
        className={styles.reload}
        onClick={() => {
          // Navigate with cache-buster to force fresh image URLs (bypasses /_next/image cache)
          const url = new URL(window.location.href);
          url.searchParams.set('_t', Date.now());
          window.location.href = url.toString();
        }}
        title="Reload to re-measure"
      >
        Re-measure
      </button>
    </div>
  );
}
