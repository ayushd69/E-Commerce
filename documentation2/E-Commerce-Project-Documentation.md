# E-Commerce Platform — Project Documentation

**Project Name:** E-Commerce Platform

**Documented by:** Ayush

---

## 1. Introduction

### Project Title
E-Commerce Platform

### Documented by
Ayush

### Purpose
The Online E-Commerce platform is a web-based application that allows customers to browse products, add items to a shopping cart, place orders, and track their purchases. The system connects three types of users: ordinary customers, sellers/admins who manage products and orders, and system administrators who oversee the platform and manage users.

### Goal
The goal of the project is to digitize and streamline the traditional e-commerce shopping process, replacing manual interventions with a transparent, trackable, and centrally managed digital workflow.

---

## 2. Project Overview

### 2.1 Key Features

#### User Registration & Profile Management
- Secure sign-up using email and password, with passwords hashed using bcrypt before storage.
- User profile stores name, email, phone number, and role (user or admin).

#### Product Browsing & Tracking
- Users can browse products by category and search for items.
- Each product includes images, price, category, description, and stock status.
- Users can view product details and add items to the cart.

#### Shopping Cart & Checkout
- Users can add products to the cart, update quantities, and remove items.
- The checkout flow collects shipping details and processes payments.
- Order status is tracked after purchase.

#### Order Management
- Users can view order history and order status.
- Admins can view all orders, update order statuses, and manage purchases.

#### Admin Controls
- Admins can add, update, and delete products.
- Admins can manage product categories.
- Admins can view order summaries and order counts by status.

#### Role-Based Authentication
- JWT (JSON Web Token) based authentication ensures each user only accesses functionality appropriate to their role.

---

## 3. Architecture

### 3.1 Stack
The application follows the MERN stack architecture (MongoDB, Express.js, React, Node.js) in a client-server model, where the React frontend acts as the client and the Express/Node.js backend acts as the server, communicating over RESTful APIs.

### 3.2 Frontend Architecture (React)
The frontend is built using React with Vite as the build tool, and is organized around page and component-level structure.

- Component-based structure: Reusable components (Header, PrivateRoute) are separated from page-level components (Login, Register, ProductList, Cart, Profile, AdminDashboard).
- Routing: React Router DOM handles client-side navigation, with protected routes that redirect unauthenticated or unauthorized users back to the login page.
- State management: React's built-in useState and useEffect hooks manage local component state; a global AuthContext (built with React Context API) manages the logged-in user's identity and JWT token across the app.
- API communication: Axios is used to send HTTP requests to the backend, with the JWT token attached in the Authorization header for protected endpoints.
- Styling: CSS and component-level styling are used to create a clean, responsive interface.
- Persistence: The logged-in user's session (token and profile) is stored in the browser's localStorage so the user stays logged in across page refreshes.

### 3.3 Backend Architecture (Node.js + Express.js)
The backend exposes a RESTful API built with Express.js running on Node.js. It is organized into three layers: models, middleware, and routes.

- Models: Mongoose schemas define the structure of data stored in MongoDB (User, Product, Category, Order).
- Middleware: A custom authentication middleware verifies the JWT token on every protected request and attaches the decoded user information (id, name, role) to the request object.
- Routes: Each resource (auth, products, categories, orders, users) has its own route file, keeping endpoint logic modular and maintainable.
- Security: Passwords are hashed using bcryptjs before being saved; sensitive routes check the requesting user's role before allowing access (role-based authorization).
- Cross-origin requests: The cors package allows the React frontend (running on a different port) to communicate with the backend API.

### 3.4 Database (MongoDB)
MongoDB stores all application data as JSON-like documents across collections connected logically through ObjectId references.

#### Collections

| Collection | Key Fields | Purpose |
|------------|------------|---------|
| users | name, email, password, phone, role | Stores registered accounts and their role (user/admin) |
| categories | name, description, slug | Stores product categories |
| products | name, description, price, categoryId, stock, images, rating | Stores each product listed on the platform |
| orders | userId, items, shippingAddress, totalAmount, status, paymentStatus | Stores each order placed by a user |

#### Relationships
- A user can place many orders (one-to-many).
- A product belongs to one category.
- An order contains multiple order items.

---

## 4. Setup Instructions

### 4.1 Prerequisites
- Node.js (v16 or later) and npm
- MongoDB (local installation or MongoDB Atlas)
- Git, for cloning the repository
- Visual Studio Code or similar code editor

### 4.2 Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd e-commerce
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file inside the backend folder with the following variables:
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
PORT=5000
JWT_SECRET=your_secret_key_here
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

5. Ensure MongoDB is running locally (or update `MONGODB_URI` to point to an Atlas cluster).

---

## 5. Folder Structure

### 5.1 Client (Frontend) Structure

```
frontend/
  src/
    components/
      Header.jsx
      PrivateRoute.jsx
      ProductList.jsx
      Cart.jsx
      Login.jsx
      Register.jsx
      Profile.jsx
      AdminDashboard.jsx
      CategoryGrid.jsx
    context/
      AuthContext.jsx
    App.jsx
    main.jsx
    index.css
```

