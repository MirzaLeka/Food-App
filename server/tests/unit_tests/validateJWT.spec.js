const { validateJWTToken } = require('../../validation/validateUsersController');
const { properJWTToken, invalidJWTToken } = require('../seed_data/seed_JWTToken');

describe('Validate JWT token', () => {

  it('Should pass if you token is valid', () => {
    const output = validateJWTToken(properJWTToken);
    expect(output).toBe(true);
  });

  it('Should fail if you token is invalid', () => {
    const output = validateJWTToken(invalidJWTToken);
    expect(output).toBe(false);
  });

});
