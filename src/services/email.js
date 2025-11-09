import axios from 'axios';
import { env } from '../utils/env.js';

export const sendEmail = async (options) => {
  const apiKey = env('BREVO_API_KEY');
  const emailFrom = env('EMAIL_FROM');
  
  if (!apiKey) {
    throw new Error('BREVO_API_KEY environment variable is not set');
  }
  
  if (!emailFrom) {
    throw new Error('EMAIL_FROM environment variable is not set');
  }

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: 'Contact Manager',
          email: emailFrom,
        },
        to: [
          {
            email: options.to,
          },
        ],
        subject: options.subject,
        htmlContent: options.html,
      },
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Email sent successfully:', response.status);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error.message);
    throw error;
  }
};