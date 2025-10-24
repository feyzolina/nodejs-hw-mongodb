import nodemailer from 'nodemailer';
import { env } from '../utils/env.js';

let transporter = null;

const getTransporter = () => {
    if (!transporter) {
        const smtpHost = env('SMTP_HOST', '');
        const smtpPort = env('SMTP_PORT', '');
        const smtpUser = env('SMTP_USER', '');
        const smtpPassword = env('SMTP_PASSWORD', '');
        
        if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
            throw new Error('Email service not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD environment variables.');
        }
        
        transporter = nodemailer.createTransporter({
            host: smtpHost,
            port: Number(smtpPort),
            secure: false, // STARTTLS
            auth: {
                user: smtpUser,
                pass: smtpPassword,
            },
        });
    }
    return transporter;
};

export const sendEmail = async (options) => {
    const emailTransporter = getTransporter();
    const smtpFrom = env('SMTP_FROM', '');
    
    if (!smtpFrom) {
        throw new Error('Email service not configured. Please set SMTP_FROM environment variable.');
    }
    
    return await emailTransporter.sendMail({
        from: smtpFrom,
        to: options.to,
        subject: options.subject,
        html: options.html,
    });
};