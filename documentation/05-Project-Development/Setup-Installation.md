# Setup & Installation Guide

## Prerequisites

- Node.js v16 or higher
- npm or yarn package manager
- MongoDB (local or MongoDB Atlas account)
- Git
- Code editor (VS Code recommended)

## Project Structure Setup

```
e-commerce/
├── frontend/          (React + Vite)
├── backend/           (Express + Node.js)
└── documentation/     (Project docs)
```

## Backend Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create `.env` file in backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_EXPIRE=24h

# Payment Gateway
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 3. Start Backend Server

```bash
npm start
# Server runs on http://localhost:5000
```

For development with auto-reload:
```bash
npm run dev
```

## Frontend Setup

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment Variables

Create `.env` file in frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=E-Commerce Platform
```

### 3. Start Development Server

```bash
npm run dev
# Application runs on http://localhost:5173
```

### 4. Build for Production

```bash
npm run build
```

## Database Setup

### Using MongoDB Atlas

1. Create account at [mongodb.com](https://www.mongodb.com)
2. Create a new cluster
3. Get connection string
4. Update `.env` file with connection string

### Using Local MongoDB

```bash
# Start MongoDB service
mongod

# In another terminal, initialize database
cd backend
npm run seed
```

### Seed Database with Sample Data

```bash
cd backend
npm run seed
```

### Clear Database

```bash
cd backend
npm run clear-db
```

## Verification

### Backend Verification

Test API endpoint:
```bash
curl http://localhost:5000/api/products
```

### Frontend Verification

- Open http://localhost:5173 in browser
- Should see homepage with product list
- Check browser console for errors

## Development Workflow

1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd frontend && npm run dev`
3. **Open Browser**: http://localhost:5173
4. **Make Changes**: Changes auto-reload
5. **Test APIs**: Use Postman or similar tool

## Troubleshooting

### Backend Won't Start
- Check if port 5000 is in use
- Verify MongoDB connection string
- Check `.env` file exists and is valid

### Frontend Won't Connect to Backend
- Verify backend is running
- Check CORS settings in `.env`
- Check browser console for errors

### Database Connection Error
- Verify MongoDB service is running
- Check connection string format
- Verify username and password

### Port Already in Use
```bash
# Find process using port 5000 (on Windows)
netstat -ano | findstr :5000

# Kill process (replace PID with actual ID)
taskkill /PID <PID> /F
```

## Package Scripts

### Backend
```json
{
  "start": "node index.js",
  "dev": "nodemon index.js",
  "seed": "node forceSeed.js",
  "clear": "node clearDb.js"
}
```

### Frontend
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint src"
}
```

## Next Steps

1. Seed database with sample data
2. Test API endpoints using Postman
3. Verify frontend loads without errors
4. Start development on features
