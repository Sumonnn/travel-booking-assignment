# Travel Package Booking Module

A full-stack Travel Package Booking module built using React.js, Node.js, Express.js, and MongoDB.

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Features

### Travel Package APIs

- Add travel package
- Get all travel packages
- Get single package details
- Search by destination
- Sort by price
- Pagination support

### Booking Module

- Create booking
- Validate requested seats
- Prevent booking if requested seats exceed available seats
- Reduce available seats after successful booking

### Frontend Pages

- Package listing page
- Package details page
- Booking form
- Admin add package form

### Frontend Features

- Search packages by destination
- Sort packages by price
- Pagination
- Form validation
- Loading and error handling
- Responsive design
- Debounced search

## Project Structure

```txt
travel-booking-assignment/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── package.controller.js
│   │   │   └── booking.controller.js
│   │   ├── models/
│   │   │   ├── package.model.js
│   │   │   └── booking.model.js
│   │   ├── routes/
│   │   │   ├── package.routes.js
│   │   │   └── booking.routes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── PackageCard.jsx
│   │   │   ├── Pagination.jsx
│   │   │   └── BookingForm.jsx
│   │   ├── pages/
│   │   │   ├── PackageList.jsx
│   │   │   ├── PackageDetails.jsx
│   │   │   └── AdminAddPackage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
└── README.md
```

## Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb_url_here
```

Run backend locally:

```bash
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

## Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file inside the `frontend` folder:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Run frontend locally:

```bash
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

## API Endpoints

### Package APIs

#### Add Package

```http
POST /api/packages
```

Request body:

```json
{
  "title": "Dubai Luxury Trip",
  "destination": "Dubai",
  "price": 45000,
  "duration": "5 Days / 4 Nights",
  "availableSeats": 20,
  "startDate": "2026-07-10",
  "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
}
```

#### Get All Packages

```http
GET /api/packages
```

#### Search, Sort, and Pagination

```http
GET /api/packages?destination=dubai&sort=price_asc&page=1&limit=5
```

Supported query parameters:

```txt
destination
sort=price_asc | price_desc
page
limit
```

#### Get Single Package Details

```http
GET /api/packages/:id
```

### Booking API

#### Create Booking

```http
POST /api/bookings
```

Request body:

```json
{
  "customerName": "Golam Masud",
  "email": "imgolammasud@gmail.com",
  "seats": 2,
  "packageId": "PACKAGE_ID_HERE"
}
```

Booking validation:

```txt
customerName is required
email is required and must be valid
seats must be greater than 0
packageId is required
requested seats must not exceed available seats
```

## Example Test Flow

1. Add a travel package using `POST /api/packages`
2. Get all packages using `GET /api/packages`
3. Search packages using `GET /api/packages?destination=dubai`
4. Sort packages using `GET /api/packages?sort=price_asc`
5. Open single package details using `GET /api/packages/:id`
6. Create a booking using `POST /api/bookings`
7. Check that `availableSeats` is reduced after successful booking

## Environment Variables

### Backend `.env.example`

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### Frontend `.env.example`

```env
VITE_API_BASE_URL=your_backend_api_url
```

## Deployment

The project is deployed on Render.

### Frontend Live URL

```txt
ADD_FRONTEND_RENDER_URL_HERE
```

### Backend Live URL

```txt
ADD_BACKEND_RENDER_URL_HERE
```

### Backend API Base URL

```txt
ADD_BACKEND_RENDER_URL_HERE
```

## Postman Collection

Postman collection is included in the repository.

```txt
Travel Package Booking.postman_collection.json
```

## Dummy Package Data

```json
{
  "title": "Dubai Luxury Trip",
  "destination": "Dubai",
  "price": 45000,
  "duration": "5 Days / 4 Nights",
  "availableSeats": 20,
  "startDate": "2026-07-10",
  "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
}
```

## Author

Golam Masud