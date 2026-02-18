/**
 * Transition definitions for S3 (Custom Blur -> Full image)
 */

export const TRANSITIONS = {
  instant: {
    label: 'Instant',
    description: 'No transition, immediate swap',
  },
  fadeIn: {
    label: 'Fade In',
    description: 'Opacity transition (0.5s)',
  },
  blurToSharp: {
    label: 'Blur to Sharp',
    description: 'CSS blur filter decreasing (0.8s)',
  },
  crossFade: {
    label: 'Cross-fade',
    description: 'Blur fades out as sharp fades in (0.6s)',
  },
};

export const TRANSITION_KEYS = Object.keys(TRANSITIONS);

export const DEFAULT_TRANSITION = 'fadeIn';
