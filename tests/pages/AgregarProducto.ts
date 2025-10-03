import { Locator, Page } from '@playwright/test';

export class AgregarProducto {
    private readonly productos: Locator;
    public readonly buttonAddToCart: Locator;
    private nombreProducto: string = '';
    private descripcionProducto: string = '';
    private precioProducto: string = '';

    constructor(page: Page) {
        this.productos = page.locator('.inventory_list .inventory_item');
        this.nombreProducto = '';
        this.descripcionProducto = '';
        this.precioProducto = '';
        this.buttonAddToCart = page.locator('#shopping_cart_container');
    }

    async AgregarProductoCarrito() {
        const productos = await this.productos.all();
        const randomIndex = Math.floor(Math.random() * productos.length);
        const productoSeleccionado = productos[randomIndex];


        // Extraigo la info del producto seleccionado
        this.nombreProducto = await productoSeleccionado.locator('.inventory_item_name').innerText();
        this.descripcionProducto = await productoSeleccionado.locator('.inventory_item_desc').innerText();
        this.precioProducto = await productoSeleccionado.locator('.inventory_item_price').innerText();

        console.log(`Producto seleccionado: ${this.nombreProducto}`);
        console.log(`Descripción: ${this.descripcionProducto}`);
        console.log(`Precio: ${this.precioProducto}`);

        // Agrego al carrito
        await productoSeleccionado.getByRole('button', { name: 'Add to cart', exact: true }).click();
        await this.buttonAddToCart.click();
    }

    // ✅ Métodos para exponer los datos del producto
    getNombreProducto() {
        return this.nombreProducto;
    }

    getDescripcionProducto() {
        return this.descripcionProducto;
    }

    getPrecioProducto() {
        return this.precioProducto;
    }


}