'use strict';

const Admin = require('./admin');
const Lists = require('./lists');
const User = require('./user');

module.exports = [
    { method: 'GET',  path: '/lists', config: Lists.get  },
    { method: 'POST', path: '/lists', config: Lists.post },
    { method: 'GET', path: '/user', config: User.get },
    { method: 'GET', path: '/admin', config: Admin.get }
];