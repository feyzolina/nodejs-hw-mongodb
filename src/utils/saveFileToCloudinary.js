import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';

// Don't configure Cloudinary during import to avoid startup errors
let isConfigured = false;

const configureCloudinary = () => {
    if (!isConfigured) {
        const cloudName = env('CLOUD_NAME', '');
        const apiKey = env('API_KEY', '');
        const apiSecret = env('API_SECRET', '');
        
        if (!cloudName || !apiKey || !apiSecret) {
            throw new Error('Cloudinary configuration missing. Please set CLOUD_NAME, API_KEY, and API_SECRET environment variables.');
        }
        
        cloudinary.config({
            secure: true,
            cloud_name: cloudName,
            api_key: apiKey,
            api_secret: apiSecret,
        });
        
        isConfigured = true;
    }
};

export const saveFileToCloudinary = async (file, folder) => {
    configureCloudinary();
    
    const response = await cloudinary.uploader.upload(file.path, {
        folder,
    });

    // Clean up temporary file
    await fs.unlink(file.path);

    return response.secure_url;
};