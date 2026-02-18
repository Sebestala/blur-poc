import Image from 'next/image';
import styles from './DemoImage.module.css';

/**
 * S2 - Native Next.js Blur: Uses next/image placeholder="blur".
 * blurDataURL is a ~10px base64 image (too small for LCP).
 * LCP = full image load time (same as S1), but UX is better.
 * Only works in Next.js - not applicable for SFCC (BV, BAL).
 */
export default function NativeBlurImage({
  src,
  blurDataURL,
  alt,
  width,
  height,
  priority = false,
}) {
  return (
    <div
      className={styles.container}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={blurDataURL}
        priority={priority}
        className={styles.nativeImage}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      />
    </div>
  );
}
