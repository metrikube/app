import { pluginsMock } from "@metrikube/core"
import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
})

test.describe('Widget installation', async () => {
  test.describe('Start the installation by clicking on add widget button', async () => {
    test('Add widget button in header', async ({ page }) => {
      await page.route('*/**/api/v1/plugins', async route => {
        const json = pluginsMock;
        await route.fulfill({ json });
      });
      const setupWidgetButton = page.getByRole('button', { name: 'Ajouter un widget' })
      await setupWidgetButton.click()
  })
})
