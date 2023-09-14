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

  test.describe('Step 1 - Choose an plugin', () => {
    test('Should not go to next step whitout choose a plugin', async ({ page }) => {
      const json = pluginsMock
      await page.route('*/**/api/v1/plugins', async (route) => {
        await route.fulfill({ json })
      })
      await openModal(page)
      const tooltip = page.getByRole('tooltip', { name: 'Vous devez choisir un plugin' })

      const step1Button = page.getByRole('button', { name: 'Choix du plugin' })
      await expect(step1Button).toBeVisible()
      await step1Button.click()

      const nextStepButton = page.getByRole('button', { name: 'Suivant' })
      await expect(nextStepButton).toBeDisabled()
      const nextStepButtonPosition = await nextStepButton.boundingBox()
      if (nextStepButtonPosition) {
        await page.mouse.move(
          nextStepButtonPosition.x + nextStepButtonPosition.width / 2,
          nextStepButtonPosition.y + nextStepButtonPosition.height / 2
        )
      }
      await tooltip.hover()
      await expect(tooltip).toBeVisible()
    })

    test('Choose an plugin and go to next step', async ({ page }) => {
      // WHAT DIFFERENCES - https://playwright.dev/docs/mock#mock-api-requests
      // await page.route('*/**/api/v1/plugins', async (route) => {
      //   await route.fulfill({ json })
      // })
      await page.route('*/**/api/v1/plugins', async (route) => {
        const response = await route.fetch()
        const json = await response.json()
        // Fulfill using the original response, while patching the response body
        // with the given JSON object.
        await route.fulfill({ response, json })
      })
      await openModal(page)
      await step1(page)
    })
  })
})
