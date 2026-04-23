import { expect, test } from '@playwright/test';

test('manual save simulation', async ({ page }) => {
  await page.setContent('<button id="save">Save</button><div id="status"></div>');
  await page.evaluate(() => {
    document.getElementById('save')?.addEventListener('click', () => {
      const status = document.getElementById('status');
      if (status) status.textContent = 'saved';
    });
  });
  await page.click('#save');
  await expect(page.locator('#status')).toHaveText('saved');
});
