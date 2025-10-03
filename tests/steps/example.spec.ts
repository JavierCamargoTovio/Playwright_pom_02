import { test, expect } from '@playwright/test';


test('Búsqueda en mercado libre', async ({ page }) => {

  await test.step('Navigate to mercadolibre.com', async () => {
    await page.goto('https://www.mercadolibre.com.co/');
  });

  await test.step('Search for a product', async () => {
    await page.getByRole('combobox', {name: 'Ingresa lo que quieras encontrar'}).click();
    await page.getByRole('combobox', {name: 'Ingresa lo que quieras encontrar'}).fill('iPhone 14');
    await page.getByRole('combobox', {name: 'Ingresa lo que quieras encontrar', exact: true}).press('Enter');
  });

  await test.step('Verify search results', async () => {
    await expect(page.locator("//li[@class='ui-search-layout__item']/..")).toBeVisible();
    const productos = await page.locator("//ol[contains(@class, 'ui-search-layout')]//li//h3").allInnerTexts();

    console.log(`Se encontraron ${productos.length} productos.`);

    for (const producto of productos) {
      console.log(producto);
    }
    
  });

});

