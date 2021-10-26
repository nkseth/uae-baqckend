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
    },

    async update(ctx) {
        const { id } = ctx.params;
        const {user}=ctx.state
        let entity
        let check=0
          const checkingcompany= await strapi.query("companies").findOne({id:id})
          .then((res)=>{
              if(res.user.id!==user.id){
                check=1
              }
          })

          if(check===1) ctx.throw(400,"you are not authorised to do this update")

        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          console.log("sadhfhdsadf",data.activeplans[0])
          entity = await strapi.services.companies.update({ id }, {...data,user:user.id}, {
            files,
          });
        } else {
            console.log("sadhfhdsadf",ctx.request.body)

          entity = await strapi.services.companies.update({ id }, {...ctx.request.body,user:user.id}).catch((err)=>{

          });
        }

        return sanitizeEntity(entity, { model: strapi.models.companies });
      } ,

      async create(ctx) {
        const {user}=ctx.state
        let entity;

        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);

          entity = await strapi.services.companies.create({user: user.id,...data}, { files });
        } else {
          entity = await strapi.services.companies.create({...ctx.request.body,user: user.id});
        }
        return sanitizeEntity(entity, { model: strapi.models.companies });
      },



};
