'use strict';
const { sanitizeEntity,parseMultipartData} = require('strapi-utils');


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
            entities = await strapi.services.usercart.search({...ctx.query, user: user?.id});
        } else {
            entities = await strapi.services.usercart.find({...ctx.query, user: user?.id});
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.usercart }));
    },

    async findOne(ctx) {
        const {id}=ctx.params
        const {user}=ctx.state
        const entity= await strapi.services.usercart.findOne({id,user:user.id})
        return sanitizeEntity(entity,{model:strapi.models.usercart})
    },



  
    
    async update(ctx) {
      const { id } = ctx.params;
      const {user}=ctx.state
      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.usercart.update({ id }, {...data,user:user.id}, {
          files,
        });
      } else {
        entity = await strapi.services.usercart.update({ id }, {...ctx.request.body,user:user.id});
      }
  
      return sanitizeEntity(entity, { model: strapi.models.usercart });
    } ,

    async create(ctx) {
      const {user}=ctx.state
      let entity;
      
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        strapi.log.info(data)
        entity = await strapi.services.usercart.create({user: user.id,...data}, { files });
      } else {
        entity = await strapi.services.usercart.create({...ctx.request.body,user: user.id});
      }
      return sanitizeEntity(entity, { model: strapi.models.usercart });
    },

    
  
};