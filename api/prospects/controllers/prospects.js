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
    const secret=""

    const humanvarification=async()=>{
        const verify= await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=6LeA9fkcAAAAAJ2h0WJC2AsKzYfN3QD9B375bmXd&response=${data.token}`)
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
         ctx.throw(400,"You are already registered in waitlist")
       }
       else{
         console.log("ejnaeklsdfm")
      const entity= await strapi.services.prospects
      .create({...ctx.request.body}).then(async()=>{
        const count= await strapi.services.prospects.count()
          const emailOptions = {
          to: data.email,
          subject: 'Bravo You made it, congratulations!',
          html: `<h1>Welcome!</h1>
          <p>You are ${count} in the waitlist to explore the future of accounting.</p>`,
        }
        return await strapi.plugins['email'].services.email.send(emailOptions).then(()=>{return {message: 'email send'} })
        .catch((e)=>{ctx.throw(400,e.message)})


      }).catch((e)=>{ctx.throw(400,e.message)});
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
