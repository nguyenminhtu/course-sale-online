const app = require('../../src/app');

describe('\'user-homes\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-homes');
    expect(service).toBeTruthy();
  });
});
