
import { Locator, Page } from '@playwright/test';

export class InformacionProducto { 

  private readonly nombreProducto: Locator;
  private readonly descripcionProducto: Locator;
  private readonly precioProducto: Locator;

  constructor(page: Page) {
    this.nombreProducto = page.locator('.inventory_item_name');
    this.descripcionProducto = page.locator('.inventory_item_desc');
    this.precioProducto = page.locator('.inventory_item_price');
  }

 async verificarProductoEnCarrito() {
    await this.nombreProducto.isVisible();
    const nombre = await this.nombreProducto.innerText();
    console.log(`✅ Nombre del producto en el carrito: ${nombre}`);

    const descripcion = await this.descripcionProducto.innerText();
    console.log(`✅ Descripción del producto en el carrito: ${descripcion}`);

    const precio = await this.precioProducto.innerText();
    console.log(`✅ Precio del producto en el carrito: ${precio}`);

    return { nombre, descripcion, precio };
  }
}