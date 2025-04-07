import { APIRequestContext, expect } from '@playwright/test';

export class ChargePointApi {
    private apiContext: APIRequestContext;
    private readonly apiURL: string =
        process.env.API_URL || 'http://localhost:3001';

    constructor(requestContext: APIRequestContext) {
        this.apiContext = requestContext;
    }

    async createChargePoint(serialNumber: string) {
        const response = await this.apiContext.post(
            `${this.apiURL}/charge-point`,
            {
                data: { serialNumber },
            }
        );
        expect(response.status()).toBe(201);
        return await response.json();
    }

    async deleteChargePoint(id: string) {
        const response = await this.apiContext.delete(
            `${this.apiURL}/charge-point/${id}`
        );
        expect(response.status()).toBe(204);
    }

    async listChargePoints() {
        const response = await this.apiContext.get(
            `${this.apiURL}/charge-point`
        );

        expect(response.status()).toBe(200);
        return await response.json();
    }

    async clearAllChargePoints() {
        const list = await this.listChargePoints();
        for (const item of list) {
            await this.deleteChargePoint(item.id);
        }
    }
}
