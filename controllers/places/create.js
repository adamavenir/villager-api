'use strict';

const Slug = require('slug');

module.exports = {
    description: 'Create a Place',
    handler: function (request, reply) {
        
        const now = new Date();
        const slug = `${Slug(request.payload.name, { lower: true })}`;
        const payload = Object.assign({}, request.payload, { slug : slug });
        
        payload.date_created = now;
        
        const result = this.db.places.insert(payload).then((place) => {
            return request.generateResponse(place).code(201);
        })
        
        return reply(result);
        
    }
}