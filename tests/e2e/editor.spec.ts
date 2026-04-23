import { expect, test } from '@playwright/test';

test('basic text input workflow', async ({ page }) => {
  await page.setContent('<textarea aria-label="editor"></textarea>');
  await page.getByLabel('editor').fill('Hello Writan');
  await expect(page.getByLabel('editor')).toHaveValue('Hello Writan');
});
