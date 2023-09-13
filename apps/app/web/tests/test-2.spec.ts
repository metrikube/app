import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByRole('button', { name: 'Ajouter un widget' }).nth(1).click()
  await page
    .locator('div')
    .filter({
      hasText: 'Ajouter un widget'
    })
    
  await page.locator('h2').getByRole('button').click()
  await page.getByRole('banner').getByRole('button', { name: 'Ajouter un widget' }).click()
  await page.getByLabel('Ajouter un widget').getByText('Ajouter un widget').click()
  await page.locator('h2').getByRole('button').click()
  await page.getByRole('banner').getByRole('button', { name: 'Ajouter un widget' }).click()
  await page.locator('h2', { hasText: 'Ajouter un widget' })
  
})
