import { buildImageUrl, buildBlurUrl, buildTinyBlurUrl, getImageConfig, SPEED_CONFIG } from './images';

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
    const images = config.images.map((img) => {
      const fullWidth = config.displayWidth.desktop;
      const fullUrl = buildImageUrl(img.uuid, { width: fullWidth, quality: 80 });
      const blurUrl = buildBlurUrl(img.uuid, { width: fullWidth, quality: 5 });
      const tinyBlurUrl = buildTinyBlurUrl(img.uuid);

      // For speed simulation: full image goes through proxy with delay
      const proxiedFullUrl = delay > 0
        ? `/api/image?url=${encodeURIComponent(fullUrl)}&delay=${delay}`
        : fullUrl;

      return {
        uuid: img.uuid,
        label: img.label,
        aspectRatio: img.aspectRatio,
        fullSrc: proxiedFullUrl,
        directFullSrc: fullUrl,
        blurSrc: blurUrl,
        tinyBlurUrl,
        width: config.displayWidth.desktop,
        height: config.displayHeight.desktop,
      };
    });

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
