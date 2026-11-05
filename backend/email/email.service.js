const nodemailer = require('nodemailer');

const { getPasswordResetTemplate } = require('./templates/passwordResetTemplate');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async ({ to, subject, html, text }) => {
    return await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        text
    });
};

const sendPasswordResetEmail = async ({ email, otp, name }) => {
    const template = getPasswordResetTemplate({ otp, name });

    return await sendMail({
        to: email,
        subject: template.subject,
        html: template.html,
        text: template.text
    });
};

module.exports = {
    sendMail,
    sendPasswordResetEmail
};