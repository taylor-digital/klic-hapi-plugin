'use strict';

const Joi = require('joi');

exports.get = {
    description: 'A GET example endpoint',
    tags: ['api'],
    validate: {
        query: Joi.object().keys({
            param1: Joi.string().optional().description('Example parameters')
        })
    },
    handler: function (request, reply) {

        const param1 = request.query.param1;

        if (param1) {
            return reply([{ param1 }]);
        }

        return reply([{ param1: 'Hello World'}]);
    }
};

exports.post = {
    description: 'A POST example endpoint',
    tags: ['api'],
    validate: {
        payload: Joi.object().keys({
            param1: Joi.number().required().description('Example parameter that is required')
        })
    },
    handler: function (request, reply) {

        const param1 = request.params.query;

        return reply([{ param1 }]);
        
    }
};