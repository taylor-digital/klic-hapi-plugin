'use strict';


exports.get = {
    description: 'An endpoint that outputs user auth',
    tags: ['api'],
    auth: 'userAuth',
    handler: function (request, reply) {

        const auth = request.auth;

        return reply(auth);
    }
};