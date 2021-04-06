const basicInfo = require('./basicInfo');
const tags = require('./tags');
const servers = require('./servers');
const components = require('./components');
const paths = require('./paths');

module.exports = {
    ...basicInfo,
    ...tags,
    ...servers,
    ...components,
    ...paths
};