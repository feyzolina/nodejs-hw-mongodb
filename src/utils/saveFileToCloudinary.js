import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';

// Configure Cloudinary with environment variables
cloudinary.config({
    secure: true,
    cloud_name: env('CLOUD_NAME', ''),
    api_key: env('API_KEY', ''),
    api_secret: env('API_SECRET', ''),
});

export const saveFileToCloudinary = async (file, folder) => {
    if (!env('CLOUD_NAME', '') || !env('API_KEY', '') || !env('API_SECRET', '')) {
        throw new Error('Cloudinary configuration missing. Please set CLOUD_NAME, API_KEY, and API_SECRET environment variables.');
    }
    
    const response = await cloudinary.uploader.upload(file.path, {
        folder,
    });

    // Clean up temporary file
    await fs.unlink(file.path);

    return response.secure_url;
};