const app = require('../../src/app');

describe('\'lessons\' service', () => {
  it('registered the service', () => {
    const service = app.service('lessons');
    expect(service).toBeTruthy();
  });
});
