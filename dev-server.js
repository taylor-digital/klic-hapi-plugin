'use strict';

const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Package = require('./package');
const Inert = require('inert');
const Vision = require('vision');
const Wreck = require('wreck');

const KLICLists = require('./');


const swaggerOpts = {
    info: {
        title: 'KLIC API',
        version: Package.version
    },
    securityDefinitions: {
        'bearer-access-token': {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    security: [{ 'bearer-access-token': [] }],
    auth: false
};

const options = {
    iam: {
        url: process.env.IAM_URL || 'https://qafederation.taylorcorp.com/connect',
        key: process.env.IAM_KEY || 'cWFrbGljYXBpOnNlY3JldA==',
        scope: 'tc_klic_api'
    },
    users: {
        url: process.env.USERS_URL || 'https://microservices.test.taylordigital.inet/users/api/v1/users',
        key: process.env.USERS_KEY || '4B83D65235034F10A8E777FD0B3C3D2E'
    },
};

const server = new Hapi.Server();

server.connection({
    port: 8080
});

server.register([
    Inert,
    Vision,
    { register: HapiSwagger, options: swaggerOpts },
    { register: KLICLists.register, options }
], (err) => {

    server.ext('onPreAuth', (request, reply) => {

        if (!request.headers['correlation-id']) {
            request.log(['request', 'correlation-id', 'error'], { message: 'correlation-id was not provided.' });
        }

        const wreckDefaults = {
            headers: {
                'correlation-id': request.headers['correlation-id'] || request.id,
                accept: 'application/json; charset=utf-8'
            },
            rejectUnauthorized: false,
            json: true
        };

        request.wreck = Wreck.defaults(wreckDefaults);

        return reply.continue();
    });

    server.start( (error) => {

        if (error) {
            console.log(error); //NOSONAR
          }
          else {
              console.log('Server running at:', server.info.uri); //NOSONAR
              console.log('Documentation at:', server.info.uri + '/documentation'); //NOSONAR
          }
    });
});

