import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AgregarProducto } from '../pages/AgregarProducto';
import { FormularioCarrito } from '../pages/FormularioCarrito';
import { InformacionProducto } from '../pages/InformacionProducto';
import { AgradecimientoPage } from '../pages/AgradecimientoPage';
import { TextosEsperados } from '../utilidades/TextosEsperados';

test.describe('SauceDemo Login Tests', () => {

  let loginPage: LoginPage;
  let agregarProducto: AgregarProducto;
  let formularioCarrito: FormularioCarrito;
  let informacionProducto: InformacionProducto;
  let agradecimientoPage: AgradecimientoPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    agregarProducto = new AgregarProducto(page);
    formularioCarrito = new FormularioCarrito(page);
    informacionProducto = new InformacionProducto(page);
    agradecimientoPage = new AgradecimientoPage(page);
    await page.goto('https://www.saucedemo.com/', { waitUntil: 'domcontentloaded' });

  });

  test('Successful Login', async ({ page }) => {
    await test.step('Enter valid credentials', async () => {
      await loginPage.loginWithCredenciales('standard_user', 'secret_sauce');
    })

    await test.step('Verify successful login', async () => {
      await expect(page.getByText('Products')).toBeVisible();
    });

    await test.step('Seleccionar un producto', async () => {
      await agregarProducto.AgregarProductoCarrito();
    });

    await test.step('Verificar el carrito de compras', async () => {
      const { nombre, descripcion, precio } = await informacionProducto.verificarProductoEnCarrito();

      // Verificar que los datos del producto en el carrito coincidan con los del producto agregado
      expect(nombre).toEqual(agregarProducto.getNombreProducto());
      expect(descripcion).toEqual(agregarProducto.getDescripcionProducto());
      expect(precio).toEqual(agregarProducto.getPrecioProducto());

    });

    await test.step('Diligenciar formulario de las compras realizadas', async () => {
      await formularioCarrito.diligenciarFormulario('Juan', 'Perez', '12345');
    })

    await test.step('Verificar la página de agradecimiento', async () => {
      const mensajeGracias = await agradecimientoPage.verificarMensajeGracias();
      expect(mensajeGracias).toEqual(TextosEsperados.MENSAJE_ESPERADO);
    })
    
  });

});