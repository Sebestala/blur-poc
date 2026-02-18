/**
 * Burberry Scene7 image configuration and URL builders.
 * Scene7 supports: ?wid=, ?qlt=, ?fmt= (webp, avif, jpeg, png)
 */

const SCENE7_BASE = 'https://assets.burberry.com/is/image/Burberryltd';

// Verified Burberry Scene7 UUIDs - colorful, high-contrast images
const IMAGES = {
  // Hero banners - campaign images with rich colors
  hero1: {
    uuid: '835FBBD9-CAC8-4FB8-A326-F25BE2EBA9E1',
    aspectRatio: 16 / 9,
    label: 'Summer Campaign - Trench Rose',
  },
  hero2: {
    uuid: 'E70C8469-FA84-47A4-94E5-9576FDB17627',
    aspectRatio: 3 / 2,
    label: 'Rider Bag Campaign',
  },

  // PLP products - on-model images (mannequin) with strong contrast
  plpProduct1: {
    uuid: '62746BFB-8783-43F3-A6CF-61D94CAA4585',
    aspectRatio: 383 / 536,
    label: 'EKD Sweater - Vert Tent',
    name: 'EKD Wool Cashmere Sweater',
    price: '890',
  },
  plpProduct2: {
    uuid: 'EF09C5B5-9EE3-48F2-90BF-7B3BA35D1E56',
    aspectRatio: 383 / 536,
    label: 'EKD Sweater - Rouge Box',
    name: 'EKD Wool Cashmere Sweater',
    price: '890',
  },
  plpProduct3: {
    uuid: 'CA542355-88D8-4A11-81C8-B98AD9714B16',
    aspectRatio: 383 / 536,
    label: 'Cardigan Rose Mallow',
    name: 'EKD Cotton Wool Cardigan',
    price: '750',
  },
  plpProduct4: {
    uuid: 'B28AB84E-A263-4D07-A018-9E270F128738',
    aspectRatio: 383 / 536,
    label: 'EKD Sweater - Noir',
    name: 'EKD Wool Cashmere Sweater',
    price: '890',
  },
  plpProduct5: {
    uuid: '9A2A2E62-A3E1-4151-9A47-68FCBF50753D',
    aspectRatio: 4 / 5,
    label: 'Robe Check',
    name: 'Check Cotton Dress',
    price: '1,290',
  },
  plpProduct6: {
    uuid: '400014D8-5EDB-474C-BA19-D75CE0A42587',
    aspectRatio: 4 / 5,
    label: 'Chemise Check',
    name: 'Check Cotton Shirt',
    price: '690',
  },
  plpProduct7: {
    uuid: '63FFF8EF-7E37-4006-A0E1-C1D20B84C683',
    aspectRatio: 4 / 5,
    label: 'Mini Sac Bowling Check',
    name: 'Mini Bowling Bag in Check',
    price: '1,590',
  },
  plpProduct8: {
    uuid: 'C328FDD7-A9CD-4BA1-838A-9873074A0F93',
    aspectRatio: 4 / 5,
    label: 'Grand Sac Horseshoe',
    name: 'Large Horseshoe Bag',
    price: '2,490',
  },

  // PDP main image - on-model with strong visual
  pdpMain: {
    uuid: '62746BFB-8783-43F3-A6CF-61D94CAA4585',
    aspectRatio: 383 / 536,
    label: 'EKD Sweater - Main View',
  },
  // PDP additional gallery images
  pdpGallery1: {
    uuid: '2B71F72D-C6C8-4636-9A9E-58AF922F635C',
    aspectRatio: 383 / 536,
    label: 'EKD Sweater - Flat',
  },
  // PDP thumbnails
  pdpThumb1: {
    uuid: 'EF09C5B5-9EE3-48F2-90BF-7B3BA35D1E56',
    aspectRatio: 1,
    label: 'Color Variant - Rouge',
  },
  pdpThumb2: {
    uuid: 'B28AB84E-A263-4D07-A018-9E270F128738',
    aspectRatio: 1,
    label: 'Color Variant - Noir',
  },
  pdpThumb3: {
    uuid: 'CA542355-88D8-4A11-81C8-B98AD9714B16',
    aspectRatio: 1,
    label: 'Color Variant - Rose',
  },
  pdpThumb4: {
    uuid: 'AED3244B-6F4D-4267-A79B-79A83897F497',
    aspectRatio: 1,
    label: 'Color Variant - Other',
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
  return `${SCENE7_BASE}/${uuid}?wid=40&qlt=15&fmt=jpeg`;
}

/**
 * Get image configuration for a given template
 */
function getImageConfig(template) {
  switch (template) {
    case 'hero':
      return {
        images: [IMAGES.hero1, IMAGES.hero2],
        displayWidth: { desktop: 1440, tablet: 900, mobile: 390 },
        displayHeight: { desktop: 600, tablet: 400, mobile: 300 },
      };
    case 'plp':
      return {
        images: [
          IMAGES.plpProduct1, IMAGES.plpProduct2, IMAGES.plpProduct3, IMAGES.plpProduct4,
          IMAGES.plpProduct5, IMAGES.plpProduct6, IMAGES.plpProduct7, IMAGES.plpProduct8,
        ],
        displayWidth: { desktop: 350, tablet: 280, mobile: 185 },
        displayHeight: { desktop: 490, tablet: 392, mobile: 259 },
      };
    case 'pdp':
      return {
        images: [IMAGES.pdpMain, IMAGES.pdpGallery1],
        thumbnails: [IMAGES.pdpThumb1, IMAGES.pdpThumb2, IMAGES.pdpThumb3, IMAGES.pdpThumb4],
        displayWidth: { desktop: 700, tablet: 500, mobile: 390 },
        displayHeight: { desktop: 980, tablet: 700, mobile: 546 },
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
