"use strict"
const nodemailer = require("nodemailer")
require("dotenv").config()

// async..await is not allowed in global scope, must use a wrapper
async function main(order) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  })
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Penny Bug & Co 🐾 " <info@pennybug.co>', // sender address
    to: "ken@suavecito.com", // list of receivers
    subject: `New Order #${order.order_number}`, // Subject line
    text: `New order received for ${order.contents}`, // plain text body
    html: `<b>New Order Received</b>`, // html body
  })

  console.log("Message sent: %s", info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body)
  console.log(body)
  //main(body).catch(console.error)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Email sent" }),
  }
}
