'use strict';
const { sanitizeEntity,parseMultipartData } = require('strapi-utils');
const axios = require('axios');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async create(ctx) {
    console.log(fung)
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
      const   username= `${data.firstname} ${data.lastname}`
          const emailOptions = {
          to: data.email,
          subject: 'Bravo You made it, congratulations!',
          html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
            <!--[if gte mso 9]>
            <xml>
              <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="format-detection" content="date=no" />
            <meta name="format-detection" content="address=no" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="x-apple-disable-message-reformatting" />

            <title>SimpleAccounts Waitlist</title>
            <!--[if gte mso 9]>
            <style type="text/css" media="all">
              sup { font-size: 100% !important; }
            </style>
            <![endif]-->


            <style type="text/css" media="screen">
              /* Linked Styles */
              body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#1e52bd; -webkit-text-size-adjust:none }
              a { color:#000001; text-decoration:none }
              p { padding:0 !important; margin:0 !important }
              img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
              .mcnPreviewText { display: none !important; }
              .text-footer2 a { color: #ffffff; }

              /* Mobile styles */
              @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
                .mobile-shell { width: 100% !important; min-width: 100% !important; }

                .m-center { text-align: center !important; }
                .m-left { text-align: left !important; margin-right: auto !important; }

                .center { margin: 0 auto !important; }
                .content2 { padding: 8px 15px 12px !important; }
                .t-left { float: left !important; margin-right: 30px !important; }
                .t-left-2  { float: left !important; }

                .td { width: 100% !important; min-width: 100% !important; }

                .content { padding: 30px 15px !important; }
                .section { padding: 30px 15px 0px !important; }

                .m-br-15 { height: 15px !important; }
                .mpb5 { padding-bottom: 5px !important; }
                .mpb15 { padding-bottom: 15px !important; }
                .mpb20 { padding-bottom: 20px !important; }
                .mpb30 { padding-bottom: 30px !important; }
                .m-padder { padding: 0px 15px !important; }
                .m-padder2 { padding-left: 15px !important; padding-right: 15px !important; }
                .p70 { padding: 30px 0px !important; }
                .pt70 { padding-top: 30px !important; }
                .p0-15 { padding: 0px 15px !important; }
                .p30-15 { padding: 30px 15px !important; }
                .p30-15-0 { padding: 30px 15px 0px 15px !important; }
                .p0-15-30 { padding: 0px 15px 30px 15px !important; }


                .text-footer { text-align: center !important; }

                .m-td,
                .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }

                .m-block { display: block !important; }

                .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

                .column,
                .column-dir,
                .column-top,
                .column-empty,
                .column-top-30,
                .column-top-60,
                .column-empty2,
                .column-bottom { float: left !important; width: 100% !important; display: block !important; }

                .column-empty { padding-bottom: 15px !important; }
                .column-empty2 { padding-bottom: 30px !important; }

                .content-spacing { width: 15px !important; }
              }
            </style>
          </head>
          <body class="body"style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#fff; -webkit-text-size-adjust:none;font-family:'Public Sans',sans-serif;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#fff">
              <tr>
                <td align="center" valign="top">
                  <!-- Main -->
                  <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                    <tr>
                      <td class="td" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                        <!-- Header -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td class="p30-15" style="padding: 40px 0px 20px 0px;">
                            <span style="font-size: 1.5rem;font-weight: bold;">Dear ${username},</span>

                            </td>
                          </tr>

                        </table>
                        <!-- END Header -->

                        <!-- Section 1 -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ebebeb">

                          <tr>
                            <td class="p30-15-0" style="padding: 50px 30px 0px;" bgcolor="#fff">
                              <span style="font-size: 24px;color: #c8facd;font-weight: bold;">Bravo</span>
                            </td>
                          </tr>
                          <tr>
                            <td class="p30-15-0" style="padding: 30px 30px 0px;" bgcolor="#fff">
                              <p  style="font-size: 15px;">You made it, congratulations!</p>
                            </td>
                          </tr>
                          <tr>
                            <td class="p30-15-0" style="padding: 50px 30px 0px;" bgcolor="#fff">
                            </td>
                          </tr>
                        </table>
                        <!-- END Section 1 -->

                        <!-- Section 2 -->
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                          <tr>
                            <td>
                              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#c8facd" style="border-radius: 30px;">
                                <tr>
                                  <td class="fluid-img"style="font-size:0pt; line-height:0pt; text-align:left;">

                                  </td>
                                </tr>
                                <tr>
                                  <td class="p0-15" style="padding: 0px 30px;">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                      <tr>
                                        <td class="h2-center" style="color:#000000;  font-size:32px; line-height:36px; text-align:center; padding-bottom:20px;"><!-- <multiline>Welcome,</multiline> --></td>
                                      </tr>
                                      <tr>
                                        <td class="h2-center" style="color:#000000;  font-size:32px; line-height:36px; text-align:center; padding-bottom:20px;"></td>
                                      </tr>
                                      <tr>
                                        <td class="pb40"style="padding-bottom:40px;">
                                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                        <td style="color:#000000;font-family:'Public Sans',sans-serif;  font-size:24px; line-height:36px; text-align:center; padding-bottom:20px;float:left; font-weight:bold; "><multiline>Welcome,</multiline></td>
                                      </tr>
                                            <tr>
                                              <td >
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                  <tr>
                                                    <th class="column-top"style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                          <td class="h5-black black"style="font-family:'Public Sans',sans-serif; font-size:20px; line-height:28px; text-align:left; text-transform:uppercase; font-weight:bold; color:#000000;"><multiline>You are <span style="text-decoration: underline darkorange;">${count}th</span> in the waitlist to explore the future of accounting.</multiline></td>
                                                        </tr>

                                                      </table>
                                                    </th>
                                                    <th class="column-empty" width="20"style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr;"></th>
                                                    <th class="column-empty" width="20"style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr;"></th>
                                                    <th class="column-empty" width="20"style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; direction:ltr;"></th>
                                                    <th class="column-top" width="156"style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                          <td align="right">
                                                            <table class="m-left" border="0" cellspacing="0" cellpadding="0">
                                                              <tr>
                                                                <td class="text-button button-blue" style=" font-size:14px; line-height:18px; text-align:center; padding:10px 30px; border-radius:20px; background:transparent;">
                                                                <multiline><image width="150px" height="120px" src="https://www.simpleaccounts.io/wp-content/uploads/2021/03/Features-images-track-expenses.png" ></image></multiline></td>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </th>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>


                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td class="fluid-img"style="font-size:20px; text-align:center;height: 50px;">

                            </td>
                          </tr>
                          <tr>
                            <td class="fluid-img"style="text-align:center;color:rgb(99, 115, 129);font-weight:400;font-size: 0.875rem;">
                            <multiline>Check your inbox for the SimpleAccounts invite in a short time.</multiline>
                            </td>
                          </tr>
                        </table>
                        <!-- END Section 2 -->
                      </td>
                    </tr>
                    <tr>
                        <td class="fluid-img"style="font-size:30px; text-align:left;height:50px">
                        </td>
                    </tr>
                    <tr>
                        <td class="fluid-img"  style="font-size: 24px;font-weight: bold; text-align:left;">
                        <multiline>Regards,</multiline>
                        </td>
                    </tr>
                    <tr>
                        <td class="fluid-img" style="font-size: 24px;font-weight: bold;text-align:left;">
                        <multiline>SimpleAccounts Team</multiline>
                        </td>
                    </tr>
                  </table>
                  <!-- END Main -->

                </td>
              </tr>


            </table>
          </body>
          </html>
          `
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
