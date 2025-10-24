import dotenv from 'dotenv';

// Ensure dotenv is configured
dotenv.config();

export const env = (name, defaultValue) => {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  // Log available environment variables for debugging
  console.error(`Missing environment variable: ${name}`);
  console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('CLOUD') || key.includes('API') || key.includes('SMTP')));
  
  throw new Error(`Missing environment variable: ${name}`);
};