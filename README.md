
# ResponsiveEcommerce

ResponsiveEcommerce is a modern React + Vite e-commerce web app for an online shop experience. It includes a customer-facing storefront as well as admin pages for managing products and orders.

## What this project does

This app is designed to help users:

- browse products and view product details
- add items to a cart and proceed to checkout
- see current and past orders
- register, log in, and recover a password
- access an admin dashboard for product and order management

It also includes a responsive UI, dark mode support, animations, and toast notifications.

## Tech stack

- React 18
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Framer Motion
- AOS
- React Hot Toast
- Razorpay

## Project structure

- src/components: reusable UI sections such as Navbar, Hero, Products, Cart, Checkout, Login, Admin, and Footer
- src/Store: Redux store and slices
- src/APIcall: API helper for backend requests
- src/assets: images and static assets

## Getting started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd ResponsiveEcommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a file named `.env` in the project root and add your backend URL:

```env
VITE_BASE_URL=http://localhost:5000
```

> The frontend uses this value to call the backend API for login, cart, orders, and payments.

### 4. Run the development server

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

## Available scripts

- `npm run dev` — start the local development server
- `npm run build` — build the project for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks

## Main routes

The app includes routes for:

- `/login`
- `/register`
- `/forgot-password`
- `/Home`
- `/shop`
- `/about`
- `/current_order`
- `/order_history`
- `/cheakout`
- `/payment-success`
- `/payment-failed`
- `/admin`
- `/productmanagement`
- `/adminaddproduct`
- `/view-products`
- `/admin-order`

## Notes for contributors

This project depends on a backend API for authentication, cart updates, checkout, payment, and admin actions. Make sure your backend is running and reachable through the `VITE_BASE_URL` value.

If you want to contribute, keep the UI consistent with the existing Tailwind-based style and avoid breaking the protected routes or admin flow.
