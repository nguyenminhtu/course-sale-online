const app = require('../../src/app');

describe('\'requests\' service', () => {
  it('registered the service', () => {
    const service = app.service('requests');
    expect(service).toBeTruthy();
  });
});
