import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.log('Sitemap not found, skipping IndexNow.');
  process.exit(0);
}

const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const urls = [];
const matches = sitemapContent.matchAll(/<loc>(https:\/\/www\.coinrates\.live\/[^<]*)<\/loc>/g);
for (const m of matches) {
  urls.push(m[1]);
}

console.log(`Found ${urls.length} URLs to submit to IndexNow.`);

const payload = JSON.stringify({
  host: 'www.coinrates.live',
  key: 'c01nrat3s8d9f4e2a1b7c5e3d2f10842',
  keyLocation: 'https://www.coinrates.live/c01nrat3s8d9f4e2a1b7c5e3d2f10842.txt',
  urlList: urls
});

const endpoints = [
  { host: 'api.indexnow.org', path: '/indexnow' },
  { host: 'www.bing.com', path: '/indexnow' }
];

endpoints.forEach(ep => {
  const req = https.request({
    hostname: ep.host,
    port: 443,
    path: ep.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, (res) => {
    console.log(`[IndexNow] ${ep.host} responded with status: ${res.statusCode}`);
  });

  req.on('error', (e) => {
    console.warn(`[IndexNow] Note: Network call to ${ep.host} failed (${e.message}). This will run in live CI/deployment.`);
  });

  req.write(payload);
  req.end();
});
