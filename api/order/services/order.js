'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {

    async findaoa(params, populate,user) {
        return await strapi.query('automatic-order-approval').find();
        
       
      },

     async Ordercheker(companyid) {
     return  await strapi.query('activeplans').findOne({company:companyid})

     
     } ,
     async activeplanfinder(companyid){
      return  await strapi.query('activeplans').findOne({company:companyid})
     },
     async Addoncheker(companyid) {
        return  await strapi.query('activeadons').find({company:companyid})
   
        
        }
};
