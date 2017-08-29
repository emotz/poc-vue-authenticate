const assert = require('assert');
const axios = require('axios');

describe('REST', function () {
    it('should get status 200 from facebook.com', async function () {
        const response = await axios.get('http://facebook.com');
        assert.equal(response.status, 200);
    });
});
