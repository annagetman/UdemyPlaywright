import { expect, Locator, Page } from "playwright/test";

export class PaymentPage {
    // Define selectors
    readonly page: Page;
    readonly payeeSelectbox: Locator;
    readonly payeeDetailButton: Locator;
    readonly payeedetail: Locator;
    readonly accountSelectbox: Locator;
    readonly amountInput: Locator;
    readonly dateInput: Locator;
    readonly descriptionInput: Locator;
    readonly submitPayButton: Locator;
    readonly message: Locator;

constructor(page: Page) {
    this.page = page;
    this.payeeSelectbox = page.locator('#sp_payee');
    this.payeeDetailButton = page.locator('#sp_get_payee_details');
    this.payeedetail = page.locator('#sp_payee_details');
    this.accountSelectbox = page.locator('#sp_account');
    this.amountInput = page.locator('#sp_amount');
    this.dateInput = page.locator('#sp_date');
    this.descriptionInput = page.locator('#sp_description');
    this.submitPayButton = page.locator('#pay_saved_payees');
    this.message = page.locator('.alert-success');
}

async createPayment(payee: string, account: string, amount: string, date: string, description: string) {
    await this.payeeSelectbox.selectOption(payee);
    await this.payeeDetailButton.click();
    await expect(this.payeedetail).toBeVisible();
    
    await this.accountSelectbox.selectOption(account);
    await this.amountInput.fill(amount);
    await this.dateInput.fill(date);
    await this.descriptionInput.fill(description);
    
    await this.submitPayButton.click();
}
    
    // Assert that the payment was successful
    
async assertPaymentSuccess() {
    await expect(this.message).toBeVisible(); 
    await expect(this.message).toContainText('The payment was successfully submitted');          
 }
}
