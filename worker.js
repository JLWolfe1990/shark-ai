// Cloudflare Worker serving the Sharke static site from the existing Civo object store.
const CIVO_BASE = 'https://objectstore.nyc1.civo.com/j-cubed/shark-ai';
const DEPLOY_VERSION = '2026-07-23.1';

const CONTENT_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

function contentType(pathname) {
  const dot = pathname.lastIndexOf('.');
  return dot === -1 ? 'application/octet-stream' : CONTENT_TYPES[pathname.slice(dot)] || 'application/octet-stream';
}

function objectPath(pathname) {
  if (pathname === '/' || !pathname.includes('.')) return '/index.html';
  return pathname;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = objectPath(url.pathname);
    const upstream = await fetch(`${CIVO_BASE}${path}`, {
      headers: { 'accept-encoding': request.headers.get('accept-encoding') || '' },
    });

    if (!upstream.ok && path !== '/index.html') {
      return new Response('Not found', { status: 404 });
    }

    const headers = new Headers(upstream.headers);
    headers.set('content-type', contentType(path));
    headers.set('x-shark-deploy', DEPLOY_VERSION);
    headers.set('x-content-type-options', 'nosniff');
    headers.set('referrer-policy', 'strict-origin-when-cross-origin');
    headers.set(
      'cache-control',
      path === '/index.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=31536000, immutable',
    );

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  },
};
