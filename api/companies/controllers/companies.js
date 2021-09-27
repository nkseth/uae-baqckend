'use strict';
const { sanitizeEntity } = require('strapi-utils');


/**
 * Given a dollar amount number, convert it to it's value in cents
 * @param number 
 */
const fromDecimalToInt = (number) => parseInt(number * 100)


/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    /**
     * Only send back orders from you
     * @param {*} ctx 
     */
    async find(ctx) {
        const { user } = ctx.state
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.companies.search({...ctx.query, user: user.id});
        } else {
            entities = await strapi.services.companies.find({...ctx.query, user: user.id});
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.companies }));
    },

    async findOne(ctx) {
        const {id}=ctx.params
        const {user}=ctx.state
        const entity= await strapi.services.companies.findOne({id,user:user.id})
        return sanitizeEntity(entity,{model:strapi.models.companies})
    }

        
                
};