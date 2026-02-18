import { useState, useEffect } from 'react';
import Head from 'next/head';
import { getAllResults, clearResults, getLCPRating } from '@lib/lcp';
import { SPEED_CONFIG, SOLUTION_CONFIG, TEMPLATE_CONFIG } from '@lib/images';
import styles from '@styles/Results.module.css';

const templates = Object.keys(TEMPLATE_CONFIG);
const solutions = Object.keys(SOLUTION_CONFIG);
const speeds = Object.keys(SPEED_CONFIG);

export default function Results() {
  const [results, setResults] = useState({});
  const [activeSpeed, setActiveSpeed] = useState('fast');

  useEffect(() => {
    setResults(getAllResults());
  }, []);

  function handleClear() {
    clearResults();
    setResults({});
  }

  function getResult(template, solution) {
    const key = `${template}-${solution}-${activeSpeed}`;
    return results[key] || null;
  }

  function formatLCP(value) {
    if (value >= 1000) return `${(value / 1000).toFixed(2)}s`;
    return `${value}ms`;
  }

  const hasResults = Object.keys(results).length > 0;

  return (
    <>
      <Head>
        <title>Results | Blur POC</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>LCP Results</h1>
            <p className={styles.subtitle}>
              Comparison of measured LCP values across templates and solutions
            </p>
          </div>
          {hasResults && (
            <button onClick={handleClear} className={styles.clearBtn}>
              Clear All
            </button>
          )}
        </div>

        {/* Speed tabs */}
        <div className={styles.speedTabs}>
          {speeds.map((speed) => (
            <button
              key={speed}
              className={`${styles.speedTab} ${activeSpeed === speed ? styles.speedTabActive : ''}`}
              onClick={() => setActiveSpeed(speed)}
            >
              {SPEED_CONFIG[speed].label}
            </button>
          ))}
        </div>

        {/* Results table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Template</th>
                {solutions.map((sol) => (
                  <th key={sol} className={styles.th}>
                    {SOLUTION_CONFIG[sol].label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {templates.map((tmpl) => (
                <tr key={tmpl}>
                  <td className={styles.td}>
                    {TEMPLATE_CONFIG[tmpl].label}
                  </td>
                  {solutions.map((sol) => {
                    const result = getResult(tmpl, sol);
                    const rating = result ? getLCPRating(result.value) : null;
                    return (
                      <td
                        key={sol}
                        className={`${styles.td} ${styles.valueCell} ${rating ? styles[rating] : ''}`}
                      >
                        {result ? (
                          <>
                            <span className={styles.lcpValue}>{formatLCP(result.value)}</span>
                            <span className={styles.lcpMeta}>{result.element}</span>
                          </>
                        ) : (
                          <span className={styles.noData}>-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!hasResults && (
          <div className={styles.empty}>
            No measurements yet. Visit the demo pages to collect LCP data.
          </div>
        )}

        {/* Legend */}
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotGood}`} /> Good (&lt; 2.5s)
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotNi}`} /> Needs Improvement (2.5s - 4s)
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.dot} ${styles.dotPoor}`} /> Poor (&gt; 4s)
          </span>
        </div>
      </div>
    </>
  );
}
