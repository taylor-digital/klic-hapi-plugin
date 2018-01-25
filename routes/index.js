'use strict';

const Lists = require('./lists');

module.exports = [
    { method: 'GET',  path: '/lists', config: Lists.get  },
    { method: 'POST', path: '/lists', config: Lists.post }
];