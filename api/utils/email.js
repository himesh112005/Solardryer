import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendEmailNotification = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true;
    } catch (error) {
        console.error('Email error:', error);
        return false;
    }
};

export const sendContactNotification = async (messageData) => {
    const html = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${messageData.name}</p>
        <p><strong>Email:</strong> ${messageData.email}</p>
        <p><strong>Phone:</strong> ${messageData.phone}</p>
        <p><strong>Subject:</strong> ${messageData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${messageData.message}</p>
    `;

    return sendEmailNotification(
        process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        `New Contact: ${messageData.subject}`,
        html
    );
};
