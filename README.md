# E-Commerce 

This is the backend for an e-commerce platform. The application provides an API for managing products, orders, users, and authentication, allowing you to integrate with a frontend for a complete shopping experience.

## Features

- **User Authentication**: Secure user registration, login, and management using JWT (JSON Web Tokens).
- **Product Management**: Admins can add, update, delete, and view products.
- **Order Management**: Users can place orders, view order history, and track order status.
- **Role-Based Access Control**: Different user roles (Admin, Customer) with specific access levels.
- **MongoDB Integration**: MongoDB as the database to store users, products, and orders.
- **RESTful API**: A set of API endpoints to manage the core e-commerce features.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Environment Variables**: dotenv for environment management

## Setup and Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (v16+)
- MongoDB (either local or MongoDB Atlas)
- Cloudinary account for image hosting

### Clone the Repository

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Mhmd-Essam/E-Shop
   cd e-commerce-backend

2. Install project dependencies:
   npm install

3.Set up your environment variables by creating a .env file in the root directory with the following values:

NODE_ENV=development
PORT=5000
MONGO_URL=mongodb://your_mongo_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRE=30d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4.To run the application in development mode:
   npm run dev

5.To run the application in production mode, after building it:
   npm run start


