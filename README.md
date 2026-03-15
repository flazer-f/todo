# ToDo List Application

A full-stack ToDo application built with React, Node.js, Express, and MongoDB. It features secure user authentication, advanced task management, and a modern, responsive user interface.

## Features

- **User Authentication**: Secure JWT-based login and registration.
- **Task Management**: Create, read, update, and delete tasks easily.
- **Search & Filter**: Find specific tasks using the search bar or filter by status.
- **Sorting**: Organize tasks by name or status in both ascending and descending order.
- **Responsive Design**: A sleek UI built with Tailwind CSS that works on all devices.
- **Backend Validation**: Robust error handling and data validation on the server side.

## Tech Stack

### Frontend
- **React**: Modern component-based UI development.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.
- **TypeScript**: Type safety for more reliable code.

### Backend
- **Node.js & Express**: High-performance web server framework.
- **MongoDB & Mongoose**: Flexible NoSQL database and object modeling.
- **JWT (JSON Web Tokens)**: Secure stateless authentication.
- **Bcryptjs**: Password hashing for enhanced security.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB account or local installation

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd todo
   ```

2. **Setup the Backend**:
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file and add your configurations:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5005
     ```

3. **Setup the Frontend**:
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file:
     ```env
     VITE_API_URL=http://localhost:5005/api
     ```

## Running the Application

You can run both the frontend and backend concurrently from the root directory:

```bash
cd ..
npm run dev
```

The application will be available at `http://localhost:5173`.

## Deployment

This project is ready to be deployed on platforms like Netlify. See the `walkthrough.md` in the `brain` directory for detailed common deployment strategies.

