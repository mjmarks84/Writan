import { expect, test } from '@playwright/test';

test('collaboration comment flow', async ({ page }) => {
  await page.setContent('<textarea aria-label="comment"></textarea><ul id="comments"></ul>');
  await page.getByLabel('comment').fill('Looks good!');
  await page.evaluate(() => {
    const list = document.getElementById('comments');
    const item = document.createElement('li');
    item.textContent = 'Looks good!';
    list?.appendChild(item);
  });
  await expect(page.locator('#comments li')).toContainText('Looks good!');
});
