const axios = require('axios');
const { publicPortalKey } = require('../keys/key');

const library = (stationName, callback) => {
    const url = `http://data4library.kr/api/itemSrch?libCode=111034&startDt=2017-06-01&endDt=2017-06-30&authKey=${publicPortalKey}`;

    axios.get(url)
        .then(response => {
            callback(null, response.data);
        })
        .catch(error => {
            callback(error, null);
        });
};

module.exports = library;