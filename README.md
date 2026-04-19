# 🍽️ Restaurant Management System

A full-stack **Restaurant Management System** developed using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.
This application helps users to explore food menus, place orders, and book tables, while providing an admin panel to manage the entire restaurant system efficiently.

---

## 📌 Project Overview

This project is designed to simplify restaurant operations by providing a digital platform for both customers and administrators.

* Customers can browse menus, add items to cart, place orders, and book tables.
* Admins can manage categories, menus, orders, and bookings from a centralized dashboard.

---

## ✨ Features

### 👤 User Features

* User Registration & Login (Authentication)
* Browse food items category-wise
* View detailed menu information
* Add items to cart
* Place orders
* Book tables online
* View order history
* View booking details

---

### 🛠️ Admin Features

* Secure Admin Login
* Add / Update / Delete Categories
* Add / Update / Delete Menu Items
* Manage customer orders
* Manage table bookings
* Dashboard for overview

---

## 🧑‍💻 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Other Tools & Libraries

* JWT Authentication (for secure login)
* Cloudinary (for image upload & storage)

---

## 📂 Project Structure

```
Restaurant Management System
│
├── backend
│   ├── config        # Database & cloud configuration
│   ├── controllers   # Business logic
│   ├── models        # Database schemas
│   ├── routes        # API routes
│   ├── middlewares   # Authentication & upload middleware
│   └── index.js      # Entry point
│
├── frontend
│   ├── src
│   │   ├── components   # Reusable UI components
│   │   ├── pages        # Application pages
│   │   ├── context      # Global state management
│   │   └── assets       # Images & icons
│   └── index.html
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```
git clone https://github.com/khemnarrutuja08-ui/Restaurant-Management-System.git
```

---

### 2. Install Dependencies

#### Backend Setup

```
cd backend
npm install
```

#### Frontend Setup

```
cd frontend
npm install
```

---

### 3. Environment Variables

Create a `.env` file inside the **backend** folder and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_URL=your_cloudinary_url
```

---

### 4. Run the Project

#### Start Backend Server

```
npm run server
```

#### Start Frontend

```
npm run dev
```

---

## 🔐 Authentication

* JWT (JSON Web Token) is used for secure authentication.
* Users and admins are authenticated before accessing protected routes.

---

## 🌟 Future Enhancements

* Online Payment Integration (Razorpay / Stripe)
* Real-time Order Tracking
* Email & SMS Notifications
* User Reviews & Ratings

---

## 👩‍💻 Author

* GitHub: https://github.com/khemnarrutuja08-ui

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
