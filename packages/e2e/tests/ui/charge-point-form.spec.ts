import { test, expect } from '@playwright/test';
import ChargePointPage from '../../page-objects/chargePointPage';
import { ChargePointApi } from '../../api-objects/chargePointApi';

test.describe('Charge point installation form UI', () => {
    let chargePointPage: ChargePointPage;
    let chargePointApi: ChargePointApi;

    test.beforeEach(async ({ page, baseURL }) => {
        // go to the installation form page
        chargePointPage = new ChargePointPage(page);
        await chargePointPage.goto(`${baseURL}`);

        // start each test with a clean slate
        chargePointApi = new ChargePointApi(page.request);
        await chargePointApi.clearAllChargePoints();

        await page.reload();
        await expect(chargePointPage.serialNumberList).toHaveCount(0);
    });

    test(
        'should add a list item',
        {
            tag: '@smoke',
        },
        async () => {
            const serialNumber = `SN-${Math.random()}`;

            await chargePointPage.addSerialNumber(serialNumber);
            await expect(chargePointPage.serialNumberList).toContainText(
                serialNumber
            );
            await expect(chargePointPage.serialNumberList).toHaveCount(1);
        }
    );

    test(
        'should delete a list item',
        {
            tag: '@smoke',
        },
        async () => {
            const serialNumber = `SN-${Math.random()}`;

            await chargePointPage.addSerialNumber(serialNumber);
            await expect(chargePointPage.serialNumberList).toContainText(
                serialNumber
            );

            await chargePointPage.deleteListItemButton.click();
            await expect(chargePointPage.serialNumberList).toHaveCount(0);
        }
    );

    test('serial number created via API should appear in UI', async ({
        page,
    }) => {
        const serialNumber = `SN-${Math.random()}`;

        // create via API
        await chargePointApi.createChargePoint(serialNumber);
        await page.reload();

        // assert in UI
        await expect(chargePointPage.serialNumberList).toContainText(
            serialNumber
        );
        await expect(chargePointPage.serialNumberList).toHaveCount(1);
    });

    test('serial number created via UI is returned via API', async ({
        page,
    }) => {
        const serialNumber = `SN-${Math.random()}`;

        // create via UI
        await chargePointPage.addSerialNumber(serialNumber);
        await expect(chargePointPage.serialNumberList).toHaveText(serialNumber);

        // assert in API
        const createdItem = await chargePointApi.listChargePoints();
        expect(createdItem).toHaveLength(1);
        expect(createdItem[0].serialNumber).toBe(serialNumber);
    });

    test('multiple serial numbers created via API can be deleted via UI', async ({
        page,
    }) => {
        const serialNumbers: any[] = [];

        // create via API
        for (let i = 0; i < 2; i++) {
            const serialNumber = `SN-${Math.random()}`;
            const createdItem =
                await chargePointApi.createChargePoint(serialNumber);
            serialNumbers.push(createdItem);
        }

        // assert in UI
        await page.reload();
        await expect(chargePointPage.serialNumberList).toHaveCount(2);

        // delete via UI
        await chargePointPage.deleteListItemButton.first().click();
        await expect(chargePointPage.serialNumberList).toHaveCount(1);
        await chargePointPage.deleteListItemButton.first().click();
        await expect(chargePointPage.serialNumberList).toHaveCount(0);

        // assert in API
        const getListItems = await chargePointApi.listChargePoints();
        expect(getListItems).toHaveLength(0);
    });

    test('multiple serial numbers created via UI can be deleted via API', async ({
        page,
    }) => {
        // create via UI
        for (let i = 0; i < 5; i++) {
            const serialNumber = `SN-${Math.random()}`;
            await chargePointPage.addSerialNumber(serialNumber);
        }

        // assert in UI
        await expect(chargePointPage.serialNumberList).toHaveCount(5);

        // delete via API
        const createdItems = await chargePointApi.listChargePoints();
        await Promise.all(
            createdItems.map((item) =>
                chargePointApi.deleteChargePoint(item.id)
            )
        );

        // assert in UI
        await page.reload();
        await expect(chargePointPage.serialNumberList).toHaveCount(0);

        // assert in API
        const getListItems = await chargePointApi.listChargePoints();
        expect(getListItems).toHaveLength(0);
    });
});
