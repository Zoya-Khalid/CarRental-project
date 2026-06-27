# Car Rental System 
A web-based car rental management system with a full REST API backend.

## Features
- Browse available cars and rental listings
- User authentication and secure sessions
- Booking and reservation management
- REST API with full CRUD operations
- Optimized database queries and data handling
- Performance-focused architecture

## Tech Stack
- Backend: Node.js, Express.js
- **Database: MongoDB
- API: RESTful endpoints
- Focus: Usability, performance optimization, and secure data handling

## Getting Started

bash
# Clone the repository
git clone https://github.com/Zoya-Khalid/CarRental-project.git

# Navigate to project directory
cd CarRental-project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your MongoDB connection string

# Start the server
npm start

## Environment Variables
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cars | Get all available cars |
| POST | /api/cars | Add a new car |
| GET | /api/bookings | Get all bookings |
| POST | /api/bookings | Create a new booking |
| DELETE | /api/bookings/:id | Cancel a booking |

## What I Learned
- Designing and building RESTful APIs with Express.js
- Working with MongoDB for NoSQL data modeling
- Implementing secure authentication with JWT
- Writing clean, maintainable backend code
