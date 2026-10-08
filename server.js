'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;
// Canonical host: https://www.2fauth.online  (the bare domain is redirected to it)
const BARE_HOST = '2fauth.online';
const CANONICAL_HOST = '2fauth.online';

// clean URL -> file
const PAGES = {
  '/': 'index.html',
  '/guide': 'guide.html',
  '/what-is-2fa': 'what-is-2fa.html',
  '/2fa-key': '2fa-key.html',
  '/what-is-totp': 'what-is-totp.html',
  '/2fa-secret-key-to-code': '2fa-secret-key-to-code.html',
  '/security': 'security.html',
  '/privacy-policy': 'privacy.html',
  '/about': 'about.html',
  '/contact': 'contact.html',
  '/disclaimer': 'disclaimer.html',
  '/terms': 'terms.html'
};
// old URL -> clean URL (301)
const LEGACY = {
  '/index.html': '/',
  '/guide-video': '/guide',
  '/guide.html': '/guide',
  '/privacy.html': '/privacy-policy',
  '/about.html': '/about',
  '/contact.html': '/contact',
  '/disclaimer.html': '/disclaimer',
  '/terms.html': '/terms',
  '/what-is-2fa.html': '/what-is-2fa',
  '/2fa-key.html': '/2fa-key',
  '/what-is-totp.html': '/what-is-totp',
  '/2fa-secret-key-to-code.html': '/2fa-secret-key-to-code',
  '/security.html': '/security'
};
const ROOT_FILES = {
  '/robots.txt': 'robots.txt',
  '/sitemap.xml': 'sitemap.xml',
  '/favicon.ico': 'favicon.ico',
  '/site.webmanifest': 'site.webmanifest'
};

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.webp': 'image/webp',
  '.webmanifest': 'application/manifest+json; charset=utf-8'
};
const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.txt', '.xml', '.svg', '.webmanifest']);

// Security headers. camera=(self) is needed for the QR scanner.
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(self), microphone=(), geolocation=()'
};

function redirect(res, location) {
  res.writeHead(301, { Location: location, 'Cache-Control': 'public, max-age=3600' });
  res.end();
}

function cacheControl(file) {
  if (file.startsWith(path.join(ROOT, 'assets') + path.sep)) return 'public, max-age=604800'; // files are versioned with ?v=
  if (path.extname(file) === '.html') return 'public, max-age=0, must-revalidate';
  return 'public, max-age=86400';
}

function send(req, res, file, status, https) {
  fs.readFile(file, (err, buf) => {
    if (err) { res.writeHead(500); return res.end('Server error'); }
    const ext = path.extname(file);
    const headers = Object.assign({
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': cacheControl(file),
      'Vary': 'Accept-Encoding'
    }, SECURITY_HEADERS);
    if (https) headers['Strict-Transport-Security'] = 'max-age=31536000';
    if (status === 404) headers['Cache-Control'] = 'no-cache';
    const ae = String(req.headers['accept-encoding'] || '');
    if (COMPRESSIBLE.has(ext) && buf.length > 512 && /\bgzip\b/.test(ae)) {
      buf = zlib.gzipSync(buf, { level: 9 });
      headers['Content-Encoding'] = 'gzip';
    }
    headers['Content-Length'] = buf.length;
    res.writeHead(status || 200, headers);
    res.end(req.method === 'HEAD' ? undefined : buf);
  });
}

http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end();
  }
  const u = new URL(req.url, 'http://x');
  const host = (req.headers.host || '').toLowerCase().split(':')[0];
  const proto = String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim();
  const https = proto === 'https';
  const notFound = () => send(req, res, path.join(ROOT, '404.html'), 404, https);
  let p;
  try { p = decodeURIComponent(u.pathname); } catch (e) { return notFound(); }
  const search = u.search || '';


  // /assets/*
  if (p.startsWith('/assets/')) {
    const file = path.normalize(path.join(ROOT, p));
    if (!file.startsWith(path.join(ROOT, 'assets') + path.sep)) return notFound();
    return fs.stat(file, (err, st) => (err || !st.isFile()) ? notFound() : send(req, res, file, 200, https));
  }
  if (ROOT_FILES[p]) return send(req, res, path.join(ROOT, ROOT_FILES[p]), 200, https);

  // old .html URLs
  if (LEGACY[p]) return redirect(res, LEGACY[p] + search);

  // trailing slash / different case -> clean lowercase URL
  let clean = p.length > 1 ? p.replace(/\/+$/, '') : p;
  clean = clean.toLowerCase();
  if (PAGES[clean]) {
    if (clean !== p) return redirect(res, clean + search);
    return send(req, res, path.join(ROOT, PAGES[clean]), 200, https);
  }
  notFound();
}).listen(PORT, () => console.log('Listening on ' + PORT));
