# Portfolio Website

A full-stack portfolio website built with React on the frontend and Node.js/Express on the backend. Features an admin panel for managing projects, skills, and contact messages.

## Features

- **Responsive Design**: Modern, mobile-friendly interface
- **Admin Panel**: Secure admin interface for content management
- **Project Showcase**: Display personal projects with descriptions and links
- **Skills Section**: Showcase technical skills and expertise
- **Contact Form**: Allow visitors to send messages
- **Email Notifications**: Automated email responses for contact submissions
- **File Upload**: Support for uploading project images and assets
- **Theme Toggle**: Light/dark mode support

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- CSS3 with custom styling
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB (database)
- JWT for authentication
- Multer for file uploads
- Nodemailer for email service

## Project Structure

```
portfolio/
├── backend/          # Express.js API server
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   └── seed/           # Database seed data
│   └── uploads/            # File uploads directory
├── frontend/         # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── sections/       # Section components
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd portfolio
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Set up environment variables
   - Copy `.env.example` to `.env` in both backend and frontend directories
   - Fill in your MongoDB connection string, JWT secret, email credentials, etc.

5. Start the development servers
```bash
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Public Routes
- `GET /api/projects` - Get all projects
- `GET /api/skills` - Get all skills
- `POST /api/contact` - Send contact message

### Admin Routes (Protected)
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/projects` - Get projects (admin)
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project
- Similar endpoints for skills and contact messages

## Deployment

The project is configured for deployment on:
- **Frontend**: Vercel
- **Backend**: Render

Deployment configurations are included in `vercel.json` and `render.yaml` files.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.