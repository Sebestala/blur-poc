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
  const isHomePage = router.pathname === '/';
  const isResultsPage = router.pathname === '/results';

  function navigateTo(template, solution) {
    const params = new URLSearchParams();
    if (speed !== 'fast') params.set('speed', speed);
    if (transition !== 'fadeIn') params.set('transition', transition);
    const qs = params.toString();
    router.push(`/${template}/${solution}${qs ? `?${qs}` : ''}`);
  }

  function handleSpeedChange(newSpeed) {
    setSpeed(newSpeed);
    // Reload the page to re-trigger LCP measurement with new speed
    if (currentTemplate && currentSolution) {
      const params = new URLSearchParams(window.location.search);
      if (newSpeed !== 'fast') {
        params.set('speed', newSpeed);
      } else {
        params.delete('speed');
      }
      if (transition !== 'fadeIn') params.set('transition', transition);
      const qs = params.toString();
      window.location.href = `/${currentTemplate}/${currentSolution}${qs ? `?${qs}` : ''}`;
    }
  }

  function handleTransitionChange(newTransition) {
    setTransition(newTransition);
    if (currentTemplate && currentSolution) {
      const params = new URLSearchParams(window.location.search);
      if (speed !== 'fast') params.set('speed', speed);
      if (newTransition !== 'fadeIn') {
        params.set('transition', newTransition);
      } else {
        params.delete('transition');
      }
      const qs = params.toString();
      window.location.href = `/${currentTemplate}/${currentSolution}${qs ? `?${qs}` : ''}`;
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo / Home link */}
        <a href="/" className={styles.logo}>
          BLUR POC
        </a>

        {/* Template tabs */}
        <nav className={styles.nav}>
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

          {/* Solution tabs */}
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

          {/* Speed selector */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>Speed</span>
            <div className={styles.tabs}>
              {Object.entries(SPEED_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  className={`${styles.tab} ${speed === key ? styles.tabActive : ''}`}
                  onClick={() => handleSpeedChange(key)}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>

          {/* Transition selector */}
          <div className={styles.group}>
            <span className={styles.groupLabel}>Transition</span>
            <div className={styles.tabs}>
              {Object.entries(TRANSITIONS).map(([key, config]) => (
                <button
                  key={key}
                  className={`${styles.tab} ${transition === key ? styles.tabActive : ''}`}
                  onClick={() => handleTransitionChange(key)}
                  title={config.description}
                >
                  {config.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Results link */}
        <a
          href="/results"
          className={`${styles.resultsLink} ${isResultsPage ? styles.resultsLinkActive : ''}`}
        >
          Results
        </a>
      </div>
    </header>
  );
}
