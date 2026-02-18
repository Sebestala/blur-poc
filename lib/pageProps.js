import { buildImageUrl, buildBlurUrl, buildTinyBlurUrl, getImageConfig, SPEED_CONFIG } from './images';

/**
 * Fetch a small image and return it as a base64 data URI.
 * Used for S2 native-blur blurDataURL generation at build time.
 */
async function fetchAsBase64(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buffer = await res.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const contentType = res.headers.get('content-type') || 'image/jpeg';
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  }
}

/**
 * Shared getServerSideProps builder for all demo pages.
 * Builds the correct image URLs based on template, solution, and speed.
 */
export function buildDemoProps(template, solution) {
  return async function getServerSideProps({ query }) {
    const speed = query.speed || 'fast';
    const transition = query.transition || 'fadeIn';
    const delay = SPEED_CONFIG[speed]?.delay || 0;
    const config = getImageConfig(template);

    // Build image URLs for each image in the config
    const images = await Promise.all(config.images.map(async (img) => {
      const fullWidth = config.displayWidth.desktop;
      const fullUrl = buildImageUrl(img.uuid, { width: fullWidth, quality: 80 });
      const blurUrl = buildBlurUrl(img.uuid, { width: fullWidth, quality: 5 });
      const tinyBlurUrl = buildTinyBlurUrl(img.uuid);

      // For S2: fetch tiny blur and convert to base64 data URI
      const blurDataURL = solution === 'native-blur'
        ? await fetchAsBase64(tinyBlurUrl)
        : null;

      // For speed simulation: full image goes through proxy with delay
      const proxiedFullUrl = delay > 0
        ? `/api/image?url=${encodeURIComponent(fullUrl)}&delay=${delay}`
        : fullUrl;

      return {
        uuid: img.uuid,
        label: img.label,
        name: img.name || null,
        price: img.price || null,
        aspectRatio: img.aspectRatio,
        fullSrc: proxiedFullUrl,
        directFullSrc: fullUrl,
        blurSrc: blurUrl,
        tinyBlurUrl,
        blurDataURL,
        width: config.displayWidth.desktop,
        height: config.displayHeight.desktop,
      };
    }));

    // Thumbnails for PDP
    const thumbnails = config.thumbnails
      ? config.thumbnails.map((img) => ({
          uuid: img.uuid,
          fullSrc: buildImageUrl(img.uuid, { width: 200, quality: 80 }),
          width: 200,
          height: 200,
        }))
      : [];

    return {
      props: {
        template,
        solution,
        speed,
        transition,
        delay,
        images,
        thumbnails,
      },
    };
  };
}
