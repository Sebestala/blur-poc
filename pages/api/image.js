/**
 * Image proxy with artificial delay for speed simulation.
 *
 * Usage: /api/image?url=<encoded_scene7_url>&delay=<ms>
 *
 * Only the full-quality image goes through this proxy (with delay).
 * Blur placeholders load directly from Scene7 (no delay).
 */

export default async function handler(req, res) {
  const { url, delay = '0' } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Only allow Scene7 URLs
  if (!url.startsWith('https://assets.burberry.com/')) {
    return res.status(403).json({ error: 'Only Burberry Scene7 URLs are allowed' });
  }

  try {
    const delayMs = parseInt(delay, 10) || 0;

    // Artificial delay to simulate slow network
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch image' });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('X-Simulated-Delay', `${delayMs}ms`);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('Image proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const config = {
  api: {
    responseLimit: '10mb',
  },
};
