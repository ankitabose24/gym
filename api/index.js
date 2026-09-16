const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. CORS & Body Parsers
app.use(cors({
     origin: '*',
     methods: ['GET', 'POST', 'OPTIONS'],
     allowedHeaders: ['Content-Type']
 }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
 // Sanitization helper
function sanitize(str) {
     if (!str || typeof str !== 'string') return '';
     return str.replace(/[&<>"']/g, (m) => ({
         '&': '&amp;',
         '<': '&lt;',
         '>': '&gt;',
         '"': '&quot;',
         "'": '&#39;'
     })[m]).trim();
}
 
 // Email regex check
 function isValidEmail(email) {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailRegex.test(String(email).toLowerCase());
 }
 
 // 2. Health Endpoint
 app.get('/api/health', (req, res) => {
     res.status(200).json({ status: 'OK', message: 'API is running' });
 });
 
// 3. POST /api/contact
app.post('/api/contact', async (req, res) => {
     try {
         const { name, email, phone, program, message } = req.body;
 
         // Backend Validation
         const errors = [];
         if (!name || typeof name !== 'string' || name.trim().length < 2) {
             errors.push('Full name must be at least 2 characters long.');
         }
         if (!email || !isValidEmail(email)) {
             errors.push('A valid email address is required.');
         }
         if (!message || typeof message !== 'string' || message.trim().length < 5) {
             errors.push('Message must be at least 5 characters long.');
         }
 
         if (errors.length > 0) {
             return res.status(400).json({
                 success: false,
                 error: 'Validation failed',
                 details: errors
             });
         }
 
         const safeName = sanitize(name);
         const safeEmail = sanitize(email);
         const safePhone = sanitize(phone) || 'Not provided';
         const safeProgram = sanitize(program) || 'General Inquiry';
         const safeMessage = sanitize(message); 
         // Setup Transporter
         let transporter;
         let isTestAccount = false;
 
         if (process.env.SMTP_USER && process.env.SMTP_PASS) {
             transporter = nodemailer.createTransport({
                 host: process.env.SMTP_HOST || 'smtp.gmail.com',
                 port: parseInt(process.env.SMTP_PORT || '587', 10),
                 secure: process.env.SMTP_SECURE === 'true',
                 auth: {
                     user: process.env.SMTP_USER,
                    pass: (process.env.SMTP_PASS || '').replace(/\s+/g, '')
                 }
             });
         } else {
             console.log('⚠️ No SMTP credentials found. Creating Ethereal test inbox...');
             const testAccount = await nodemailer.createTestAccount();
             isTestAccount = true;
             transporter = nodemailer.createTransport({
                 host: 'smtp.ethereal.email',
                 port: 587,
                 secure: false,
                 auth: {
                     user: testAccount.user,
                     pass: testAccount.pass
                 }
             });
         }
 
         const companyEmail = process.env.COMPANY_EMAIL || 'hello@fuerzaviva.in';
 
         const mailOptions = {
             from: `"FUERZA VIVA Contact" <${process.env.SMTP_USER || 'no-reply@fuerzaviva.in'}>`,
             to: companyEmail,
             replyTo: safeEmail,
             subject: `[FUERZA VIVA Lead] ${safeName} - ${safeProgram}`,
             text: `
 NEW GYM INQUIRY - FUERZA VIVA
 -----------------------------
 Name: ${safeName}
 Email: ${safeEmail}
 Phone: ${safePhone}
 Selected Program: ${safeProgram}
 Date: ${new Date().toLocaleString()}
 
 Message:
 ${safeMessage}
             `,
             html: `
             <div style="font-family: Arial, sans-serif; background-color: #0c0c0c; color: #ffffff; padding: 30px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #222;">
                 <div style="border-bottom: 2px solid #ff5500; padding-bottom: 15px; margin-bottom: 20px;">
                     <h2 style="color: #ffffff; margin: 0; letter-spacing: 2px;">FUERZA <span style="color: #ff5500;">VIVA</span></h2>
                     <p style="color: #888888; font-size: 12px; margin: 5px 0 0 0;">NEW CONTACT FORM INQUIRY</p>
                 </div>
                 
                 <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                    <tr>
                         <td style="padding: 8px 0; color: #888888; width: 140px;"><strong>Name:</strong></td>
                         <td style="padding: 8px 0; color: #ffffff;">${safeName}</td>
                     </tr>
                     <tr>
                         <td style="padding: 8px 0; color: #888888;"><strong>Email:</strong></td>
                         <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${safeEmail}" style="color: #ff5500; text-decoration: none;">${safeEmail}</a></td>
                     </tr>
                     <tr>
                         <td style="padding: 8px 0; color: #888888;"><strong>Phone:</strong></td>
                         <td style="padding: 8px 0; color: #ffffff;">${safePhone}</td>
                     </tr>
                     <tr>
                         <td style="padding: 8px 0; color: #888888;"><strong>Program:</strong></td>
                         <td style="padding: 8px 0; color: #ff5500; font-weight: bold;">${safeProgram}</td>
                     </tr>
                     <tr>
                         <td style="padding: 8px 0; color: #888888;"><strong>Date & Time:</strong></td>
                         <td style="padding: 8px 0; color: #888888; font-size: 12px;">${new Date().toLocaleString()}</td>
                     </tr>
                 </table>
 
                 <div style="background-color: #171717; border-left: 4px solid #ff5500; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                     <h4 style="margin: 0 0 10px 0; color: #888888; font-size: 12px; text-transform: uppercase;">Message</h4>
                     <p style="margin: 0; line-height: 1.6; color: #dddddd; white-space: pre-wrap;">${safeMessage}</p>
                 </div>
             </div>
             `
         };
 
         const info = await transporter.sendMail(mailOptions);
         console.log('✅ Email successfully dispatched! Message ID:', info.messageId);
 
         let previewUrl = null;
         if (isTestAccount) {
             previewUrl = nodemailer.getTestMessageUrl(info);
             console.log('📬 View test email in browser:', previewUrl);
         }
 
         return res.status(200).json({
             success: true,
             message: 'Your inquiry has been sent successfully! We will contact you soon.',
             previewUrl: previewUrl
         });
 
     } catch (err) {
         console.error('❌ SMTP Error:', err);
         return res.status(500).json({
             success: false,
             error: 'Failed to send inquiry email. Please try again later.'
         });
     }
 });
 
 module.exports = app;