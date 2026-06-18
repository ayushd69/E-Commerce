# API Documentation

## Complete API Reference

This document provides detailed information about all API endpoints, including request/response examples and error codes.

## Base Configuration

- **Base URL**: `http://localhost:5000/api` (Development)
- **Authentication**: JWT Bearer Token
- **Content-Type**: application/json
- **Response Format**: JSON

## Authentication Endpoints

### Register New User
```http
POST /auth/register

Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "507f1f77bcf86cd799439011",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

---

### Login User
```http
POST /auth/login

Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

---

## Product Endpoints

### Get All Products
```http
GET /products?page=1&limit=10&category=507f1f77bcf86cd799439011&sort=price

Authorization: Bearer <token>
```

**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category ID
- `sort`: Sort by field (price, rating, newest)
- `search`: Search term

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "507f1f77bcf86cd799439011",
        "name": "Laptop",
        "description": "High-performance laptop",
        "price": 999.99,
        "discount": 10,
        "stock": 50,
        "categoryId": "507f1f77bcf86cd799439012",
        "image": "https://example.com/laptop.jpg",
        "rating": 4.5,
        "reviewCount": 25
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

---

### Get Product by ID
```http
GET /products/507f1f77bcf86cd799439011

Authorization: Bearer <token>
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "discount": 10,
    "finalPrice": 899.99,
    "stock": 50,
    "sku": "LAP-001",
    "images": [
      "https://example.com/laptop-1.jpg",
      "https://example.com/laptop-2.jpg"
    ],
    "categoryId": "507f1f77bcf86cd799439012",
    "specifications": {
      "processor": "Intel i7",
      "ram": "16GB",
      "storage": "512GB SSD"
    },
    "rating": 4.5,
    "reviewCount": 25,
    "reviews": [
      {
        "userId": "507f1f77bcf86cd799439013",
        "rating": 5,
        "title": "Excellent product",
        "comment": "Very satisfied with purchase"
      }
    ]
  }
}
```

---

### Create Product (Admin Only)
```http
POST /products

Authorization: Bearer <admin-token>
Content-Type: multipart/form-data

{
  "name": "New Laptop",
  "description": "Latest model",
  "price": 1299.99,
  "discount": 5,
  "categoryId": "507f1f77bcf86cd799439012",
  "stock": 100,
  "sku": "LAP-002",
  "specifications": {
    "processor": "Intel i9",
    "ram": "32GB",
    "storage": "1TB SSD"
  },
  "images": [file1, file2]
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "507f1f77bcf86cd799439014",
    "name": "New Laptop",
    "price": 1299.99
  }
}
```

---

### Update Product (Admin Only)
```http
PUT /products/507f1f77bcf86cd799439011

Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Updated Laptop",
  "price": 1199.99,
  "stock": 80
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Product updated successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Updated Laptop",
    "price": 1199.99
  }
}
```

---

### Delete Product (Admin Only)
```http
DELETE /products/507f1f77bcf86cd799439011

Authorization: Bearer <admin-token>
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Order Endpoints

### Create Order
```http
POST /orders

Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "price": 999.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "shippingMethod": "standard",
  "couponCode": "SAVE10"
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": "507f1f77bcf86cd799439015",
    "orderNumber": "ORD-20240618-001",
    "totalAmount": 1999.98,
    "tax": 160,
    "shipping": 10,
    "discount": 200,
    "status": "pending",
    "createdAt": "2024-06-18T10:30:00Z"
  }
}
```

---

### Get Orders
```http
GET /orders?status=pending&page=1

Authorization: Bearer <token>
```

**Query Parameters**:
- `status`: Filter by status (pending, confirmed, shipped, delivered)
- `page`: Page number
- `limit`: Items per page

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "orderId": "507f1f77bcf86cd799439015",
        "orderNumber": "ORD-20240618-001",
        "totalAmount": 1999.98,
        "status": "shipped",
        "createdAt": "2024-06-18T10:30:00Z"
      }
    ]
  }
}
```

---

### Update Order Status (Admin Only)
```http
PATCH /orders/507f1f77bcf86cd799439015/status

Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "shipped"
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "orderId": "507f1f77bcf86cd799439015",
    "status": "shipped"
  }
}
```

---

## Category Endpoints

### Get All Categories
```http
GET /categories

Authorization: Bearer <token>
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "507f1f77bcf86cd799439012",
        "name": "Electronics",
        "slug": "electronics",
        "description": "Electronic devices",
        "image": "https://example.com/electronics.jpg"
      }
    ]
  }
}
```

---

## Common HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing/invalid token |
| 403 | Forbidden | Not authorized for this action |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Server Error | Internal server error |

---

## Error Response Format

```json
{
  "success": false,
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": []
}
```

## Rate Limiting

- **General endpoints**: 100 requests/minute
- **Authentication**: 5 attempts/15 minutes
- **Payment endpoints**: 3 requests/minute

Headers returned:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1623423456
```
