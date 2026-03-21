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
            from: `"SolarDry Solutions" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
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
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: #f4f4f4;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background: #ffffff;">
                <!-- Header -->
                <tr>
                    <td style="background: linear-gradient(135deg, #264653 0%, #2a9d8f 100%); padding: 30px 40px; text-align: center;">
                        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">
                            ☀️ SolarDry Solutions
                        </h1>
                        <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">
                            New Contact Form Submission
                        </p>
                    </td>
                </tr>
                
                <!-- Alert Banner -->
                <tr>
                    <td style="background: #e9c46a; padding: 12px 40px; text-align: center;">
                        <p style="margin: 0; font-size: 14px; font-weight: 600; color: #264653;">
                            📬 You have a new message from your website!
                        </p>
                    </td>
                </tr>
                
                <!-- Content -->
                <tr>
                    <td style="padding: 30px 40px;">
                        <!-- Sender Info -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                            <tr>
                                <td style="padding: 16px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #2a9d8f;">
                                    <h3 style="margin: 0 0 12px; color: #264653; font-size: 16px;">
                                        👤 Sender Information
                                    </h3>
                                    <table role="presentation" cellspacing="0" cellpadding="4">
                                        <tr>
                                            <td style="color: #666; font-weight: 600; padding-right: 16px; white-space: nowrap;">Name:</td>
                                            <td style="color: #333;">${messageData.name}</td>
                                        </tr>
                                        <tr>
                                            <td style="color: #666; font-weight: 600; padding-right: 16px; white-space: nowrap;">Email:</td>
                                            <td><a href="mailto:${messageData.email}" style="color: #2a9d8f; text-decoration: none;">${messageData.email}</a></td>
                                        </tr>
                                        <tr>
                                            <td style="color: #666; font-weight: 600; padding-right: 16px; white-space: nowrap;">Phone:</td>
                                            <td><a href="tel:${messageData.phone}" style="color: #2a9d8f; text-decoration: none;">${messageData.phone}</a></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Subject -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">
                            <tr>
                                <td>
                                    <h3 style="margin: 0 0 8px; color: #264653; font-size: 16px;">
                                        📋 Subject
                                    </h3>
                                    <p style="margin: 0; padding: 12px 16px; background: #e8f4f2; border-radius: 6px; color: #264653; font-weight: 600;">
                                        ${messageData.subject}
                                    </p>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Message -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                    <h3 style="margin: 0 0 8px; color: #264653; font-size: 16px;">
                                        💬 Message
                                    </h3>
                                    <p style="margin: 0; padding: 16px; background: #f8f9fa; border-radius: 8px; color: #333; line-height: 1.6; border: 1px solid #e8ecf0;">
                                        ${messageData.message}
                                    </p>
                                </td>
                            </tr>
                        </table>
                        
                        <!-- Reply Button -->
                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 24px;">
                            <tr>
                                <td style="text-align: center;">
                                    <a href="mailto:${messageData.email}?subject=Re: ${messageData.subject}" 
                                       style="display: inline-block; padding: 12px 32px; background: #2a9d8f; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                                        Reply to ${messageData.name} →
                                    </a>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                
                <!-- Timestamp -->
                <tr>
                    <td style="padding: 16px 40px; background: #f8f9fa; border-top: 1px solid #e8ecf0;">
                        <p style="margin: 0; font-size: 12px; color: #999; text-align: center;">
                            📅 Received on: ${new Date().toLocaleString('en-IN', { 
                                dateStyle: 'full', 
                                timeStyle: 'medium', 
                                timeZone: 'Asia/Kolkata' 
                            })}
                        </p>
                    </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                    <td style="background: #264653; padding: 20px 40px; text-align: center;">
                        <p style="margin: 0 0 8px; color: rgba(255,255,255,0.7); font-size: 12px;">
                            This email was sent from the SolarDry Solutions contact form.
                        </p>
                        <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 11px;">
                            SSVPS's B. S. Deore College of Engineering, Dhule, MS, India
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;

    return sendEmailNotification(
        process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        `🌞 New Contact: ${messageData.subject} - from ${messageData.name}`,
        html
    );
};
