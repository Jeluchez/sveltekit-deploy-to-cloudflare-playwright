import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.route('*/**/api/getUser', async route => {
    const json = { name: 'Ana', email: 'ana@gmail.com', age:'32' };
    await route.fulfill({ json });
  });
  await page.goto('http://localhost:5173/');
  await expect(page.getByText('Ana', { exact: true })).toBeVisible();
});
test('should show post', async ({ page }) => {
  await page.routeFromHAR('tests/e2e/hars/posts.har', {
    url: '*/**/api/**/**',
    update: false,
  });
  await page.goto('http://localhost:5173/');

  await page.waitForResponse('http://localhost:5173/api/getPosts')

  await page.waitForSelector('.item', { state: 'visible' });

  const titleElement = page.locator('.item >> text=/titulo/i');

  const count = await titleElement.count();
  expect(count).toBeGreaterThan(0);
});