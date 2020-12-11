"use strict"
const nodemailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport")
require("dotenv").config()

function listItems(lineItems) {
  let return_string = "<div>"
  for (let i = 0; i < lineItems.length; i++) {
    const item = lineItems[i]
    return_string += `<br />Item ${i + 1}: ${item.title}<br />`
    const variants = Object.keys(item.variants)
    for (let variant of variants) {
      return_string += `${variant}: ${item.variants[variant]}<br />`
    }
    return_string += `Customization: ${item.customization}<br />`
  }
  return_string += `<br /></div>`
  return return_string
}

// async..await is not allowed in global scope, must use a wrapper
async function main(order) {
  const { customer, lineItems } = order
  const customer_email = customer.customer.email
  const customer_name = customer.customer.name ? order.customer.name + " " : ""
  const customer_address = customer.session.shipping.address
  const total_paid = customer.session.amount_total

  // let transporter = nodemailer.createTransport(
  //   smtpTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.EMAIL_ADDRESS,
  //       pass: process.env.EMAIL_PASSWORD,
  //     },
  //   })
  // )
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SEND_BLUE_EMAIL_ADDRESS,
      pass: process.env.SEND_BLUE_EMAIL_PASSWORD,
    },
  })
  console.log(transporter)
  // send mail with defined transport object
  transporter.sendMail(
    {
      from: '"Penny Bug & Co 🐾 " <info@pennybug.co>', // sender address
      to: `info@pennybug.co, ${customer_email}`, // list of receivers
      subject: `🎁`, // Subject line
      text: `Order for ${customer_email}`, // plain text body
      html: `<div>Order Number: ${customer.session.id}<br />
          For: ${customer_name}${customer_email}<br />
          ${listItems(lineItems)}
          Total: ${total_paid}<br />
          Deliver To: ${customer_address.line1}, ${
        customer_address.line2 ? customer_address.line2 + ", " : ""
      }${customer_address.city}, ${customer_address.state}, ${
        customer_address.postal_code
      }
    </div>`, // html body
    },
    (err, info) => {
      console.log("========sendMail callback==========")
      if (err) {
        console.log(err)
      }
      console.log(info.envelope)
      console.log(info.messageId)
    }
  )

  // console.log("Message sent: %s", info.messageId)
  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

exports.handler = async function (event, context) {
  const body = JSON.parse(event.body)
  console.log(body)
  const order = body.orderInfo
  main(order).catch(console.error)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Email sent" }),
  }
}
