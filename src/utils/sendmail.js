import nodemailer from "nodemailer"

export const sendMail =async ({to,subject,html,text,attachments})=>{

const transporter = nodemailer.createTransport({
    host:"localhost",
    port:465,
    secure:true,
    service:"gmail",
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }


})

const info = await transporter.sendMail({
    from:`"Ecommerce App" ${process.env.EMAIL}`,
    to,
    subject,
    html,
    text,
    attachments
})
return info.accepted.length>0 ? true : false

}