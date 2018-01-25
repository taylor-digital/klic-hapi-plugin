'use strict';

const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

const KLICLists = require('./');

const server = new Hapi.Server();

server.connection({
    port: 8080
});

server.register([
    Inert,
    Vision,
    { register: HapiSwagger, options: {} },
    { register: KLICLists.register, options: {} }
], (err) => {

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

