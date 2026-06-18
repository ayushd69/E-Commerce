# API Design & Endpoints

## API Overview

The API follows RESTful principles with JSON request/response format. All API endpoints require authentication (JWT token) except for public endpoints (login, register, product browsing).

## Base URL
```
Development: http://localhost:5000/api
Production: https://api.ecommerce.com/api
```

## Authentication Header
```
Authorization: Bearer <JWT_TOKEN>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## API Endpoints

### Authentication Routes

#### Register User
```
POST /auth/register
Content-Type: application/json

Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "userId": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "john@example.com"
  },
  "message": "Registration successful"
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

Request:
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "60f7b3b3b3b3b3b3b3b3b3b3",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

### Product Routes

#### Get All Products
```
GET /products?page=1&limit=10&category=5f9e1b1b1b1b1b1b1b1b1b1b&sort=price

Response: 200 OK
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "60f7b3b3b3b3b3b3b3b3b3b3",
        "name": "Product Name",
        "price": 99.99,
        "image": "https://...",
        "category": "Electronics",
        "rating": 4.5
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100
    }
  }
}
```

#### Get Product by ID
```
GET /products/:id

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "stock": 50,
    "images": ["https://...", "https://..."],
    "category": "Electronics",
    "rating": 4.5,
    "reviews": []
  }
}
```

#### Create Product (Admin Only)
```
POST /products
Authorization: Bearer <TOKEN>
Content-Type: multipart/form-data

Request:
{
  "name": "New Product",
  "description": "Product description",
  "price": 99.99,
  "categoryId": "5f9e1b1b1b1b1b1b1b1b1b1b",
  "stock": 50,
  "images": [file1, file2]
}

Response: 201 Created
```

#### Update Product (Admin Only)
```
PUT /products/:id
Authorization: Bearer <TOKEN>

Response: 200 OK
```

#### Delete Product (Admin Only)
```
DELETE /products/:id
Authorization: Bearer <TOKEN>

Response: 200 OK
```

### Order Routes

#### Create Order
```
POST /orders
Authorization: Bearer <TOKEN>
Content-Type: application/json

Request:
{
  "items": [
    {
      "productId": "60f7b3b3b3b3b3b3b3b3b3b3",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "shippingMethod": "standard"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "orderId": "60f7b3b3b3b3b3b3b3b3b3b3",
    "orderNumber": "ORD-2024-001",
    "totalAmount": 250.00,
    "status": "pending"
  }
}
```

#### Get Order by ID
```
GET /orders/:id
Authorization: Bearer <TOKEN>

Response: 200 OK
```

#### Get User Orders
```
GET /orders
Authorization: Bearer <TOKEN>

Response: 200 OK
```

#### Update Order Status (Admin Only)
```
PATCH /orders/:id/status
Authorization: Bearer <TOKEN>

Request:
{
  "status": "shipped"
}

Response: 200 OK
```

### Payment Routes

#### Create Payment
```
POST /payment/process
Authorization: Bearer <TOKEN>
Content-Type: application/json

Request:
{
  "orderId": "60f7b3b3b3b3b3b3b3b3b3b3",
  "amount": 250.00,
  "paymentMethod": "credit_card",
  "cardDetails": {
    "number": "4242424242424242",
    "exp_month": 12,
    "exp_year": 2025,
    "cvc": "123"
  }
}

Response: 200 OK
```

### User Routes

#### Get User Profile
```
GET /users/profile
Authorization: Bearer <TOKEN>

Response: 200 OK
```

#### Update User Profile
```
PUT /users/profile
Authorization: Bearer <TOKEN>

Response: 200 OK
```

### Category Routes

#### Get All Categories
```
GET /categories

Response: 200 OK
```

#### Create Category (Admin Only)
```
POST /categories
Authorization: Bearer <TOKEN>

Response: 201 Created
```

## Rate Limiting

- **General**: 100 requests/minute per user
- **Auth**: 5 login attempts/15 minutes
- **Payment**: 3 attempts/minute

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| INVALID_CREDENTIALS | 401 | Invalid email or password |
| TOKEN_EXPIRED | 401 | JWT token has expired |
| UNAUTHORIZED | 403 | User not authorized |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Input validation failed |
| SERVER_ERROR | 500 | Internal server error |
