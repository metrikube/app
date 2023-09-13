import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('banner').getByRole('button', { name: 'Ajouter un widget' }).click();
  await page.getByRole('button', { name: 'Ajouter un widget' }).nth(1).click();
});