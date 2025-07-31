# Event Management System

A personal full-stack event management application built with Go Fiber backend and React Native (Expo) frontend. This system demonstrates modern software architecture with seamless event creation, ticket purchasing, and real-time event management featuring role-based access control.

[Download the app](https://expo.dev/accounts/aurareaper/projects/eventify/builds/85ec0ead-fe20-4588-91b9-b7bbddae7296)

## 📋 Table of Contents
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Deployment](#deployment)
- [Security](#security)

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│ React Native    │    │   Go Fiber      │    │   PostgreSQL    │
│ (Expo) Frontend │◄──►│   REST API      │◄──►│   Database      │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        │                        │                        │
    ┌───▼────┐              ┌────▼────┐              ┌────▼────┐
    │ Expo   │              │ Fiber   │              │ GORM    │
    │ Router │              │ Middleware│              │ ORM     │
    └────────┘              └─────────┘              └─────────┘
```

### Frontend Architecture
- **React Native with Expo**: Cross-platform mobile development
- **TypeScript**: Type-safe JavaScript with enhanced developer experience
- **Expo Router**: File-based routing system for navigation
- **AsyncStorage**: Local data persistence for authentication tokens
- **Context API**: Global state management for authentication

### Backend Architecture
- **Go Fiber**: High-performance HTTP web framework
- **GORM**: Object-Relational Mapping for database operations
- **PostgreSQL**: Relational database for data persistence
- **JWT Authentication**: Secure token-based authentication
- **RESTful API**: Clean and predictable API design

## 🛠️ Technology Stack

### Backend
- **Language**: Go 1.21+
- **Framework**: Fiber v2.x
- **Database**: PostgreSQL
- **ORM**: GORM
- **Authentication**: JWT (JSON Web Tokens)
- **Middleware**: CORS, Logging, Timeout
- **Containerization**: Docker

### Frontend
- **Framework**: React Native with Expo SDK 49
- **Language**: TypeScript
- **Navigation**: Expo Router v2
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **UI Components**: Custom component library
- **State Management**: React Context API

### DevOps & Tools
- **Containerization**: Docker & Docker Compose
- **Version Control**: Git
- **Package Management**: Go Modules, npm/yarn

## 📁 Project Structure

```
event-management/
├── event-management-backend/
│   ├── cmd/api/
│   │   └── main.go              # Application entry point
│   ├── config/
│   │   └── config.go            # Configuration management
│   ├── db/
│   │   └── connection.go        # Database connection setup
│   ├── handlers/
│   │   ├── auth.go              # Authentication handlers
│   │   ├── event.go             # Event CRUD handlers
│   │   ├── ticket.go            # Ticket management handlers
│   │   └── user.go              # User management handlers
│   ├── middleware/
│   │   ├── auth.go              # JWT authentication middleware
│   │   └── cors.go              # CORS configuration
│   ├── models/
│   │   ├── event.go             # Event data model
│   │   ├── ticket.go            # Ticket data model
│   │   └── user.go              # User data model
│   ├── repositories/
│   │   ├── event.go             # Event repository interface
│   │   ├── ticket.go            # Ticket repository interface
│   │   └── user.go              # User repository interface
│   ├── services/
│   │   └── auth.go              # Authentication services
│   ├── utils/
│   │   └── jwt.go               # JWT utility functions
│   ├── .env                     # Environment variables
│   ├── Dockerfile               # Container configuration
│   ├── docker-compose.yml       # Multi-service orchestration
│   ├── go.mod                   # Go module dependencies
│   └── go.sum                   # Dependency checksums
│
├── event-management-frontend/
│   ├── app/
│   │   ├── (authed)/
│   │   │   ├── (tabs)/
│   │   │   │   ├── events/
│   │   │   │   │   └── index.tsx    # Events listing screen
│   │   │   │   ├── tickets/
│   │   │   │   │   └── index.tsx    # User tickets screen
│   │   │   │   └── settings/
│   │   │   │       └── index.tsx    # Settings screen
│   │   │   └── _layout.tsx          # Authenticated layout
│   │   ├── components/
│   │   │   ├── Button.tsx           # Custom button component
│   │   │   ├── Input.tsx            # Custom input component
│   │   │   └── Text.tsx             # Custom text component
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx      # Authentication context
│   │   ├── login.tsx                # Login/registration screen
│   │   └── _layout.tsx              # Root layout
│   ├── assets/                      # Static assets
│   ├── app.json                     # Expo configuration
│   ├── package.json                 # Dependencies and scripts
│   └── tsconfig.json                # TypeScript configuration
│
└── README.md                        # This file
```

## ✨ Features

### User Management
- **Role-based Access Control**: Manager and Attendee roles
- **JWT Authentication**: Secure token-based authentication
- **User Registration & Login**: Email/password authentication
- **Profile Management**: User profile updates and settings

### Event Management
- **Event Creation** (Managers): Create events with details, pricing, and capacity
- **Event Listing**: Browse available events with filtering
- **Event Details**: View comprehensive event information
- **Real-time Updates**: Live event data synchronization

### Ticket Management
- **Ticket Purchasing**: Secure ticket booking for attendees
- **Ticket Status Tracking**: Monitor ticket purchase and entry status
- **Manager Dashboard**: View ticket sales and entry statistics
- **Digital Tickets**: Mobile-friendly ticket display

### Mobile Experience
- **Cross-platform**: iOS and Android support via React Native
- **Responsive Design**: Optimized for various screen sizes
- **Offline Capability**: Local data persistence with AsyncStorage
- **Push Notifications**: Real-time event updates (planned)

## 🚀 Installation & Setup

### Prerequisites
- Go 1.21 or higher
- Node.js 18+ and npm/yarn
- PostgreSQL 13+
- Docker & Docker Compose (optional)
- Expo CLI

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-management/event-management-backend
   ```

2. **Install dependencies**
   ```bash
   go mod download
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and JWT secret
   ```

4. **Database setup**
   ```bash
   # Create PostgreSQL database
   createdb event_management
   
   # Run migrations (auto-migration in main.go)
   go run cmd/api/main.go
   ```

5. **Start the server**
   ```bash
   go run cmd/api/main.go
   # Server runs on http://localhost:8080
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../event-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Install Expo Go app on your mobile device
   - Scan the QR code from the terminal
   - Or press 'i' for iOS simulator, 'a' for Android emulator

### Docker Setup (Alternative)

1. **Using Docker Compose**
   ```bash
   cd event-management-backend
   docker-compose up -d
   ```

2. **Individual containers**
   ```bash
   # Backend
   docker build -t event-management-api .
   docker run -p 8080:8080 event-management-api
   ```

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | `{"email": "user@example.com", "password": "password", "role": "Attendee"}` |
| POST | `/api/auth/login` | User login | `{"email": "user@example.com", "password": "password"}` |
| POST | `/api/auth/logout` | User logout | - |

### Event Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/events` | List all events | ✓ |
| GET | `/api/events/:id` | Get event by ID | ✓ |
| POST | `/api/events` | Create new event | ✓ (Manager) |
| PUT | `/api/events/:id` | Update event | ✓ (Manager) |
| DELETE | `/api/events/:id` | Delete event | ✓ (Manager) |

### Ticket Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tickets` | List user tickets | ✓ |
| POST | `/api/tickets` | Purchase ticket | ✓ |
| GET | `/api/tickets/:id` | Get ticket details | ✓ |
| PUT | `/api/tickets/:id/scan` | Scan ticket entry | ✓ (Manager) |

### Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

## ⚙️ Environment Configuration

### Backend (.env)
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=event_management
DB_SSLMODE=disable

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=24h

# Server
PORT=8080
ENVIRONMENT=development

# CORS
ALLOWED_ORIGINS=*
```

### Frontend
Update API base URL in your frontend configuration:
```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

## 🛠️ Development

### Backend Development

1. **Hot reload with Air** (optional)
   ```bash
   go install github.com/cosmtrek/air@latest
   air
   ```

2. **Run tests**
   ```bash
   go test ./...
   ```

3. **Code formatting**
   ```bash
   go fmt ./...
   goimports -w .
   ```

### Frontend Development

1. **TypeScript checking**
   ```bash
   npx tsc --noEmit
   ```

2. **Expo development**
   ```bash
   npx expo start --clear
   ```

3. **Build for production**
   ```bash
   npx expo build:android
   npx expo build:ios
   ```

## 🚀 Deployment

### Backend Deployment

1. **Build binary**
   ```bash
   CGO_ENABLED=0 GOOS=linux go build -o main cmd/api/main.go
   ```

2. **Docker deployment**
   ```bash
   docker build -t event-management-api .
   docker push your-registry/event-management-api
   ```

3. **Environment setup**
   - Configure production database
   - Set secure JWT secret
   - Enable HTTPS
   - Configure CORS for production domains

### Frontend Deployment

1. **Expo Application Services (EAS)**
   ```bash
   npm install -g @expo/eas-cli
   eas build --platform all
   eas submit --platform all
   ```

2. **Web deployment**
   ```bash
   npx expo export:web
   # Deploy dist/ folder to your web hosting service
   ```

## 🔒 Security

### Implemented Security Measures
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt for secure password storage
- **CORS Configuration**: Controlled cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Role-based Access**: Manager/Attendee role separation
- **Database Security**: Parameterized queries via GORM

### Security Best Practices
- Use HTTPS in production
- Implement rate limiting
- Regular security audits
- Environment variable protection
- Database connection encryption
- API versioning for security updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Go Fiber and React Native**

*This is a personal project demonstrating modern full-stack development with Go and React Native.*

