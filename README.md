# Charging Station Management App

A full-stack application for managing EV charging stations with authentication, CRUD operations, filtering, and map visualization.

## Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB
* JWT for authentication

### Frontend

* Vue.js 3
* Vue Router
* Pinia
* Axios
* Leaflet (OpenStreetMap)

### Deployment

* Backend: Render
* Frontend: Vercel

## Project Structure

```
charging-station-app/
├── backend/         # Node.js + Express API
├── frontend/        # Vue.js frontend
└── README.md
```

## Setup Instructions

### Backend

```bash
cd backend
npm install
cp .env.example .env  # Add MONGODB_URI and JWT_SECRET
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env  # Add VITE_API_URL pointing to backend
npm run dev
```

## API Endpoints

### Auth

* `POST /api/auth/register` - Register
* `POST /api/auth/login` - Login (returns JWT)

### Charging Stations (JWT required)

* `GET /api/stations` - List stations
* `POST /api/stations` - Add station
* `PUT /api/stations/:id` - Update station
* `DELETE /api/stations/:id` - Delete station

## Frontend Features

* Login screen with JWT auth
* List, filter, add, edit, delete charging stations
* Map view with clickable markers showing station details

## Deployment

* Deploy backend to Render (Web Service)
* Deploy frontend to Vercel

## Deliverables

* GitHub repo with /backend and /frontend folders
* Live frontend and backend URLs

## Author

Created as part of a full-stack assessment project.
