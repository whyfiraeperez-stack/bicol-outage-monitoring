// Vercel serverless proxy: reads the DATABASE tab as CSV (avoids browser CORS limits).
// Sheet must be shared as "Anyone with the link – Viewer" (or published to web).
const ID = process.env.SHEET_ID || '1yhtm8pTJ9VP0TUrFm2JedYoCZ_M22K196luw3u9Xl4s';
const TAB = process.env.SHEET_TAB || 'DATABASE';
export default async function handler(req, res) {
  const url = `https://docs.google.com/spreadsheets/d/${ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(TAB)}&_=${Date.now()}`;
  try {
    const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
    const t = await r.text();
    if (!r.ok || t.trim().startsWith('<')) throw new Error('Sheet not accessible - set sharing to "Anyone with the link"');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate=30');
    res.status(200).send(t);
  } catch (e) { res.status(502).json({ error: String(e.message || e) }); }
}
