const request = require('request');
const serviceKey = require('../keys/key');

const library = (stationName, callback) => {
    const url = `http://data4library.kr/api/itemSrch?libCode=111034&startDt=2017-06-01&endDt=2017-06-30&authKey=${serviceKey}`;

    request(url, (error, response, body) => {
        if (error) {
            return callback(error, null);
        }

        if (response.statusCode !== 200) {
            return callback(new Error(`Unexpected status code: ${response.statusCode}`), null);
        }

        try {
            const data = JSON.parse(body);
            callback(null, data);
        } catch (parseError) {
            callback(parseError, null);
        }
    });
};

module.exports = library;