import { useState, useEffect, useRef } from 'react';
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
  const [phase, setPhase] = useState('blur'); // 'blur' | 'transitioning' | 'done'
  const blurRef = useRef(null);

  // Preload the full image
  useEffect(() => {
    if (!fullSrc) return;
    const img = new window.Image();
    img.onload = () => setLoaded(true);
    img.src = fullSrc;
  }, [fullSrc]);

  // Handle transition phases when loaded
  useEffect(() => {
    if (!loaded) return;

    if (transition === 'instant') {
      setPhase('done');
    } else if (transition === 'blurToSharp') {
      // Phase 1: deblur the blur layer
      setPhase('transitioning');
      // Phase 2: after deblur completes, swap to full image
      const timer = setTimeout(() => setPhase('done'), 900);
      return () => clearTimeout(timer);
    } else {
      // fadeIn, crossFade: start transition immediately
      setPhase('done');
    }
  }, [loaded, transition]);

  const transitionClass = styles[`transition_${transition}`] || styles.transition_fadeIn;

  // Determine layer states based on phase
  const blurHidden = phase === 'done';
  const blurDeblurring = phase === 'transitioning';
  const fullVisible = phase === 'done' || (transition === 'crossFade' && loaded);

  const blurClasses = [
    styles.blurLayer,
    transitionClass,
    blurHidden ? styles.blurLayerHidden : '',
    blurDeblurring ? styles.blurLayerDeblur : '',
  ].filter(Boolean).join(' ');

  const fullClasses = [
    styles.fullLayer,
    transitionClass,
    fullVisible ? styles.fullLayerVisible : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={styles.container}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {/* Layer 1: Blur placeholder (LCP candidate) */}
      <img
        ref={blurRef}
        src={blurSrc}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        className={blurClasses}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
      />

      {/* Layer 2: Full quality image */}
      <img
        src={fullSrc}
        alt={alt || ''}
        width={width}
        height={height}
        className={fullClasses}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}
