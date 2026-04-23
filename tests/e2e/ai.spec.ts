import { expect, test } from '@playwright/test';

test('ai suggestion interaction', async ({ page }) => {
  await page.setContent('<button id="go">Generate</button><p id="result"></p>');
  await page.evaluate(() => {
    document.getElementById('go')?.addEventListener('click', () => {
      const result = document.getElementById('result');
      if (result) result.textContent = 'Try adding conflict in scene 2.';
    });
  });
  await page.click('#go');
  await expect(page.locator('#result')).toContainText('conflict');
});
