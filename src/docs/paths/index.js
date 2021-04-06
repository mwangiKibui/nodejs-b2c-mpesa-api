const accessToken = require('./access-token');
const b2c = require('./b2c');

module.exports = {
    paths:{
        '/access-token':{
            ...accessToken,
        },
        '/b2c':{
            ...b2c
        }       
       
    }
};