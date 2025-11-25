# ZenCart-V2 API

This is the backend API for ZenCart-V2, an e-commerce platform. It handles user authentication, product management, orders, and payments via Stripe.

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM library for MongoDB
- **JSON Web Tokens (JWT)**: For securing API endpoints
- **bcryptjs**: For password hashing
- **Stripe**: For handling payments
- **CORS**: For enabling Cross-Origin Resource Sharing
- **dotenv**: For managing environment variables

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd zencart-v2-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the `zencart-v2-backend` directory and add the following variables.

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/zencart-v2

# JWT Secret Key
JWT_SECRET=your_jwt_secret_key

# Stripe Secret Key
STRIPE_KEY=your_stripe_secret_key

# Server Port (Optional, defaults to 5000)
PORT=5000
```

### 4. Run the Server

You can run the server in development mode (with auto-reloading via `nodemon`) or production mode.

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The API will be running on `http://localhost:5000`.

---

## API Endpoints

### Authentication (`/api/auth`)

-   **`POST /register`**: Register a new user.
    -   **Body**: `{ "username": "testuser", "email": "test@example.com", "password": "password123" }`
-   **`POST /login`**: Log in an existing user.
    -   **Body**: `{ "email": "test@example.com", "password": "password123" }`

### Products (`/api/products`)

-   **`GET /`**: Get all products.
-   **`GET /:id`**: Get a single product by its ID.
-   **`POST /`**: Create a new product.
    -   **Requires**: Admin access (valid JWT in `Authorization` header).
    -   **Body**: `{ "name": "New Product", "description": "A great product", "price": 19.99, ... }`

### Users (`/api/users`)

-   **`DELETE /:id`**: Delete a user account.
    -   **Requires**: User's own token or Admin access.

### Orders (`/api/orders`)

-   **`POST /`**: Create a new order.
    -   **Requires**: User token.
-   **`GET /find/:userId`**: Get all orders for a specific user.
    -   **Requires**: User's own token or Admin access.

### Checkout (`/api/checkout`)

-   **`POST /payment`**: Create a Stripe checkout session.
    -   **Body**: `{ "items": [ ... ], "total": 123.45 }`

---

## Admin Access

To perform administrative actions like adding products, you need to be authenticated as an admin.

A default admin user is configured. You can use the following credentials to log in via the `POST /api/auth/login` endpoint to receive an admin-privileged JWT.

-   **Email**: `admin@zencart.com`
-   **Password**: `password123`

Include the received token in the `Authorization` header of your API requests (e.g., `Authorization: Bearer <token>`).