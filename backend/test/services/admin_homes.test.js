const app = require('../../src/app');

describe('\'admin_homes\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin-homes');
    expect(service).toBeTruthy();
  });
});
