# My_EcommerceStore

A full stack e-commerce web application built for the **CodeAlpha Full Stack Development Internship** (Task 1).

## Live Demo
_Add your deployed link here once hosted (e.g., Render, Railway, or Vercel for frontend + backend)._

## Features

- **Product Listings** — browse all products with category filters and live search
- **Product Details Page** — full product view with quantity selector and stock status
- **Shopping Cart** — add, update quantity, and remove items (persisted in localStorage)
- **User Authentication** — register and login with JWT-based sessions, passwords hashed with bcrypt
- **Order Processing** — checkout flow with shipping address, server-side price calculation, and stock deduction
- **Order History** — logged-in users can view their past orders and status
- **Database** — MongoDB collections for Products, Users, and Orders

## Tech Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript (no frameworks, per task spec)
**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose ODM
**Auth:** JSON Web Tokens (JWT), bcryptjs for password hashing

## Project Structure

```
CodeAlpha_EcommerceStore/
├── backend/
│   ├── controllers/       # Business logic (auth, products, orders)
│   ├── middleware/        # JWT auth middleware
│   ├── models/             # Mongoose schemas (User, Product, Order)
│   ├── routes/             # Express route definitions
│   ├── server.js           # App entry point
│   ├── seed.js              # Sample data seeder
│   └── package.json
└── frontend/
    ├── css/style.css
    ├── js/                  # api.js, auth.js, cart.js, page-specific scripts
    ├── index.html            # Product listing / home
    ├── product.html          # Product detail page
    ├── cart.html              # Shopping cart
    ├── checkout.html          # Checkout / shipping form
    ├── orders.html             # Order history
    ├── login.html
    └── register.html
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB running locally, or a MongoDB Atlas connection string

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/CodeAlpha_EcommerceStore.git
cd CodeAlpha_EcommerceStore/backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and set MONGO_URI and JWT_SECRET

# Seed the database with sample products
npm run seed

# Start the server
npm run dev
```

The app will be available at `http://localhost:5000` — the backend serves the frontend static files directly, so no separate frontend server is needed.

### Demo Admin Account
After seeding, an admin account is created:
- **Email:** admin@codealpha.com
- **Password:** admin123

## API Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|--------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/profile` | Get current user | Private |
| GET | `/api/products` | List products (supports `?keyword=` and `?category=`) | Public |
| GET | `/api/products/:id` | Get single product | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |
| POST | `/api/orders` | Place a new order | Private |
| GET | `/api/orders/myorders` | Get logged-in user's orders | Private |
| GET | `/api/orders/:id` | Get a specific order | Private |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/status` | Update order status | Admin |

## Notes on Design Decisions

- Server-side order pricing: item prices are re-fetched from the database during order creation rather than trusted from the client, preventing price tampering.
- Stock is decremented atomically when an order is placed.
- Cart state lives in `localStorage` so it persists across page reloads without requiring login until checkout.

## Author
Built as part of the CodeAlpha Full Stack Development Internship.
