import { pluginsMock } from '@metrikube/core'
import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200')
})

test.describe('Feature: Widget installation', async () => {
  const openModal = async (page: Page) => {
    await page.getByRole('button', { name: 'Ajouter un widget' }).click()
    await expect(page.getByRole('heading', { name: 'Ajouter un widget' })).toBeVisible()
  }

  const step1 = async (page: Page) => {
    await expect(page.getByLabel('Vous devez choisir un plugin')).toBeVisible()
    const step1Button = page.getByRole('button', { name: 'Choix du plugin' })
    await expect(step1Button).toBeVisible()
    await step1Button.click()
    const apiPluginButton = page.getByRole('button', { name: 'API Health Check' })
    await expect(apiPluginButton).toBeVisible()
    await apiPluginButton.click()
    const nextStepButton = page.getByRole('button', { name: 'Suivant' })
    await expect(nextStepButton).toBeEnabled()
    await nextStepButton.click()
  }

  test('Open modal when add widget button was clicked', async ({ page }) => {
    await openModal(page)
  })

  //   test.describe()

  test('Step 1 - Choose an plugin', async ({ page }) => {
    const json = pluginsMock
    await page.route('*/**/api/v1/plugins', async (route) => {
      await route.fulfill({ json })
    })
    await openModal(page)
    await step1(page)
  })
})