### 5.2 Server (Backend) Structure

```
backend/
  middleware/
    authMiddleware.js
  models/
    User.js
    Category.js
    Product.js
    Order.js
  routes/
    authRoutes.js
    categoryRoutes.js
    productRoutes.js
    orderRoutes.js
    userRoutes.js
  index.js
  forceSeed.js
  clearDb.js
  .env
```

---

## 6. Running the Application

Both the backend and frontend servers must be running simultaneously, each in its own terminal.

### 6.1 Start the Backend Server
```bash
cd backend
npm start
```
The backend will run on `http://localhost:5000`.

### 6.2 Start the Frontend Server
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:5173`.

---

## 7. API Documentation

All endpoints are prefixed with `/api`. Protected endpoints require an Authorization header in the format: `Bearer <token>`.

### 7.1 Authentication Routes — `/api/auth`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/register` | Register a new user | name, email, password, phone, role |
| POST | `/login` | Login and receive JWT token | email, password |

Example response for `/api/auth/login`:
```json
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "64f...",
    "name": "John Doe",
    "email": "john@email.com",
    "role": "user"
  }
}
```

### 7.2 Product Routes — `/api/products`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all products | Public |
| GET | `/:id` | Get product details | Public |
| POST | `/` | Create a product | Admin only |
| PUT | `/:id` | Update a product | Admin only |
| DELETE | `/:id` | Delete a product | Admin only |

### 7.3 Category Routes — `/api/categories`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all categories | Public |
| POST | `/` | Create a category | Admin only |

### 7.4 Order Routes — `/api/orders`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/` | Create a new order | Authenticated user |
| GET | `/` | Get user orders | Authenticated user |
| GET | `/:id` | Get specific order | Authenticated user |
| PATCH | `/:id/status` | Update order status | Admin only |

### 7.5 User Management Routes — `/api/users`

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/` | Get all users | Admin only |
| PATCH | `/:id` | Update a user role | Admin only |
| DELETE | `/:id` | Delete a user | Admin only |

---

## 8. Authentication

The application uses JWT for stateless authentication.

### 8.1 How It Works
- Passwords are hashed using bcryptjs before storage.
- On login, the backend compares submitted password against the stored hash.
- If successful, the backend generates a JWT signed with `JWT_SECRET` and includes user id, name, and role in the payload.
- The token expires after 1 day.
- The frontend stores the token in `localStorage` and attaches it to every protected request.
- A custom Express middleware validates the token and attaches decoded payload to `req.user`.

### 8.2 Authorization (Role-Based Access)
- Admins can manage products, categories, users, and orders.
- Normal users can browse products, manage their cart, place orders, and view their own orders.
- Protected frontend routes redirect unauthorized users away from restricted pages.

---

## 9. User Interface

The interface is organized into role-based views and pages.

### 9.1 Pages
- **Login & Registration**: Login page and registration page.
- **Home/Product Listing**: Browse products by category.
- **Product Details**: View product information and add to cart.
- **Cart**: Review items and proceed to checkout.
- **Checkout**: Payment and order confirmation.
- **Profile**: View user profile and order history.
- **Admin Dashboard**: Manage products, categories, and orders.

### 9.2 Components
- **Header**: Navigation bar with login/logout and role display.
- **PrivateRoute**: Protects routes requiring authentication.
- **ProductList**: Displays product cards.
- **Cart**: Shows selected items with quantity controls.
- **AdminDashboard**: Admin controls and summaries.

---

## 10. Testing

Testing for this project includes manual functional testing and API validation.

### 10.1 Testing Approach
- Manual UI testing across user and admin flows.
- API testing with Postman or browser dev tools.
- Database verification via MongoDB Compass.
- Authentication testing for valid, invalid, and expired JWT tokens.

### 10.2 Tools Used
- Browser DevTools (Console & Network)
- MongoDB Compass
- Postman

### 10.3 Future Improvements
- Automated backend testing using Jest and Supertest.
- Frontend component testing using React Testing Library.

---

## 11. Screenshots or Demo

A demo walkthrough can be recorded and shared via video.

Suggested flow:
- User registration and login
- Product browsing and cart actions
- Order placement and tracking
- Admin product and order management

---

## 12. Known Issues

- No email notifications for order confirmation.
- No advanced validation for phone number or address formats.
- User/admin account creation may rely on manual database setup for the first admin.
- Some edge-case errors are not displayed with friendly messages.

---

## 13. Future Enhancements

- Add email/SMS notifications for order updates.
- Add product image uploads and gallery support.
- Add admin approval flow for new sellers or admins.
- Add analytics charts for sales and orders.
- Add real-time updates using WebSockets.
- Add search and advanced filtering on products.
- Add automated test suites for backend and frontend.
- Deploy to production using services like Vercel/Netlify and MongoDB Atlas.

---

**End of Document**
