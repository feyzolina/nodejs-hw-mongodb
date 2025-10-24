# Node.js MongoDB Contact API with Authentication

Bu proje, MongoDB ve Express.js kullanarak geliştirilmiş, kimlik doğrulama sistemi olan bir kişi yönetim API'sidir.

## Özellikler

- ✅ Express.js backend server
- ✅ MongoDB ile veri saklama
- ✅ Mongoose ODM
- ✅ CORS desteği
- ✅ Environment variables
- ✅ ESLint ve Prettier yapılandırması

## API Endpoints

### GET /contacts
Tüm kişileri getirir.

**Response:**
```json
{
  "status": 200,
  "message": "Successfully found contacts!",
  "data": [
    {
      "_id": "contact_id",
      "name": "John Doe",
      "phoneNumber": "+1234567890",
      "email": "john@example.com",
      "isFavourite": false,
      "contactType": "personal",
      "createdAt": "2025-09-21T00:00:00.000Z",
      "updatedAt": "2025-09-21T00:00:00.000Z"
    }
  ]
}
```

### GET /contacts/:contactId
Belirli bir kişiyi ID ile getirir.

**Response (Success):**
```json
{
  "status": 200,
  "message": "Successfully found contact with id {contactId}!",
  "data": {
    "_id": "contact_id",
    "name": "John Doe",
    "phoneNumber": "+1234567890",
    "email": "john@example.com",
    "isFavourite": false,
    "contactType": "personal",
    "createdAt": "2025-09-21T00:00:00.000Z",
    "updatedAt": "2025-09-21T00:00:00.000Z"
  }
}
```

**Response (Not Found):**
```json
{
  "message": "Contact not found"
}
```

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
Render.com'da aşağıdaki environment variables'ları ayarladığınızdan emin olun:
- `PORT` - Render otomatik olarak ayarlar
- `MONGODB_USER`
- `MONGODB_PASSWORD`
- `MONGODB_URL`
- `MONGODB_DB`

## Technology Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
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
│   │   └── contacts.js
│   ├── db/
│   │   ├── models/
│   │   │   └── Contact.js
│   │   └── initMongoConnection.js
│   ├── services/
│   │   └── contacts.js
│   ├── index.js
│   └── server.js
├── .env.example
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── contacts.json
├── package.json
└── README.md
``` project
