import supertest from 'supertest';

import app from '../../../index';

const request = supertest(app);

supertest.describe('Image Processing API tests', () => {
    const route = '/api/task';

    supertest.it('Checks availability of route', async () => {
        const response = await request.get(route);
        supertest.expect(response.statusCode).not.toBe(404);
    });

    supertest.it('returns 400 if no params provided', async () => {
        await request.get(route).expect(400);
    });

});

function expect(statusCode: any) {
    throw new Error('Function not implemented.');
}
