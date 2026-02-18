/**
 * Burberry Scene7 image configuration and URL builders.
 * Scene7 supports: ?wid=, ?qlt=, ?fmt= (webp, avif, jpeg, png)
 */

const SCENE7_BASE = 'https://assets.burberry.com/is/image/Burberryltd';

// Verified Burberry Scene7 UUIDs
const IMAGES = {
  hero: {
    uuid: 'FFC91567-2EDE-4AE6-8572-B63899401876',
    aspectRatio: 16 / 9,
    label: 'Hero Banner',
  },
  plpProduct1: {
    uuid: '49682177-644E-48B6-A036-29A44111D534',
    aspectRatio: 4 / 5,
    label: 'Product 1',
  },
  plpProduct2: {
    uuid: '26A2C9D0-A0E5-4876-AFC8-DA254B22BA01',
    aspectRatio: 4 / 5,
    label: 'Product 2',
  },
  plpProduct3: {
    uuid: '9DB1C2E6-2F75-4CAA-9195-8170C131B94E',
    aspectRatio: 4 / 5,
    label: 'Product 3',
  },
  plpProduct4: {
    uuid: 'BBB628FA-12D0-45DE-9539-B5FC3E3C1B13',
    aspectRatio: 4 / 5,
    label: 'Product 4',
  },
  pdpMain: {
    uuid: '26A2C9D0-A0E5-4876-AFC8-DA254B22BA01',
    aspectRatio: 3 / 4,
    label: 'PDP Main Image',
  },
  pdpThumb1: {
    uuid: '49682177-644E-48B6-A036-29A44111D534',
    aspectRatio: 1,
    label: 'PDP Thumbnail 1',
  },
  pdpThumb2: {
    uuid: '9DB1C2E6-2F75-4CAA-9195-8170C131B94E',
    aspectRatio: 1,
    label: 'PDP Thumbnail 2',
  },
};

/**
 * Build full quality image URL
 */
function buildImageUrl(uuid, { width = 1440, quality = 80, format = 'jpeg' } = {}) {
  return `${SCENE7_BASE}/${uuid}?wid=${width}&qlt=${quality}&fmt=${format}`;
}

/**
 * Build low-quality blur placeholder URL (for S3 - custom blur)
 * Full display width but very low quality -> small file, still LCP-eligible
 */
function buildBlurUrl(uuid, { width = 1440, quality = 5 } = {}) {
  return `${SCENE7_BASE}/${uuid}?wid=${width}&qlt=${quality}&fmt=jpeg`;
}

/**
 * Build tiny blur data URL for S2 (native Next.js blur)
 * 10px wide, very low quality -> ~300 bytes, base64 inlined
 * NOT LCP-eligible (too small, upscaling penalty)
 */
function buildTinyBlurUrl(uuid) {
  return `${SCENE7_BASE}/${uuid}?wid=10&qlt=10&fmt=jpeg`;
}

/**
 * Get image configuration for a given template
 */
function getImageConfig(template) {
  switch (template) {
    case 'hero':
      return {
        images: [IMAGES.hero],
        displayWidth: { desktop: 1440, tablet: 900, mobile: 390 },
        displayHeight: { desktop: 600, tablet: 400, mobile: 300 },
      };
    case 'plp':
      return {
        images: [IMAGES.plpProduct1, IMAGES.plpProduct2, IMAGES.plpProduct3, IMAGES.plpProduct4],
        displayWidth: { desktop: 350, tablet: 280, mobile: 185 },
        displayHeight: { desktop: 438, tablet: 350, mobile: 231 },
      };
    case 'pdp':
      return {
        images: [IMAGES.pdpMain],
        thumbnails: [IMAGES.pdpThumb1, IMAGES.pdpThumb2],
        displayWidth: { desktop: 700, tablet: 500, mobile: 390 },
        displayHeight: { desktop: 933, tablet: 667, mobile: 520 },
      };
    default:
      return getImageConfig('hero');
  }
}

const SPEED_CONFIG = {
  fast: { delay: 0, label: 'Fast (Fibre)' },
  '3g': { delay: 1500, label: '3G' },
  slow: { delay: 4000, label: 'Slow 3G' },
};

const SOLUTION_CONFIG = {
  'no-blur': { label: 'S1 - No Blur', slug: 'no-blur' },
  'native-blur': { label: 'S2 - Native Blur', slug: 'native-blur' },
  'custom-blur': { label: 'S3 - Custom Blur', slug: 'custom-blur' },
};

const TEMPLATE_CONFIG = {
  hero: { label: 'Hero Banner', path: 'hero' },
  plp: { label: 'PLP Grid', path: 'plp' },
  pdp: { label: 'PDP', path: 'pdp' },
};

module.exports = {
  IMAGES,
  SCENE7_BASE,
  SPEED_CONFIG,
  SOLUTION_CONFIG,
  TEMPLATE_CONFIG,
  buildImageUrl,
  buildBlurUrl,
  buildTinyBlurUrl,
  getImageConfig,
};
