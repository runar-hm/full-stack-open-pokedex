const { test, describe, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:8080';

describe('Pokedex', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page.getByText('ivysaur')).toBeVisible();
    await expect(
      page.getByText(
        'Pokémon and Pokémon character names are trademarks of Nintendo.'
      )
    ).toBeVisible();
  });

  test('navigates to pokemon page', async ({ page }) => {
    await page.goto(baseUrl);
    await page.getByText('ivysaur').click();
    await expect(page.getByText('Chlorophyll')).toBeVisible();
  });
});
