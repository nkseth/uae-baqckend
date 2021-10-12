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
            entities = await strapi.services.order.search({...ctx.query, user: user.id});
        } else {
            entities = await strapi.services.order.find({...ctx.query, user: user.id});
        }

        return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.order }));
    },


    async findOne(ctx) {
        const {id}=ctx.params
        const {user}=ctx.state
        const entity= await strapi.services.order.findOne({id,user:user.id})
        return sanitizeEntity(entity,{model:strapi.models.order})
    },

    async update(ctx) {
        const { id } = ctx.params;
        const {user}=ctx.state
        let entity;
        if (ctx.is('multipart')) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services.order.update({ id }, {...data,user:user.id}, {
            files,
          });
        } else {
          entity = await strapi.services.order.update({ id }, {...ctx.request.body,user:user.id});
        }

        return sanitizeEntity(entity, { model: strapi.models.order });
      } ,

async create(ctx) {
        const {user}=ctx.state
        let placeorder
        let entity;
     const {companyid,cart}=ctx.request.body
     const commingsubscription=[]
     const commingaddons=[]
     cart.map((item)=>{
         if(item.type==="subscription")
         commingsubscription.push(item)
         else if(item.type==='addon')
         commingaddons.push(item)
     })
      if(!companyid){
        ctx.throw(400,'Please select compant to place an order')
      }

     //COMING ADDONS ID
     const addonsid=[]

     commingaddons.map((item)=>{
         addonsid.push(item.id)
     })

     //COMMING SUBSC. ID
     const subscriptionid=[]

     commingsubscription.map((item)=>{
         addonsid.push(item.id)
     })

     // sub. date calc

     const date=(tenure)=>{
         const d = new Date();
     const startdate=new Date()
     let enddate
          if(tenure==="MONTH")
         enddate= new Date(d.setDate(d.getDate() + 30));
            else if(tenure==="YEAR")
            enddate=new Date(d.setDate(d.getDate() + 365));
        return ({startdate,enddate})
         }

             // total calc
     const totalcal=()=>{
         let total=0
         cart.map((item)=>{
             total=total+item.price
         })
     return total
     }

     //time diff cal
     const timediffcalc=(date2,date1)=>{

         const diffTime = (date2 - date1);
         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
         if(date2>date1)
         return false
         else return true

     }
     const  status= await strapi.services.order.findaoa(user).then()
     .catch((err)=>{ctx.throw(400,`order status is not set ${err}`)})

let error=0
    await strapi.services.order.Ordercheker(companyid).then(
        //this is new company
        async(res)=>{

            if(res===null) {
              if(commingsubscription.length===0){
                ctx.throw(400,'You have NO active Subscription plans')
              }
                //its a new company
              if(commingsubscription.length>1){
                    ctx.throw(400,'Only one subscription plan is allowed per company')
                }
               if(commingsubscription.length>0){

                commingaddons.map((item)=>{
                  console.log(item.priority,commingsubscription[0].priority)
                  console.log(item.priority>commingsubscription[0].priority)
                  if(item.priority>commingsubscription[0].priority)
                     ctx.throw(400,'please select addons that belongs to your subscription')
                 })
               }
               else{
                ctx.throw(400,'You have NO active Subscription plans')
               }



                const {startdate,enddate}=date(commingsubscription[0].tenure)



          const  finaldatasub={
                    plan:commingsubscription[0].id?[commingsubscription[0].id]:"",
                   company:companyid,
                    status: status[0].AutoApprove,
                    startdate,
                    enddate

                }
                if(commingsubscription.length>0)
                await strapi.query('activeplans').create({user:user.id,...finaldatasub})


                placeorder={
                    plan:commingsubscription[0].id?[commingsubscription[0].id]:"",
                    company:companyid,
                    status: status[0].AutoApprove,
                    addons:addonsid,
                    total:totalcal()
                }

if(commingaddons.length>0)
               {

              commingaddons.map((item)=>{
                   const {enddate,startdate}=date(item.tenure)
                    let  finaldataaddon={
                       company:companyid,
                        status: status[0].AutoApprove,
                        startdate,
                        enddate
                    }
                    strapi.query('activeadons').create({user:user.id,...finaldataaddon,addon:item.id})
                })
            }

            }

             else {


//old ccompany gets a new plan
            if(commingsubscription.length>0){


             if(commingsubscription.length>1){
                          error=1
                            ctx.throw(400,'Only one subscription plan is allowed per company')
                        }

            if(commingsubscription[0].priority<res.plan.priority){
              error=1
              ctx.throw(400,'the subscription selected is less than your active subscription')
            }


// current sunb is same as comming sub
             if(commingsubscription[0].priority===res.plan.priority)
                        {
                           const date1 =new Date(res.enddate)
                          const date2= new Date()
                          let diff=timediffcalc(date2,date1)

                        if(diff){
                          error=1
                                ctx.throw(400,'your already have this plan active')
                            }


                        }
                    }


                      if(commingsubscription.length>0){
                        commingaddons.map((item)=>{
                            if(item.priority>commingsubscription[0].priority){
                              error=1
                              ctx.throw(400,'please select addons that belongs to your subscription')
                            }

                        })
                      }
                      else if(commingaddons.length>0){
                        commingaddons.map((item)=>{
                            if(item.priority>res.plan.priority){
                              error=1
                              ctx.throw(400,'please select addons that belongs to your subscription')
                            }

                        })
                      }

             await strapi.services.order.Addoncheker(companyid).then(async (addonres)=>{

                          const resaddid=[]
                        addonres.map((item)=>{

                          console.log("dmddmf45")
                          resaddid.push(item.addon?.id)
                        })

                        console.log("dmddm4f")
                        const presentaddons=[]
                        commingaddons.map((item)=>{
                            if(resaddid.includes(item?.id))
                            presentaddons.push(item)
                        })
                        const presentaddonsid=[]
                        if(presentaddons.length>0)
                        {
                        presentaddons.map((item)=>{
                            presentaddonsid.push(item.id)
                        })
                    }
                    console.log("dmddmf7")
                    presentaddonsid.map((aitem)=>{
                        addonres.map((item)=>{
                            if(item.addon.id===aitem){
                              const date1a =new Date(item.enddate)
                                const date2a= new Date()
                                let diff= timediffcalc(date2a,date1a)

                                 if(diff){
                                   error=1
                                     ctx.throw(400,`you already have this ${item.addon.title} addon active`)
                                 }
                            }
                        })

                    })
                    console.log("dmddmf")

                  const finder=async(item,finaldataaddon)=>{
                        await strapi.query('activeadons').findOne({addon:item.id}).then((res)=>{
                            strapi.query('activeadons').update({id:res.id},{user:user.id,...finaldataaddon})
                           })
                        }

                        console.log("dmddm")
                 commingaddons.map((item)=>{

                          const {enddate,startdate}=date(item.tenure)

                        const  finaldataaddon={
                            addon:item?.id,
                           company:companyid,
                            status: status[0].AutoApprove,
                            startdate,
                            enddate
                         }
                         console.log("dmddm444")

                     if(commingaddons.length>0)
                            if(presentaddonsid.includes(item?.id))
                            {

                            finder(item,finaldataaddon)

                            }else
                             strapi.query('activeadons').create({user:user.id,...finaldataaddon})
                       })
                       console.log("dmddm")
                      const oldaddons=[]
                      addonres.map((item)=>{
                            oldaddons.push(item.addon.id)
                      })

                      const finaladdons=[...addonsid,...resaddid]
                      const finaladdcre=[]
                      finaladdons.map((item)=>{
                        if(!finaladdcre.includes(item))
                        finaladdcre.push(item)
                      })

                        placeorder={
                           plan:commingsubscription[0]?[commingsubscription[0].id]:null,
                           company:companyid,
                           status: status[0].AutoApprove,
                           addons:finaladdcre,
                           total:totalcal()
                       }
}).catch((err)=>{ctx.throw(400,`${err.message}`)})


if(commingsubscription.length>0){
const {enddate,startdate}=date(commingsubscription[0].tenure)
const  finaldata={
           plan:commingsubscription[0]?[commingsubscription[0].id]:null,
          company:companyid,
           status: status[0].AutoApprove,
           startdate,
           enddate
             }


        await strapi.query('activeplans').update({id:res.id},{user:user.id,...finaldata}).then()
        .catch((err)=>{error=1; ctx.throw(400,`cannot create subscription`)})
    }

           }

        })
        .catch((err)=>{
            ctx.throw(400,`${err.message}`)
        })
        entity = await strapi.services.order.create({...placeorder,user:user.id})

        .then().catch((err)=>{error=1 ;ctx.throw(400,`Order cannot be created ${err.message}`)})
        return sanitizeEntity(entity, { model: strapi.models.order })

      },


};
