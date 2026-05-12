import { chromium } from 'playwright';

export interface ElectionResult {
  party: string;
  won: number;
  leading: number;
  total: number;
  previousTotal: number;
}

// Dummy data for initial UI development
const DUMMY_DATA: Record<string, ElectionResult[]> = {
  'live': [
    { party: 'NDA', won: 280, leading: 13, total: 293, previousTotal: 353 },
    { party: 'I.N.D.I.A', won: 220, leading: 12, total: 232, previousTotal: 91 },
    { party: 'Others', won: 15, leading: 3, total: 18, previousTotal: 99 },
  ],
  '2024': [
    { party: 'NDA', won: 293, leading: 0, total: 293, previousTotal: 353 },
    { party: 'I.N.D.I.A', won: 232, leading: 0, total: 232, previousTotal: 91 },
    { party: 'Others', won: 18, leading: 0, total: 18, previousTotal: 99 },
  ],
  '2019': [
    { party: 'NDA', won: 353, leading: 0, total: 353, previousTotal: 336 },
    { party: 'I.N.D.I.A', won: 91, leading: 0, total: 91, previousTotal: 60 },
    { party: 'Others', won: 99, leading: 0, total: 99, previousTotal: 147 },
  ]
};

export async function scrapeECIResults(stateCode: string = 'S03', year: string = 'live', useDummy: boolean = true): Promise<ElectionResult[]> {
  if (useDummy) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    return DUMMY_DATA[year] || DUMMY_DATA['live'];
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // URL format based on May 2026 ECI structure
  const url = `https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-${stateCode}.htm`;

  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for the specific results table to load
    await page.waitForSelector('.table-responsive');

    const results = await page.$$eval('table tbody tr.statistics', (rows) => {
      return rows.map((row) => {
        const cols = row.querySelectorAll('td');
        return {
          party: cols[0]?.innerText.trim() || 'Unknown',
          won: parseInt(cols[1]?.innerText.trim() || '0', 10),
          leading: parseInt(cols[2]?.innerText.trim() || '0', 10),
          total: parseInt(cols[3]?.innerText.trim() || '0', 10),
          previousTotal: 0, // Mock fallback for actual scraped data until historical API is mapped
        };
      });
    });

    await browser.close();
    return results.filter(r => r.party !== 'Total');
  } catch (error) {
    await browser.close();
    console.error(`Scraping failed: ${error}. Falling back to dummy data.`);
    return DUMMY_DATA[year] || DUMMY_DATA['live'];
  }
}
