# Node.js MongoDB Contact API with Authentication & Email

Bu proje, MongoDB ve Express.js kullanarak geliştirilmiş, kimlik doğrulama sistemi, e-posta gönderimi ve resim yükleme özelliklerine sahip bir kişi yönetim API'sidir.

## Özellikler

- ✅ Express.js backend server
- ✅ MongoDB ile veri saklama
- ✅ Mongoose ODM
- ✅ JWT tabanlı kimlik doğrulama sistemi
- ✅ Kullanıcı kayıt ve giriş işlemleri
- ✅ Session yönetimi (access token + refresh token)
- ✅ E-posta ile şifre sıfırlama (Brevo SMTP)
- ✅ Cloudinary entegrasyonu ile resim yükleme
- ✅ Multipart/form-data desteği
- ✅ Kullanıcı izolasyonu (her kullanıcı sadece kendi verilerini görür)
- ✅ Validation ve error handling
- ✅ Pagination, sorting ve filtering
- ✅ CORS desteği
- ✅ Environment variables
- ✅ ESLint ve Prettier yapılandırması

## API Endpoints

### Authentication Endpoints

#### POST /auth/register
Yeni kullanıcı kaydı oluşturur.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /auth/login
Kullanıcı girişi yapar ve session oluşturur.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### POST /auth/refresh
Access token'ı yeniler.

#### POST /auth/logout
Kullanıcının session'ını sonlandırır.

#### POST /auth/send-reset-email
Şifre sıfırlama e-postası gönderir.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

#### POST /auth/reset-pwd
Şifre sıfırlama işlemini tamamlar.

**Request Body:**
```json
{
  "token": "jwt_reset_token",
  "password": "newpassword123"
}
```

### Contact Endpoints (Kimlik doğrulama gerekli)

#### GET /contacts
Kullanıcının tüm kişilerini getirir. Pagination, sorting ve filtering desteği.

**Query Parameters:**
- `page` - Sayfa numarası (varsayılan: 1)
- `perPage` - Sayfa başına öğe sayısı (varsayılan: 10)
- `sortBy` - Sıralama alanı (varsayılan: _id)
- `sortOrder` - Sıralama yönü (asc/desc, varsayılan: asc)
- `type` - Kişi türü filtresi (work/home/personal)
- `isFavourite` - Favori filtresi (true/false)

#### GET /contacts/:contactId
Belirli bir kişiyi ID ile getirir.

#### POST /contacts
Yeni kişi oluşturur. Resim yükleme desteği (multipart/form-data).

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `name` - Kişi adı (zorunlu)
- `phoneNumber` - Telefon numarası (zorunlu)
- `email` - E-posta adresi (opsiyonel)
- `contactType` - Kişi türü (work/home/personal, zorunlu)
- `isFavourite` - Favori durumu (boolean, opsiyonel)
- `photo` - Resim dosyası (opsiyonel)

#### PATCH /contacts/:contactId
Mevcut kişiyi günceller. Resim yükleme desteği (multipart/form-data).

#### DELETE /contacts/:contactId
Kişiyi siler.

## Installation

1. Projeyi klonlayın:
```bash
git clone https://github.com/feyzolina/nodejs-hw-mongodb.git
cd nodejs-hw-mongodb
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables'ları ayarlayın:
`.env` dosyası oluşturun ve aşağıdaki bilgileri ekleyin:
```
PORT=3000
MONGODB_USER=your_username
MONGODB_PASSWORD=your_password
MONGODB_URL=your_mongodb_url
MONGODB_DB=your_database_name

# JWT Configuration
JWT_SECRET=your_jwt_secret

# SMTP Configuration (Brevo)
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_email
SMTP_PASSWORD=your_brevo_smtp_key
SMTP_FROM=your_verified_sender_email

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Application URL (for email links)
APP_DOMAIN=http://localhost:3000
```

4. Sunucuyu başlatın:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Deployment

Bu proje Render.com'a deploy edilmiştir.

### Environment Variables (Render.com)

**🔧 Render.com Dashboard → Service → Environment sekmesinde aşağıdaki değişkenleri ayarlayın:**

#### 🔒 **Zorunlu Variables (Minimum çalışma için):**
```bash
MONGODB_USER=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password  
MONGODB_URL=your_mongodb_cluster_url
MONGODB_DB=your_database_name
JWT_SECRET=your_random_jwt_secret_key_here
```

#### 📧 **Email Özelliği için (hw6 password reset):**
```bash
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_brevo_login_email
SMTP_PASSWORD=your_brevo_smtp_api_key
SMTP_FROM=your_verified_sender_email
```

#### 🖼️ **Image Upload için (hw6 Cloudinary):**
```bash
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

#### 🌐 **Application Domain:**
```bash
APP_DOMAIN=https://your-app-name.onrender.com
```

#### ⚠️ **Önemli Notlar:**
- **JWT_SECRET** eksik olursa authentication çalışmaz
- **SMTP credentials** eksik olursa email reset çalışmaz (500 error)
- **Cloudinary credentials** eksik olursa image upload çalışmaz
- Tüm değişkenler eklendikten sonra service otomatik restart olur
- `API_SECRET`
- `APP_DOMAIN` - Deployed app URL'iniz

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Email Service:** Nodemailer + Brevo SMTP
- **File Upload:** Multer
- **Cloud Storage:** Cloudinary
- **Validation:** Joi
- **Environment:** dotenv
- **Logging:** Pino
- **Development:** Nodemon
- **Linting:** ESLint
- **Formatting:** Prettier

## Project Structure

```
nodejs-hw-mongodb/
├── src/
│   ├── controllers/
│   │   ├── contacts.js
│   │   └── auth.js
│   ├── db/
│   │   ├── models/
│   │   │   ├── Contact.js
│   │   │   ├── User.js
│   │   │   └── Session.js
│   │   └── initMongoConnection.js
│   ├── services/
│   │   ├── contacts.js
│   │   ├── auth.js
│   │   └── email.js
│   ├── routers/
│   │   ├── contacts.js
│   │   └── auth.js
│   ├── middlewares/
│   │   ├── authenticate.js
│   │   ├── validateBody.js
│   │   ├── isValidId.js
│   │   ├── multer.js
│   │   └── errorHandler.js
│   ├── validation/
│   │   ├── contacts.js
│   │   └── auth.js
│   ├── utils/
│   │   ├── env.js
│   │   ├── ctrlWrapper.js
│   │   └── saveFileToCloudinary.js
│   ├── constants/
│   │   └── index.js
│   ├── index.js
│   └── server.js
├── temp/ (git ignored)
├── .env.example
├── .gitignore
├── .gitattributes
├── render.yaml
├── contacts.json
├── package.json
└── README.md
```

## Homework Branches

- `hw2-mongodb` - MongoDB bağlantısı ve temel yapı
- `hw3-crud` - CRUD işlemleri ve error handling
- `hw4-validation` - Validation, pagination, sorting, filtering
- `hw5-auth` - JWT authentication ve user management
- `hw6-email-and-images` - Email password reset ve image upload
