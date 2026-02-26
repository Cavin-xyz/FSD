# Vaux Backend - Spring Boot & PostgreSQL

A complete e-commerce backend API built with Spring Boot, PostgreSQL, and JWT authentication.

## Prerequisites

- Java 17 or higher
- PostgreSQL installed and running
- Maven 3.6+

## Setup Instructions

### 1. Create PostgreSQL Database

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE vaux_db;

-- Create user (if needed)
CREATE USER vaux_user WITH PASSWORD 'vaux_password';
ALTER ROLE vaux_user SET client_encoding TO 'utf8';
ALTER ROLE vaux_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE vaux_user SET default_transaction_deferrable TO on;
ALTER ROLE vaux_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE vaux_db TO vaux_user;
```

### 2. Update Application Configuration

Edit `src/main/resources/application.properties`:

```properties
# Change these values according to your PostgreSQL setup
spring.datasource.url=jdbc:postgresql://localhost:5432/vaux_db
spring.datasource.username=postgres
spring.datasource.password=your_postgres_password

# Update JWT secret (use a long random string)
jwt.secret=your_super_secret_jwt_key_change_this_in_production
```

### 3. Build and Run

```bash
# Navigate to backend directory
cd backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080/api`

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

- **POST** `/api/auth/login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
  Returns JWT token

- **GET** `/api/auth/validate` - Validate token (requires Authorization header)

### Products

- **GET** `/api/products` - Get all products
- **GET** `/api/products/{id}` - Get product by ID
- **GET** `/api/products/category/{category}` - Get products by category
- **GET** `/api/products/search?name={name}` - Search products
- **POST** `/api/products` - Add new product (admin only)

### Cart

- **POST** `/api/cart/add` - Add item to cart
  ```json
  {
    "productId": 1,
    "quantity": 1
  }
  ```

- **GET** `/api/cart` - Get cart items
- **PUT** `/api/cart/{itemId}` - Update cart item quantity
  ```json
  {
    "quantity": 2
  }
  ```

- **DELETE** `/api/cart/{itemId}` - Remove item from cart
- **DELETE** `/api/cart/clear` - Clear entire cart

## Authenticating API Requests

All endpoints except `/api/auth/**` and `/api/products/**` require JWT authentication.

Include the token in request headers:
```
Authorization: Bearer {token}
```

## Project Structure

```
backend/
├── src/main/java/com/vaux/
│   ├── controller/        # REST Controllers
│   ├── service/          # Business Logic
│   ├── entity/           # JPA Entities
│   ├── repository/       # Data Access Layer
│   ├── dto/              # Data Transfer Objects
│   ├── security/         # Security Configuration & JWT
│   └── VauxBackendApplication.java
├── src/main/resources/
│   └── application.properties
└── pom.xml
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  enabled BOOLEAN DEFAULT true
);
```

### Products Table
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  emoji VARCHAR(10),
  rating DECIMAL(3, 1) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  badge VARCHAR(50),
  description TEXT,
  stock INTEGER DEFAULT 100
);
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
```

## Sample Products Data

You can insert sample data with these SQL commands:

```sql
INSERT INTO products (name, category, price, original_price, emoji, rating, reviews, badge, stock) VALUES
('Leather Weekend Bag', 'fashion', 320, NULL, '👜', 4.8, 124, 'new', 100),
('Signature Eau de Parfum', 'beauty', 148, NULL, '🧴', 4.9, 89, NULL, 100),
('Minimal Gold Watch', 'accessories', 540, NULL, '⌚', 4.7, 52, NULL, 100),
('Cashmere Throw Blanket', 'home', 195, 265, '🧣', 4.6, 78, 'sale', 100),
('Structured Blazer', 'fashion', 420, NULL, '🧥', 4.8, 63, NULL, 100),
('Facial Serum Set', 'beauty', 88, 120, '✨', 4.9, 210, 'sale', 100),
('Ceramic Vase Trio', 'home', 145, NULL, '🏺', 4.5, 34, 'new', 100),
('Silk Scarf', 'accessories', 210, NULL, '🎀', 4.7, 91, NULL, 100),
('Merino Turtleneck', 'fashion', 185, NULL, '👕', 4.6, 147, NULL, 100),
('Linen Candle Duo', 'home', 65, NULL, '🕯️', 4.8, 203, NULL, 100),
('Pearl Drop Earrings', 'accessories', 290, NULL, '💎', 4.9, 68, 'new', 100),
('Hand Cream Collection', 'beauty', 55, 78, '🫙', 4.7, 312, 'sale', 100);
```

## Frontend Integration

Update your frontend API endpoints to use the running backend:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';

// Example: Login
const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
localStorage.setItem('token', data.token);

// Example: Get Products with Authorization
const products = await fetch(`${API_BASE_URL}/products`, {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
```

## Security Notes

1. Change the `jwt.secret` in production
2. Use HTTPS in production
3. Set strong PostgreSQL passwords
4. The JWT token expires after 24 hours (86400000 ms) - adjust in `application.properties`

## Troubleshooting

### Port 8080 already in use
Change in `application.properties`: `server.port=8081`

### PostgreSQL connection error
- Verify PostgreSQL is running
- Check credentials in `application.properties`
- Ensure database `vaux_db` exists

### CORS errors
- Update frontend URL in `application.properties` CORS configuration
- The defaults allow `localhost:3000` and `localhost:5173`

## Next Steps

1. Start PostgreSQL and create the database
2. Update application.properties with your credentials
3. Run `mvn spring-boot:run`
4. Use the API endpoints in your frontend
5. Deploy to production when ready
