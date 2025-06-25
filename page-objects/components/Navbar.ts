import { expect, Locator, Page  } from "playwright/test";

export class Navbar {
readonly page: Page;
readonly accountSummaryLink: Locator;
readonly accountActivityLink: Locator;
readonly otrasferFundsLink: Locator;
readonly payBillsLink: Locator;
readonly myMoneyMapLink: Locator;
readonly onlineStatementsLink: Locator;

constructor(page: Page) {
    this.page = page;
    this.accountSummaryLink = page.locator('#account_summary_tab');
    this.accountActivityLink = page.locator('#account_activity_tab');
    this.otrasferFundsLink = page.locator('#transfer_funds_tab');
    this.payBillsLink = page.locator('#pay_bills_tab');
    this.myMoneyMapLink = page.locator('#money_map_tab');
    this.onlineStatementsLink = page.locator('#online_statements_tab');
}

async clickOnTab(tabName: string) {
    switch (tabName) {
        case 'Account Summary':
            await this.accountSummaryLink.click();
            break;
        case 'Account Activity':
            await this.accountActivityLink.click();
            break;
        case 'Transfer Funds':
            await this.otrasferFundsLink.click();
            break;
        case 'Pay Bills':
            await this.payBillsLink.click();
            break;
        case 'My Money Map':
            await this.myMoneyMapLink.click();
            break;
        case 'Online Statements':
            await this.onlineStatementsLink.click();
            break;
        default:
            throw new Error(`Tab ${tabName} is not recognized`);
    }
  }
}