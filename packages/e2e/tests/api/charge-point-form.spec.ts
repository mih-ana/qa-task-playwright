import { test, expect } from '@playwright/test';
import { ChargePointApi } from '../../api-objects/chargePointApi';

test.describe('Charge point installation form API', () => {
    let chargePointApi: ChargePointApi;

    test.beforeEach(async ({ page }) => {
        chargePointApi = new ChargePointApi(page.request);
    });

    test(
        'should add and delete a charge point serial number',
        {
            tag: '@smoke',
        },
        async () => {
            const serialNumber = `SN-${Math.random()}`;

            // create a new charge point
            const createdItem =
                await chargePointApi.createChargePoint(serialNumber);
            expect(createdItem.serialNumber).toBe(serialNumber);
            expect(createdItem.id).toBeDefined();

            // assert creation
            const chargePointListAfterPost =
                await chargePointApi.listChargePoints();
            const foundItem = chargePointListAfterPost.find(
                (el) => el.id === createdItem.id
            );
            expect(foundItem).toBeDefined();
            expect(foundItem?.serialNumber).toBe(serialNumber);

            // delete the created charge point
            await chargePointApi.deleteChargePoint(createdItem.id);

            // assert deletion
            const chargePointList = await chargePointApi.listChargePoints();
            const deletedItem = chargePointList.find(
                (el) =>
                    el.id === createdItem.id &&
                    el.serialNumber === createdItem.serialNumber
            );
            expect(deletedItem).toBeUndefined();
        }
    );
});
