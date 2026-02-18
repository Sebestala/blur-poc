import { useState, useEffect } from 'react';
import styles from './DemoImage.module.css';

/**
 * S3 - Custom Blur: Two-layer approach.
 * Layer 1: Low-quality full-size placeholder with CSS blur (IS the LCP element).
 * Layer 2: Full-quality image, revealed via transition when loaded.
 *
 * LCP = blur placeholder load time (~90% smaller than full image).
 * Works on ALL platforms (Next.js + SFCC) - uses plain <img> tags.
 */
export default function CustomBlurImage({
  fullSrc,
  blurSrc,
  alt,
  width,
  height,
  priority = false,
  transition = 'fadeIn',
}) {
  const [loaded, setLoaded] = useState(false);

  // Preload the full image
  useEffect(() => {
    if (!fullSrc) return;
    const img = new window.Image();
    img.onload = () => setLoaded(true);
    img.src = fullSrc;
  }, [fullSrc]);

  const transitionClass = styles[`transition_${transition}`] || styles.transition_fadeIn;

  return (
    <div
      className={styles.container}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* Layer 1: Blur placeholder (LCP candidate) */}
      <img
        src={blurSrc}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        className={`${styles.blurLayer} ${loaded ? styles.blurLayerHidden : ''} ${transitionClass}`}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
      />

      {/* Layer 2: Full quality image */}
      <img
        src={fullSrc}
        alt={alt || ''}
        width={width}
        height={height}
        className={`${styles.fullLayer} ${loaded ? styles.fullLayerVisible : ''} ${transitionClass}`}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}
