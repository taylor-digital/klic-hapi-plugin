'use strict';

const AuthBearer = require('hapi-auth-bearer-token');
const Routes = require('./routes');
const Taas = require('@taylordigital/klic-taas');

exports.register = function (server, options, next) {

    server.register([AuthBearer], (err) => {

        if (err) {
            return next(err);
        }

        server.auth.strategy('userAuth', 'bearer-access-token', { validateFunc: Taas.validateUser(options) });
        server.auth.strategy('adminAuth', 'bearer-access-token', { validateFunc: Taas.validateAdmin(options) });

        server.route(Routes);
        return next();
    });
};

exports.register.attributes = {
    pkg: require('./package.json')
};