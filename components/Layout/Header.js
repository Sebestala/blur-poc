import { useRouter } from 'next/router';
import { useDemo } from '@context/DemoContext';
import { SPEED_CONFIG, SOLUTION_CONFIG, TEMPLATE_CONFIG } from '@lib/images';
import { TRANSITIONS } from '@lib/transitions';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const { speed, setSpeed, transition, setTransition } = useDemo();

  // Parse current route to determine active template + solution
  const pathParts = router.pathname.split('/').filter(Boolean);
  const currentTemplate = pathParts[0] || null;
  const currentSolution = pathParts[1] || null;
  const isResultsPage = router.pathname === '/results';

  function navigateTo(template, solution) {
    const params = new URLSearchParams();
    if (speed !== 'fast') params.set('speed', speed);
    if (transition !== 'fadeIn') params.set('transition', transition);
    const qs = params.toString();
    window.location.href = `/${template}/${solution}${qs ? `?${qs}` : ''}`;
  }

  function handleSpeedChange(newSpeed) {
    setSpeed(newSpeed);
    if (currentTemplate && currentSolution) {
      const params = new URLSearchParams();
      if (newSpeed !== 'fast') params.set('speed', newSpeed);
      if (transition !== 'fadeIn') params.set('transition', transition);
      const qs = params.toString();
      window.location.href = `/${currentTemplate}/${currentSolution}${qs ? `?${qs}` : ''}`;
    }
  }

  function handleTransitionChange(newTransition) {
    setTransition(newTransition);
    if (currentTemplate && currentSolution) {
      const params = new URLSearchParams();
      if (speed !== 'fast') params.set('speed', speed);
      if (newTransition !== 'fadeIn') params.set('transition', newTransition);
      const qs = params.toString();
      window.location.href = `/${currentTemplate}/${currentSolution}${qs ? `?${qs}` : ''}`;
    }
  }

  return (
    <header className={styles.header}>
      {/* Row 1: Navigation (pages) */}
      <div className={styles.row1}>
        <a href="/" className={styles.logo}>
          BLUR POC
        </a>

        <div className={styles.divider} />

        <nav className={styles.pageNav}>
          <span className={styles.rowLabel}>Pages</span>

          <div className={styles.group}>
            <span className={styles.groupLabel}>Template</span>
            <div className={styles.tabs}>
              {Object.entries(TEMPLATE_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  className={`${styles.tab} ${currentTemplate === key ? styles.tabActive : ''}`}
                  onClick={() => navigateTo(key, currentSolution || 'no-blur')}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.group}>
            <span className={styles.groupLabel}>Solution</span>
            <div className={styles.tabs}>
              {Object.entries(SOLUTION_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  className={`${styles.tab} ${currentSolution === key ? styles.tabActive : ''}`}
                  onClick={() => navigateTo(currentTemplate || 'hero', key)}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <a
          href="/results"
          className={`${styles.resultsLink} ${isResultsPage ? styles.resultsLinkActive : ''}`}
        >
          Results
        </a>
      </div>

      {/* Row 2: Settings (options) */}
      <div className={styles.row2}>
        <span className={styles.rowLabel}>Settings</span>

        <div className={styles.group}>
          <span className={styles.groupLabel}>Network Speed</span>
          <div className={styles.tabs}>
            {Object.entries(SPEED_CONFIG).map(([key, config]) => (
              <button
                key={key}
                className={`${styles.tab} ${styles.tabSmall} ${speed === key ? styles.tabActive : ''}`}
                onClick={() => handleSpeedChange(key)}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.settingSep} />

        <div className={styles.group}>
          <span className={styles.groupLabel}>Transition (S3)</span>
          <div className={styles.tabs}>
            {Object.entries(TRANSITIONS).map(([key, config]) => (
              <button
                key={key}
                className={`${styles.tab} ${styles.tabSmall} ${transition === key ? styles.tabActive : ''}`}
                onClick={() => handleTransitionChange(key)}
                title={config.description}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
