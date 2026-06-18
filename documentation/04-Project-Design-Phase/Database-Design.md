# Database Design

## Database Schema Overview

MongoDB is used as the primary database with the following collections.

## Collections

### 1. Users Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String (unique),
  "password": String (hashed),
  "role": Enum ["user", "admin"],
  "phone": String,
  "addresses": [
    {
      "street": String,
      "city": String,
      "state": String,
      "zipCode": String,
      "country": String,
      "isDefault": Boolean
    }
  ],
  "createdAt": Date,
  "updatedAt": Date,
  "isActive": Boolean
}
```

### 2. Categories Collection
```json
{
  "_id": ObjectId,
  "name": String (unique),
  "description": String,
  "image": String (URL),
  "slug": String (unique),
  "createdAt": Date,
  "updatedAt": Date
}
```

### 3. Products Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "description": String,
  "categoryId": ObjectId (ref: Categories),
  "price": Number,
  "discount": Number,
  "stock": Number,
  "images": [String],
  "sku": String (unique),
  "rating": Number (0-5),
  "reviewCount": Number,
  "specifications": {
    "size": String,
    "color": String,
    "material": String
  },
  "createdAt": Date,
  "updatedAt": Date,
  "isActive": Boolean
}
```

### 4. Orders Collection
```json
{
  "_id": ObjectId,
  "orderNumber": String (unique),
  "userId": ObjectId (ref: Users),
  "items": [
    {
      "productId": ObjectId (ref: Products),
      "quantity": Number,
      "price": Number,
      "discount": Number
    }
  ],
  "shippingAddress": {
    "street": String,
    "city": String,
    "state": String,
    "zipCode": String,
    "country": String
  },
  "totalAmount": Number,
  "taxAmount": Number,
  "shippingCost": Number,
  "discountApplied": Number,
  "status": Enum ["pending", "confirmed", "shipped", "delivered", "cancelled"],
  "paymentStatus": Enum ["pending", "completed", "failed"],
  "paymentId": ObjectId (ref: Payments),
  "createdAt": Date,
  "updatedAt": Date
}
```

### 5. Payments Collection
```json
{
  "_id": ObjectId,
  "orderId": ObjectId (ref: Orders),
  "userId": ObjectId (ref: Users),
  "amount": Number,
  "currency": String,
  "paymentMethod": Enum ["credit_card", "debit_card", "paypal", "wallet"],
  "transactionId": String (payment gateway),
  "status": Enum ["pending", "completed", "failed", "refunded"],
  "gatewayResponse": Object,
  "createdAt": Date,
  "updatedAt": Date
}
```

### 6. Reviews Collection
```json
{
  "_id": ObjectId,
  "productId": ObjectId (ref: Products),
  "userId": ObjectId (ref: Users),
  "rating": Number (1-5),
  "title": String,
  "comment": String,
  "helpful": Number,
  "status": Enum ["pending", "approved", "rejected"],
  "createdAt": Date,
  "updatedAt": Date
}
```

### 7. Coupons Collection
```json
{
  "_id": ObjectId,
  "code": String (unique),
  "description": String,
  "discountType": Enum ["percentage", "fixed"],
  "discountValue": Number,
  "minimumAmount": Number,
  "maxUses": Number,
  "currentUses": Number,
  "validFrom": Date,
  "validUntil": Date,
  "isActive": Boolean,
  "createdAt": Date
}
```

## Indexes

```javascript
// Users Collection
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })

// Products Collection
db.products.createIndex({ "categoryId": 1 })
db.products.createIndex({ "name": "text", "description": "text" })
db.products.createIndex({ "price": 1 })
db.products.createIndex({ "sku": 1 }, { unique: true })

// Orders Collection
db.orders.createIndex({ "userId": 1 })
db.orders.createIndex({ "status": 1 })
db.orders.createIndex({ "createdAt": -1 })
db.orders.createIndex({ "orderNumber": 1 }, { unique: true })

// Reviews Collection
db.reviews.createIndex({ "productId": 1 })
db.reviews.createIndex({ "userId": 1 })

// Payments Collection
db.payments.createIndex({ "orderId": 1 })
db.payments.createIndex({ "userId": 1 })
db.payments.createIndex({ "status": 1 })
```

## Data Relationships

```
Users (1) ──── (N) Orders
Users (1) ──── (N) Reviews
Users (1) ──── (N) Payments

Products (1) ──── (N) Reviews
Products (1) ──── (N) Orders (items)

Categories (1) ──── (N) Products

Orders (1) ──── (1) Payments

Coupons (0) ──── (N) Orders (optional)
```

## Data Integrity Constraints

1. **Unique Constraints**:
   - User email must be unique
   - Product SKU must be unique
   - Order number must be unique
   - Coupon code must be unique

2. **Foreign Key Constraints**:
   - All references use MongoDB ObjectId
   - Cascading deletes configured where applicable

3. **Validation Rules**:
   - Product price > 0
   - Stock quantity >= 0
   - Order status values limited to enum
   - Rating values between 1-5

## Database Performance Considerations

1. **Indexing Strategy**: Indexes created on frequently queried fields
2. **Query Optimization**: Complex queries minimized, joins avoided
3. **Document Size**: Embedded documents used for related data
4. **Sharding**: Preparation for future horizontal scaling
5. **Replication**: MongoDB replica set for high availability
