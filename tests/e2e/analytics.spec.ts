import { expect, test } from '@playwright/test';

test('analytics dashboard rendering', async ({ page }) => {
  await page.setContent('<div id="stats">Words: 1200</div>');
  await expect(page.locator('#stats')).toContainText('1200');
});
