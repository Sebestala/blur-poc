import { useState } from 'react';
import styles from './DemoImage.module.css';

/**
 * S1 - No Blur: Standard image loading with grey placeholder.
 * Mimics AMQ's current addBackgroundColor approach.
 * LCP = full image load time.
 */
export default function NoBlurImage({ src, alt, width, height, priority = false }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={styles.container}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className={`${styles.placeholder} ${loaded ? styles.placeholderHidden : ''}`}
      />
      <img
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
