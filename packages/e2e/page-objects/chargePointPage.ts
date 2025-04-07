import { Page } from '@playwright/test';

export default class ChargePointPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get serialNumberInput() {
        return this.page.locator('input[name="input-serial-number"]');
    }

    public get submitButton() {
        return this.page.locator('.addButton');
    }

    public get serialNumberList() {
        return this.page.locator('.list-text');
    }

    public get deleteListItemButton() {
        return this.page.locator('.list-button');
    }

    async goto(baseURL: string) {
        await this.page.goto(baseURL);
    }

    /**
     * Add a serial number to the charge point list
     * @param data The serial number to add
     */

    async addSerialNumber(data: string) {
        await this.serialNumberInput.fill(data);
        await this.submitButton.click();
    }
}
