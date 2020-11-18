'use strict';

const mock = require('egg-mock');
const sinon = require('sinon');

describe('test/router-simple.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/router-simple-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  describe('GET /simple', () => {

    it('success', async () => {

      const query = { a: '1', b: '2' };
      const params = {};
      const res = { haha: 123 };
      const mocked = sinon.mock('simple.find').withExactArgs(query, params).resolves(res)
        .once();
      app.mockService('simple', 'find', mocked);

      await app.httpRequest()
        .get('/simple')
        .query(query)
        .expect(200, res);
    });

    it('not found', async () => {

      const query = { a: '1', b: '2' };
      const params = {};
      const res = null;
      const mocked = sinon.mock('simple.find').withExactArgs(query, params).resolves(res)
        .once();
      app.mockService('simple', 'find', mocked);

      await app.httpRequest()
        .get('/simple')
        .query(query)
        .expect(404);
    });

  });

  describe('POST /simple', () => {

    it('success', async () => {

      const body = { a: '1', b: '2' };
      const params = {};
      const res = { haha: 123 };
      const mocked = sinon.mock('simple.createOne').withExactArgs(body, params).resolves(res)
        .once();
      app.mockService('simple', 'createOne', mocked);

      app.mockCsrf();
      await app.httpRequest()
        .post('/simple')
        .send(body)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, res);
    });

  });

  describe('DELETE /simple', () => {

    it('success', async () => {

      const query = { a: '1', b: '2' };
      const params = {};
      const res = { haha: 123 };
      const mocked = sinon.mock('simple.deleteAll').withExactArgs(query, params).resolves(res)
        .once();
      app.mockService('simple', 'deleteAll', mocked);

      app.mockCsrf();
      await app.httpRequest()
        .delete('/simple')
        .query(query)
        .expect(204);
    });

    it('not found', async () => {

      const query = { a: '1', b: '2' };
      const params = {};
      const res = null;
      const mocked = sinon.mock('simple.deleteAll').withExactArgs(query, params).resolves(res)
        .once();
      app.mockService('simple', 'deleteAll', mocked);

      app.mockCsrf();
      await app.httpRequest()
        .delete('/simple')
        .query(query)
        .expect(404);
    });

  });

  describe('OPTIONS /simple', () => {

    it('success', async () => {

      await app.httpRequest()
        .options('/simple')
        .expect(res => {
          const allow = res.header.allow;
          const methods = allow.split(',');
          if (!methods.includes('POST')) { return false; }
          if (methods.includes('GET')) { return false; }
          if (methods.includes('DELETE')) { return false; }

          return methods.includes('OPTIONS');
        })
        .expect(200);
    });

  });

  describe('GET /simple/:id', () => {

    it('success', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const params = {};
      const res = { haha: 123 };
      const mocked = sinon.mock('simple.findOne').withExactArgs({ ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'findOne', mocked);

      await app.httpRequest()
        .get(`/simple/${id}`)
        .query(query)
        .expect(200, res);
    });

    it('not found', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const params = {};
      const res = null;
      const mocked = sinon.mock('simple.findOne').withExactArgs({ ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'findOne', mocked);

      await app.httpRequest()
        .get(`/simple/${id}`)
        .query(query)
        .expect(404);
    });

  });

  describe('HEAD /simple/:id', () => {

    it('success', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const params = {};
      const res = { haha: 123 };
      const mocked = sinon.mock('simple.findOne').withExactArgs({ ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'findOne', mocked);

      await app.httpRequest()
        .head(`/simple/${id}`)
        .query(query)
        .expect(200);
    });

    it('not found', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const params = {};
      const res = null;
      const mocked = sinon.mock('simple.findOne').withExactArgs({ ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'findOne', mocked);

      await app.httpRequest()
        .head(`/simple/${id}`)
        .query(query)
        .expect(404);
    });

  });

  describe('DELETE /simple/:id', () => {

    it('success', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const params = {};
      const res = { haha: 123 };
      const mocked = sinon.mock('simple.deleteOne').withExactArgs({ ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'deleteOne', mocked);

      app.mockCsrf();
      await app.httpRequest()
        .delete(`/simple/${id}`)
        .query(query)
        .expect(204);
    });

    it('not found', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const params = {};
      const res = null;
      const mocked = sinon.mock('simple.deleteOne').withExactArgs({ ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'deleteOne', mocked);

      app.mockCsrf();
      await app.httpRequest()
        .delete(`/simple/${id}`)
        .query(query)
        .expect(404);
    });

  });

  describe('PUT /simple/:id', () => {

    it('success', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const body = { c: 3333, d: 4444 };
      const params = {};
      const res = { haha: 123 };
      const mocked = sinon.mock('simple.replaceOne').withExactArgs({ ...body, id }, { ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'replaceOne', mocked);

      app.mockCsrf();
      await app.httpRequest()
        .put(`/simple/${id}`)
        .query(query)
        .send(body)
        .expect(200, res);
    });

    it('not found', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const body = { c: 3333, d: 4444 };
      const params = {};
      const res = null;
      const mocked = sinon.mock('simple.replaceOne').withExactArgs({ ...body, id }, { ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'replaceOne', mocked);

      app.mockCsrf();
      await app.httpRequest()
        .put(`/simple/${id}`)
        .query(query)
        .send(body)
        .expect(404);
    });

  });


  describe('PATCH /simple/:id', () => {

    it('success', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const body = { c: 3333, d: 4444 };
      const params = {};
      const res = { haha: 123 };
      const mocked = sinon.mock('simple.updateOne').withExactArgs(body, { ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'updateOne', mocked);

      app.mockCsrf();
      await app.httpRequest()
        .patch(`/simple/${id}`)
        .query(query)
        .send(body)
        .expect(200, res);
    });

    it('not found', async () => {

      const id = 'id';
      const query = { a: '1', b: '2' };
      const body = { c: 3333, d: 4444 };
      const params = {};
      const res = null;
      const mocked = sinon.mock('simple.updateOne').withExactArgs(body, { ...query, id }, params).resolves(res)
        .once();
      app.mockService('simple', 'updateOne', mocked);

      app.mockCsrf();
      await app.httpRequest()
        .patch(`/simple/${id}`)
        .query(query)
        .send(body)
        .expect(404);
    });

  });

  describe('OPTIONS /simple/:id', () => {

    it('success', async () => {

      const id = 'id';
      await app.httpRequest()
        .options(`/simple/${id}`)
        .expect(res => {
          const allow = res.header.allow;
          const methods = allow.split(',');
          if (!methods.includes('HEAD')) { return false; }
          if (methods.includes('GET')) { return false; }
          if (methods.includes('DELETE')) { return false; }
          if (methods.includes('PUT')) { return false; }
          if (methods.includes('PATCH')) { return false; }

          return methods.includes('OPTIONS');
        })
        .expect(200);
    });

  });

});
