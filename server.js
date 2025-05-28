require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

process.on('uncaughtException', err => {
    console.error('Uncaught Exception:', err);
});

app.post('/test', async (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.post('/sms', async (req, res) => {
    const smsBody = req.body.Body;

    const match = smsBody.match(/EMAILTO:(.*?)\s+SUBJECT:(.*?)\s+BODY:(.*)/is);
    if (!match) {
        return res.send(`<Response><Message>❌ Invalid format. Use: EMAILTO:... SUBJECT:... BODY:...</Message></Response>`);
    }

    const [, to, subject, body] = match;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: to.trim(),
            subject: subject.trim(),
            text: body.trim()
        });

        res.send(`<Response><Message>✅ Email sent to ${to.trim()}</Message></Response>`);
    } catch (error) {
        console.error('Email error:', error);
        res.send(`<Response><Message>❌ Failed to send email: ${error.message}</Message></Response>`);
    }
});

app.get('/', (req, res) => {
    res.send('SMS-to-Email Server is Running!');
});

app.listen(3005, () => {
    console.log('Server running on port 3005');
});
