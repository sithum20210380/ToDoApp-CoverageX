# ToDoApp-CoverageX
To-Do task web application for CoverageX LLC
![Todo App Demo](src/TodoApp.Web/src/assets/Demo.gif)
A full-stack todo application built with .NET 7, React, and MySQL using Docker containers.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Docker Configuration](#docker-configuration)
- [Troubleshooting](#troubleshooting)

## Features

- Create todo tasks with title and description
- View the 5 most recent tasks
- Mark tasks as completed
- Containerized application using Docker
- Scalable architecture following SOLID principles
- Full test coverage
- REST API with Swagger documentation

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [.NET SDK 7.0](https://dotnet.microsoft.com/download/dotnet/7.0)
- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)

## Tech Stack

- **Backend**
  - ASP.NET Core 7.0
  - Entity Framework Core
  - MySQL
  - AutoMapper
  
- **Frontend**
  - React
  - TypeScript
  - Axios
  - Tailwind CSS

- **Infrastructure**
  - Docker
  - Nginx
  - Entity Framework Migrations

## Project Structure

```
todo-application/
├── src/
│   ├── TodoApp.Api/           # Backend .NET API project
│   ├── TodoApp.Core/          # Core business logic and entities
│   ├── TodoApp.Infrastructure/# Data access and external services
│   └── TodoApp.Web/           # Frontend React application
├── tests/
│   ├── TodoApp.Api.Tests/     # API unit tests
│   ├── TodoApp.Core.Tests/    # Core unit tests
│   └── TodoApp.E2E.Tests/     # End-to-end tests
├── docker/
│   ├── api/                   # API Docker files
│   ├── web/                   # Web Docker files
│   └── db/                    # Database initialization scripts
├── docker-compose.yml
├── .env
└── README.md
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-application
   ```

2. Create a `.env` file in the root directory:
   ```
   COMPOSE_PROJECT_NAME=todoapp
   MYSQL_ROOT_PASSWORD=rootpassword
   MYSQL_DATABASE=tododb
   MYSQL_USER=todouser
   MYSQL_PASSWORD=todopassword
   API_PORT=5000
   WEB_PORT=3000
   ```

3. Build and run the application:
   ```bash
   docker-compose --project-name todoapp up --build
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - API: http://localhost:5000
   - Swagger Documentation: http://localhost:5000/swagger

## Development

### Backend Development

1. Install .NET dependencies:
   ```bash
   dotnet restore
   ```

2. Run migrations:
   ```bash
   cd src/TodoApp.Api
   dotnet ef database update
   ```

3. Run the API locally:
   ```bash
   dotnet run
   ```

### Frontend Development

1. Install Node.js dependencies:
   ```bash
   cd src/TodoApp.Web
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## Testing

### Running Backend Tests

```bash
# Run all tests
dotnet test

# Run specific test project
dotnet test tests/TodoApp.Api.Tests

# Generate coverage report
dotnet test /p:CollectCoverage=true /p:CoverletOutputFormat=opencover
```

### Running Frontend Tests

```bash
cd src/TodoApp.Web
npm test
```

## API Documentation

The API documentation is available through Swagger UI at http://localhost:5000/swagger when the application is running.

### API Endpoints

- `GET /api/tasks` - Get recent tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}/complete` - Mark a task as complete

## Docker Configuration

### Services

- **MySQL Database**
  - Port: 3306
  - Environment variables configured in `.env`

- **API Service**
  - Port: 5000
  - Built from .NET 7.0 SDK
  - Auto-connects to MySQL

- **Web Service**
  - Port: 3000
  - Nginx server
  - Built from Node.js base image

### Docker Commands

```bash
# Start all services
docker-compose up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Remove volumes
docker-compose down -v
```
