import { Locator, Page } from "@playwright/test";

export class FormularioCarrito {
  private readonly inputFirstName: Locator;
  private readonly inputLastName: Locator;
  private readonly inputPostalCode: Locator;
  private readonly buttonContinue: Locator;
  private readonly buttonFinish: Locator;
  private readonly buttonCheckout: Locator;

    constructor(page: Page) {
      this.inputFirstName = page.getByRole('textbox', { name: 'First Name', exact: true });
      this.inputLastName = page.getByRole('textbox', { name: 'Last Name', exact: true });
      this.inputPostalCode = page.getByRole('textbox', { name: 'Zip/Postal Code', exact: true });
      this.buttonContinue = page.getByRole('button', { name: 'Continue', exact: true });
      this.buttonFinish = page.getByRole('button', { name: 'Finish', exact: true });
      this.buttonCheckout = page.locator('#checkout');
    }

    async diligenciarFormulario(firstName: string, lastName: string, postalCode: string) {
       await this.buttonCheckout.click();
       await this.inputFirstName.fill(firstName);
       await this.inputLastName.fill(lastName);
       await this.inputPostalCode.fill(postalCode);
       await this.buttonContinue.click();
       await this.buttonFinish.click();
    }
}