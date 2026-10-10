/**
 * Export /print to PDF and PNG via Playwright (no browser print dialog).
 */
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'exports');
const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const HOME_URL = `${BASE_URL}/`;

const PDF_FILE = path.join(OUT_DIR, 'Norkina_Valeriya_portfolio.pdf');
const PNG_FILE = path.join(OUT_DIR, 'Norkina_Valeriya_portfolio.png');

function run(cmd, args, cwd = ROOT) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      cwd,
      shell: true,
      stdio: 'inherit',
    });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(' ')} exited with ${code}`));
    });
    child.on('error', reject);
  });
}

async function waitForServer(url, timeoutMs = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      /* server starting */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server did not respond within ${timeoutMs / 1000}s: ${url}`);
}

function startPreview() {
  return spawn(
    'npx',
    ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    { cwd: ROOT, shell: true, stdio: 'pipe' }
  );
}

async function exportAssets() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log('→ Building project…');
  await run('npm', ['run', 'build']);

  console.log('→ Starting preview server…');
  const preview = startPreview();

  try {
    await waitForServer(BASE_URL);
    console.log('→ Playwright: opening print version…');

    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 794, height: 1123 },
      deviceScaleFactor: 2,
    });
    const A4_WIDTH_PX = 794;
    const A4_HEIGHT_PX = 1123;
    const page = await context.newPage();

    // base: './' — hitting /print directly breaks assets; load home, then React Router
    await page.goto(HOME_URL, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForSelector('.topbar, .hero', { timeout: 20000 });
    await page.evaluate(() => {
      window.history.pushState({}, '', '/print');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    await page.waitForSelector('.print-doc', { timeout: 20000 });
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(800);

    await page.addStyleTag({
      content: '.print-toolbar, .no-print { display: none !important; }',
    });

    await page.emulateMedia({ media: 'print' });

    console.log('→ Saving PDF…');
    await page.pdf({
      path: PDF_FILE,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      scale: 1,
    });

    await page.emulateMedia({ media: 'screen' });

    console.log('→ Saving PNG (one A4 sheet)…');
    const doc = page.locator('.print-doc--a4');
    await doc.screenshot({
      path: PNG_FILE,
      type: 'png',
      animations: 'disabled',
      clip: { x: 0, y: 0, width: A4_WIDTH_PX, height: A4_HEIGHT_PX },
    });

    await browser.close();

    const marketingDir = path.join(ROOT, '..');
    const pdfCopy = path.join(marketingDir, 'Norkina_Valeriya_portfolio.pdf');
    const pngCopy = path.join(marketingDir, 'Norkina_Valeriya_portfolio.png');
    fs.copyFileSync(PDF_FILE, pdfCopy);
    fs.copyFileSync(PNG_FILE, pngCopy);

    console.log('\n✓ Done:');
    console.log('  PDF:', PDF_FILE);
    console.log('  PNG:', PNG_FILE);
    console.log('  PDF (copy):', pdfCopy);
    console.log('  PNG (copy):', pngCopy);
  } finally {
    preview.kill('SIGTERM');
    if (process.platform === 'win32') {
      try {
        spawn('taskkill', ['/pid', String(preview.pid), '/f', '/t'], { shell: true });
      } catch {
        /* ignore */
      }
    }
  }
}

exportAssets().catch((err) => {
  console.error(err);
  process.exit(1);
});
