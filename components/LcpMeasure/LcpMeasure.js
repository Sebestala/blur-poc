import { useState, useEffect } from 'react';
import { useDemo } from '@context/DemoContext';
import { observeLCP, storeLCPResult, getLCPRating } from '@lib/lcp';
import styles from './LcpMeasure.module.css';

export default function LcpMeasure({ template, solution, speed }) {
  const { setLcpData } = useDemo();
  const [lcp, setLcp] = useState(null);
  const [measuring, setMeasuring] = useState(true);

  useEffect(() => {
    setLcp(null);
    setMeasuring(true);

    const cleanup = observeLCP((data) => {
      setLcp(data);
      setLcpData(data);
      storeLCPResult(template, solution, speed, data);
    });

    // Stop measuring after 15s max
    const timeout = setTimeout(() => {
      setMeasuring(false);
    }, 15000);

    return () => {
      cleanup();
      clearTimeout(timeout);
    };
  }, [template, solution, speed, setLcpData]);

  const rating = lcp ? getLCPRating(lcp.value) : null;

  return (
    <div className={`${styles.badge} ${rating ? styles[rating] : ''}`}>
      <div className={styles.label}>LCP</div>
      {measuring && !lcp ? (
        <div className={styles.value}>Measuring...</div>
      ) : lcp ? (
        <>
          <div className={styles.value}>
            {lcp.value >= 1000
              ? `${(lcp.value / 1000).toFixed(2)}s`
              : `${lcp.value}ms`}
          </div>
          <div className={styles.meta}>
            {lcp.element} {lcp.size > 0 && `(${lcp.size}px)`}
          </div>
        </>
      ) : (
        <div className={styles.value}>No LCP</div>
      )}
      <button
        className={styles.reload}
        onClick={() => window.location.reload()}
        title="Reload to re-measure"
      >
        Reload
      </button>
    </div>
  );
}
