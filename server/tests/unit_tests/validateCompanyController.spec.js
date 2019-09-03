
const { validateObjectID } = require('../../validation/validateCompanyController');
const { properObjectID, invalidObjectID } = require('../seed_data/seed_objectID');

describe('Validate ObjectID', () => {

  it('It should pass if you use valid ObjectID', () => {
    const output = validateObjectID(properObjectID);
    expect(output).toBe(true);
  })

  it('It should fail if you use invalid ObjectID', () => {
    const output = validateObjectID(invalidObjectID);
    expect(output).toBe(false);   
  })

});
