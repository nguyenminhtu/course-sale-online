const app = require('../../src/app');

describe('\'videos\' service', () => {
  it('registered the service', () => {
    const service = app.service('videos');
    expect(service).toBeTruthy();
  });
});
