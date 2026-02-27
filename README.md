# FSD — Full Stack Development

A full-stack e-commerce project (**VAUX**) built with a vanilla HTML/JS frontend and a Spring Boot + PostgreSQL backend.

## Project Structure

```
FSD/
├── backend/       Spring Boot REST API (port 8080) + PostgreSQL
├── vaux/          Vanilla HTML/JS frontend (e-commerce store)
└── playground/    Early HTML exercises
```

## Running the Project

### 1. Start the backend
```bash
cd backend
mvn spring-boot:run
```
API available at `http://localhost:8080/api`

### 2. Open the frontend
Open `vaux/index.html` in a browser or use VS Code Live Server.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, Vanilla CSS, Vanilla JS |
| Backend | Java 17, Spring Boot 3.2, Spring Security, JWT |
| Database | PostgreSQL |
| ORM | Spring Data JPA / Hibernate |