# Quick Start Guide

## 5-Minute Setup

### Step 1: Create PostgreSQL Database (1 min)

```bash
# Windows (in PowerShell or Command Prompt)
psql -U postgres

# At the PostgreSQL prompt:
CREATE DATABASE vaux_db;
\q
```

**Not using postgres user?** Update the credentials in `application.properties`

### Step 2: Configure Application (1 min)

Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/vaux_db
spring.datasource.username=postgres  # Your PostgreSQL username
spring.datasource.password=your_password  # Your PostgreSQL password
```

### Step 3: Run Application (1 min)

```bash
cd backend
mvn spring-boot:run
```

**Success?** You'll see:
```
Tomcat started on port(s): 8080 (http)
```

### Step 4: Test API (2 min)

**Register a user:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Response:** You'll get a JWT token
```json
{
  "token": "eyJhbG...",
  "email": "test@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "userId": 1
}
```

**Get all products:**
```bash
curl http://localhost:8080/api/products
```

## Connect Frontend

In your JavaScript code:

```javascript
const API_URL = 'http://localhost:8080/api';

// Login
const response = await fetch(`${API_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    email: 'test@example.com', 
    password: 'password123' 
  })
});

const { token } = await response.json();

// Save token
localStorage.setItem('token', token);

// Use token for authenticated requests
const cart = await fetch(`${API_URL}/cart`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## Common Issues

| Issue | Solution |
|-------|----------|
| "Connection refused" | PostgreSQL not running. Start it from Services |
| "FATAL: database doesn't exist" | Run `CREATE DATABASE vaux_db;` in psql |
| "Port 8080 already in use" | Change `server.port=8081` in application.properties |
| CORS errors from frontend | Add frontend URL to CORS config in application.properties |

## Add Sample Products

```bash
# Connect to database
psql -U postgres -d vaux_db

# Run this SQL
INSERT INTO products (name, category, price, emoji, rating, reviews, badge, stock) VALUES
('Leather Weekend Bag', 'fashion', 320, '👜', 4.8, 124, 'new', 100),
('Signature Eau de Parfum', 'beauty', 148, '🧴', 4.9, 89, NULL, 100),
('Minimal Gold Watch', 'accessories', 540, '⌚', 4.7, 52, NULL, 100),
('Cashmere Throw Blanket', 'home', 195, '🧣', 4.6, 78, 'sale', 100);
```

## Project Ready! 🎉

Your Spring Boot backend is now running and ready to serve your frontend.

- **API Base URL:** `http://localhost:8080/api`
- **Database:** PostgreSQL on `localhost:5432`
- **Auth:** JWT-based (token in Authorization header)

See **README.md** for complete API documentation.
