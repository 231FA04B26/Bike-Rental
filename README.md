# Bike Rental Website

A full-stack MERN application for bike rentals with user authentication, booking management, admin dashboard, and payment integration.

## Features

### Frontend (React)
- Responsive design with Tailwind CSS
- User authentication (register, login, password reset)
- Bike listing with filters and search
- Individual bike details with image gallery
- Booking system with date picker and payment
- User dashboard for managing bookings and profile
- Admin dashboard for managing bikes, bookings, and users
- Interactive map for bike locations
- Reviews and ratings system
- Wishlist/favorites functionality

### Backend (Node.js + Express)
- RESTful API with JWT authentication
- User management with role-based access
- Bike CRUD operations
- Booking management with status tracking
- Reviews and ratings
- Image upload with Cloudinary integration
- Payment processing with Stripe
- Email notifications
- Rate limiting and security middleware

### Database (MongoDB)
- User, Bike, Booking, Review, and Category schemas
- Data validation and relationships
- Indexing for performance

## Tech Stack

- **Frontend:** React, React Router, Axios, Tailwind CSS, React Hook Form, Leaflet, Stripe
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt, Multer, Nodemailer
- **Deployment:** Vercel (frontend), Railway/Heroku (backend), MongoDB Atlas

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bike-rental
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables:
   - Copy `.env` file and fill in your API keys and secrets
   - For MongoDB Atlas, update MONGODB_URI
   - Add your Stripe, Cloudinary, and email credentials

5. Seed the database with sample data:
   ```bash
   cd ../server
   npm run seed
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

7. Start the frontend (in a new terminal):
   ```bash
   cd ../client
   npm start
   ```

The application will be running at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/bookings` - Get user bookings

### Bike Endpoints
- `GET /api/bikes` - Get all bikes (with filters)
- `GET /api/bikes/:id` - Get bike by ID
- `POST /api/bikes` - Create bike (admin only)
- `PUT /api/bikes/:id` - Update bike (admin only)
- `DELETE /api/bikes/:id` - Delete bike (admin only)

### Booking Endpoints
- `GET /api/bookings` - Get all bookings (admin) or user bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

### Review Endpoints
- `GET /api/reviews/bike/:bikeId` - Get reviews for a bike
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Backend (Railway/Heroku)
1. Create a new project on Railway or Heroku
2. Connect your GitHub repository
3. Set environment variables
4. Deploy

### Database (MongoDB Atlas)
1. Create a cluster on MongoDB Atlas
2. Get connection string and update .env
3. Whitelist IP addresses for access

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/bike-rental |
| JWT_SECRET | JWT secret key | your_secret_key |
| JWT_EXPIRE | JWT expiration time | 7d |
| EMAIL_HOST | SMTP host | smtp.gmail.com |
| EMAIL_PORT | SMTP port | 587 |
| EMAIL_USER | Email username | your_email@gmail.com |
| EMAIL_PASS | Email password/app password | your_app_password |
| STRIPE_SECRET_KEY | Stripe secret key | sk_test_... |
| STRIPE_PUBLISHABLE_KEY | Stripe publishable key | pk_test_... |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | your_cloud_name |
| CLOUDINARY_API_KEY | Cloudinary API key | your_api_key |
| CLOUDINARY_API_SECRET | Cloudinary API secret | your_api_secret |
| CLIENT_URL | Frontend URL | http://localhost:3000 |
| PORT | Backend port | 5000 |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
