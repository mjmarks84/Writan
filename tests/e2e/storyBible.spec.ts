import { expect, test } from '@playwright/test';

test('story bible search workflow', async ({ page }) => {
  await page.setContent('<input aria-label="search" /><ul><li>Hero</li><li>Mentor</li></ul>');
  await page.getByLabel('search').fill('Hero');
  await expect(page.getByText('Hero')).toBeVisible();
});
