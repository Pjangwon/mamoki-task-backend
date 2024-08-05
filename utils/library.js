const axios = require('axios');
const { publicPortalKey } = require('../keys/key');

const library = (params, callback) => {
    const baseUrl = 'http://data4library.kr/api/itemSrch';
    const queryString = new URLSearchParams(params).toString();
    const url = `${baseUrl}?${queryString}&authKey=${publicPortalKey}`;

    axios.get(url)
        .then(response => {
            callback(null, response.data);
        })
        .catch(error => {
            callback(error, null);
        });
};

module.exports = library;