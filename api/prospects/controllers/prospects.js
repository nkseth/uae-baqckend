'use strict';
const { sanitizeEntity,parseMultipartData } = require('strapi-utils');
const axios = require('axios');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async create(ctx) {

    const  data  = ctx.request.body;
    console.log(data)
    const secret="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

    const humanvarification=async()=>{
        const verify= await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${data.token}`)
        .then(async(res)=>{

          console.log(res)
            return res.data.success

        }).catch((e)=>{
          ctx.throw(400,e.message)
          return false
        })
return verify
      }

const hv= await humanvarification()
console.log(hv)
    if(hv){
     return await strapi.services.prospects.find({email:data.email}).then(async(res)=>{
    console.log(res)
      if(res.length>0){
         ctx.throw(400,"you are already registered")
       }
       else{
         console.log("ejnaeklsdfm")
      const entity= await strapi.services.prospects.create({...ctx.request.body}).then().catch((e)=>{ctx.throw(400,e.message)});
     return sanitizeEntity(entity, { model: strapi.models.prospects})
    }

      }).catch((e)=>{
          ctx.throw(400,e.message)
      })
    }
    else{
      console.log("this run")
    return  ctx.throw(400,"you are not a human")
     }




  },


};
