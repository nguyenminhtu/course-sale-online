const app = require('../../src/app');

describe('\'courses\' service', () => {
  it('registered the service', () => {
    const service = app.service('courses');
    expect(service).toBeTruthy();
  });
});
