import { useState, useRef, useEffect } from 'react';
import styles from './DemoImage.module.css';

/**
 * S1 - No Blur: Standard image loading with grey placeholder.
 * Mimics AMQ's current addBackgroundColor approach.
 * LCP = full image load time.
 */
export default function NoBlurImage({ src, alt, width, height, priority = false }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // Handle cached images that don't fire onLoad
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div
      className={styles.container}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className={`${styles.placeholder} ${loaded ? styles.placeholderHidden : ''}`}
      />
      <img
        ref={imgRef}
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
