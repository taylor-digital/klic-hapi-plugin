'use strict';

exports.get = {
    description: 'An endpoint that outputs admin auth',
    tags: ['api'],
    auth: 'adminAuth',
    handler: function (request, reply) {

        const auth = request.auth;

        return reply(auth);
    }
};