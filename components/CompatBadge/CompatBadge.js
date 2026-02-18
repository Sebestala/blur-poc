import styles from './CompatBadge.module.css';

export default function CompatBadge({ solution }) {
  // Only show badge for S2 (Next.js limitation worth highlighting)
  if (solution !== 'native-blur') return null;

  return (
    <span
      className={`${styles.badge} ${styles.nextjs}`}
      title="Applicable to AMQ, YSL (headless Next.js only)"
    >
      Next.js only
    </span>
  );
}
