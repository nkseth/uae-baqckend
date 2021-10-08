module.exports =async (ctx,next)=>{
  if(ctx.state.user){
   
    const targetUser=ctx.params.id.toString()
    const logedinuser=ctx.state.user.id.toString()
    if(targetUser===logedinuser){
        return await next()
    }
     else return ctx.unauthorized('Your cant access this data')
  }
return ctx.unauthorized('You are not loged in')
    }