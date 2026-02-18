import styles from './CompatBadge.module.css';

const COMPAT = {
  'no-blur': {
    label: 'All platforms',
    detail: 'Current state for all brands',
    type: 'neutral',
  },
  'native-blur': {
    label: 'Next.js only',
    detail: 'Applicable to AMQ, YSL (headless)',
    type: 'nextjs',
  },
  'custom-blur': {
    label: 'All platforms',
    detail: 'Works on Next.js and SFCC (AMQ, YSL, BV, BAL)',
    type: 'universal',
  },
};

export default function CompatBadge({ solution }) {
  const config = COMPAT[solution];
  if (!config) return null;

  return (
    <span className={`${styles.badge} ${styles[config.type]}`} title={config.detail}>
      {config.label}
    </span>
  );
}
