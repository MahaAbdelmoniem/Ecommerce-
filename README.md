# E-Commerce Backend

## Overview
This is the backend for an e-commerce application, built using **Node.js, Express, and MongoDB**. It provides APIs for managing users, products, orders, authentication, and payment processing.

## Features
- User authentication (JWT-based login/register)
- Product management (CRUD operations)
- Cart and order management
- Payment integration (Stripe/PayPal)
- Admin dashboard APIs
- Secure API endpoints with authentication & authorization

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Payment Gateway:** Stripe/PayPal

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ecommerce-backend.git
   cd ecommerce-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   STRIPE_SECRET=your_stripe_secret_key
   ```
4. Run the server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:5000`

## API Endpoints
### Authentication
- `POST /api/user/signup` – Register a new user
- `POST /api/user/login` – Login user & get token

### Products
- `GET /api/products` – Get all products
- `POST /api/products` – Add a new product (Admin only)
- `PUT /api/products/:id` – Update a product (Admin only)
- `DELETE /api/products/:id` – Delete a product (Admin only)

### Cart
- `POST /api/cart` – Add items to cart
- `GET /api/cart` – Get user cart
- `DELETE /api/cart/:id` – Remove item from cart

### Orders
- `POST /api/orders` – Place an order
- `GET /api/orders/:id` – Get order details

### Payments
- `POST /api/payments` – Process payment

## Contributing
Feel free to submit a pull request if you find any issues or want to improve the application.

## License
This project is licensed under the MIT License.

---
**Author:** Maha Abdelmoniem
