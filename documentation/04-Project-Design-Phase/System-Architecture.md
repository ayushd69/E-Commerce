# System Architecture

## Overview
The e-commerce platform is built on a MERN (MongoDB, Express, React, Node.js) stack with clear separation between frontend and backend.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Layer                             │
│  ┌───────────────────────────────────────────────────────┐   │
│  │         React Frontend (Vite)                         │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │   │
│  │  │   Login      │  │  Product     │  │  Admin     │  │   │
│  │  │   Register   │  │  Listing     │  │  Dashboard │  │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │   │
│  │  │   Cart       │  │   Checkout   │  │  Profile   │  │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │   │
│  └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                    HTTP/HTTPS (REST API)
                            │
┌─────────────────────────────────────────────────────────────┐
│                   Application Layer                          │
│  ┌───────────────────────────────────────────────────────┐   │
│  │         Express.js Server (Node.js)                  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │   │
│  │  │ Auth Routes  │  │ Product      │  │  Order     │  │   │
│  │  │              │  │  Routes      │  │  Routes    │  │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │   │
│  │  │ Category     │  │  User        │  │ Payment    │  │   │
│  │  │ Routes       │  │  Routes      │  │ Routes     │  │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │   │
│  │                                                       │   │
│  │  ┌──────────────────────────────────────────────┐   │   │
│  │  │        Middleware                            │   │   │
│  │  │  ├─ Auth Middleware                         │   │   │
│  │  │  ├─ Error Handling                          │   │   │
│  │  │  ├─ Request Validation                      │   │   │
│  │  │  └─ CORS & Security                         │   │   │
│  │  └──────────────────────────────────────────────┘   │   │
│  └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                        Database Queries
                            │
┌─────────────────────────────────────────────────────────────┐
│                   Data Layer                                │
│  ┌───────────────────────────────────────────────────────┐   │
│  │         MongoDB Database                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │   │
│  │  │   Users      │  │   Products   │  │   Orders   │  │   │
│  │  │  Collection  │  │  Collection  │  │ Collection │  │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │   │
│  │  │ Categories   │  │   Payment    │  │  Reviews   │  │   │
│  │  │ Collection   │  │  Collection  │  │ Collection │  │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘  │   │
│  └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Structure

### Frontend Structure
```
src/
├── components/
│   ├── Header.jsx
│   ├── HeroBanner.jsx
│   ├── ProductList.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── AdminDashboard.jsx
│   └── CategoryGrid.jsx
├── context/
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── App.jsx
├── main.jsx
└── index.css
```

### Backend Structure
```
backend/
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   ├── Order.js
│   └── Payment.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   ├── paymentRoutes.js
│   └── userRoutes.js
├── middleware/
│   └── authMiddleware.js
├── index.js
├── forceSeed.js
└── clearDb.js
```

## Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS/Tailwind CSS
- **HTTP Client**: Axios
- **State Management**: Context API
- **Router**: React Router

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi/Express Validator
- **Security**: bcryptjs, helmet, cors

### Infrastructure
- **Hosting**: AWS/Azure/DigitalOcean
- **Database Hosting**: MongoDB Atlas
- **CDN**: CloudFlare
- **Payment Gateway**: Stripe/PayPal

## Design Patterns Used

1. **MVC Pattern**: Backend follows Model-View-Controller pattern
2. **Context API**: Frontend uses React Context for global state
3. **Repository Pattern**: Database access abstraction
4. **Middleware Pattern**: Express middleware for cross-cutting concerns
5. **JWT Authentication**: Stateless authentication
