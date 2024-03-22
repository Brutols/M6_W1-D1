const express = require('express')
const email = express.Router()
const { createTransport } = require('nodemailer')

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jewell.hermiston@ethereal.email',
        pass: 'Wv64BkPbvZ5txJFKHY'
    }
});

email.post('/sendEmail', async (req, res) => {
    const { recipient, subject, text } = req.body

    const mailOptions = {
        from: 'noreply@example.com',
        to: recipient,
        subject,
        html: `<p><strong>TEST</strong></p>`,
        text
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
           res.status(403).send({
                message: 'Oops qualcosa è andato storto'
            })
        } else {
            console.log('email inviata')
            res.send('Email sent successfully')
        }
    })
})

module.exports = email