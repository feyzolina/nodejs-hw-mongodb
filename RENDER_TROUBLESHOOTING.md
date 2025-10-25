# Render.com Deployment Troubleshooting

## Common Issues and Solutions

### 🚨 JWT_SECRET Missing Error
**Error:** "Missing environment variable: JWT_SECRET"
**Solution:** 
1. Go to Render.com Dashboard → Your Service → Environment
2. Add: `JWT_SECRET` = `your_random_secret_key_here`
3. Use a strong random string like: `my-super-secret-jwt-key-2024-hw6-mongodb-api`

### 📧 Email Reset Not Working
**Error:** "Email service not configured" or SMTP errors
**Solution:**
Add Brevo SMTP credentials:
```
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_email
SMTP_PASSWORD=your_brevo_smtp_key
SMTP_FROM=your_verified_sender_email
```

### 🖼️ Image Upload Failing
**Error:** "Cloudinary configuration missing"
**Solution:**
Add Cloudinary credentials:
```
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 🔍 How to Debug Environment Variables

1. Check Render.com logs for specific missing variables
2. Verify all variables are added in Environment tab
3. Ensure no typos in variable names
4. Restart service after adding variables

### 📋 Complete Environment Variables Checklist

- [ ] `MONGODB_USER`
- [ ] `MONGODB_PASSWORD`
- [ ] `MONGODB_URL`
- [ ] `MONGODB_DB`
- [ ] `JWT_SECRET` ⚠️ **Critical**
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASSWORD`
- [ ] `SMTP_FROM`
- [ ] `CLOUD_NAME`
- [ ] `API_KEY`
- [ ] `API_SECRET`
- [ ] `APP_DOMAIN`

### 🎯 Test Endpoints After Setup

1. **Authentication:**
   - POST `/auth/register` - Should work with just JWT_SECRET
   - POST `/auth/login` - Should work with just JWT_SECRET

2. **Password Reset:**
   - POST `/auth/send-reset-email` - Needs JWT_SECRET + SMTP vars
   - POST `/auth/reset-pwd` - Needs JWT_SECRET

3. **Contacts:**
   - GET `/contacts` - Should work with authentication
   - POST `/contacts` (with image) - Needs Cloudinary vars