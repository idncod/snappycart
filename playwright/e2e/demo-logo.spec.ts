import { test, expect } from '@playwright/test'

test.describe('Verifing Logo behavier in Demo', () => {

    test('Clicking Logo returns Home Page from each nav link in Demo', async ({ page }) => {

        await page.goto("/")

        const links = [
            { testId: 'nav-link-quickstart', expected: /\/#quickstart/ },
            { testId: 'nav-link-use-cases', expected: /\/#use-cases/ },
            { testId: 'nav-link-demo-shop', expected: /\/#demo-shop/ }
        ];
        const logoLink = page.getByTestId('site-logo-link')

        for (const link of links) {
            await page.getByTestId(link.testId).click()
            await expect(page).toHaveURL(link.expected)
            await logoLink.click()
            await expect(page).toHaveURL(/\/$/);
            await expect(page.getByRole('heading', {name: 'snappycart'})).toBeVisible()

        }
    });
})