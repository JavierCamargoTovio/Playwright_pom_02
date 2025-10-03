import { Locator, Page } from '@playwright/test';

export class AgradecimientoPage {
  private readonly mensajeGracias: Locator;

  constructor(page: Page) {
    this.mensajeGracias = page.getByText('Thank you for your order!');
  }

  async verificarMensajeGracias() {
    const mensajeGracias = await this.mensajeGracias.innerText();
    console.log(`Mensaje de agradecimiento: ${mensajeGracias}`);
    return mensajeGracias;

  }
}