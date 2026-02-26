# PostgreSQL Setup Guide (Windows)

## Installation (if not already installed)

1. **Download PostgreSQL**
   - Go to https://www.postgresql.org/download/windows/
   - Download the latest version (14 or higher)

2. **Run Installer**
   - Double-click the downloaded file
   - Follow the installation wizard
   - Remember the password you set for the `postgres` user (you'll need it)
   - Default port is 5432 (keep it as is)

3. **Verify Installation**
   ```bash
   # Open PowerShell and run:
   psql --version
   ```

## Create Database for Vaux

### Method 1: Using Command Line (Recommended)

```bash
# Open PowerShell as Administrator

# Connect to PostgreSQL
psql -U postgres

# At the PostgreSQL prompt, create database
CREATE DATABASE vaux_db;

# Create a dedicated user (optional but recommended)
CREATE USER vaux_user WITH PASSWORD 'vaux_password';

# Grant privileges
ALTER ROLE vaux_user WITH CREATEDB;
ALTER ROLE vaux_user SET client_encoding TO 'utf8';
ALTER ROLE vaux_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE vaux_user SET default_transaction_deferrable TO on;
ALTER ROLE vaux_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE vaux_db TO vaux_user;

# Exit PostgreSQL
\q
```

### Method 2: Using pgAdmin GUI

1. Open pgAdmin (installed with PostgreSQL)
2. Right-click "Databases" → "Create" → "Database"
3. Name: `vaux_db`
4. Owner: `postgres` (or your user)
5. Click "Save"

## Verify Connection

```bash
# Test connection with default postgres user
psql -U postgres -d vaux_db

# Or with custom user
psql -U vaux_user -d vaux_db

# At the prompt, try:
SELECT version();

# Exit
\q
```

## Configure Spring Boot Application

Edit `src/main/resources/application.properties`:

### Option 1: Using postgres user (default)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/vaux_db
spring.datasource.username=postgres
spring.datasource.password=YOUR_POSTGRES_PASSWORD_HERE
```

### Option 2: Using dedicated vaux_user
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/vaux_db
spring.datasource.username=vaux_user
spring.datasource.password=vaux_password
```

### Suggested JWT Secret (change this in production!)
```properties
jwt.secret=MyVauxApp_SecretKey_2024_SuperLongRandomString_Change_In_Production
```

## Test Database Connection

```bash
# After starting Spring Boot, check logs for:
# "HikariPool-1 - Starting..."
# "HikariPool-1 - Pool started"

# If you see error, troubleshoot:

# 1. Check PostgreSQL is running
#    Services → Find "PostgreSQL" → Ensure it's running

# 2. Verify database exists
psql -U postgres -l

# 3. Check tables were created
psql -U postgres -d vaux_db
\dt

# 4. Try restarting PostgreSQL
#    Services → Right-click PostgreSQL → Restart
```

## Insert Sample Data

After tables are created, run this SQL:

```bash
psql -U postgres -d vaux_db
```

Then paste:

```sql
-- Insert products
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

-- Verify
SELECT COUNT(*) FROM products;
SELECT * FROM products;

-- Exit
\q
```

## Troubleshooting

### PostgreSQL Not Starting
- Open Services (services.msc)
- Find "PostgreSQL"
- If stopped, right-click and click "Start"

### Connection "Connection refused"
```bash
# Check if PostgreSQL is listening on port 5432
netstat -ano | findstr :5432
```

### Wrong Password Error
- Reset PostgreSQL password:
```bash
# On Windows, use this command
net user postgres password_reset_command
```

### Can't Connect from Terminal
- Ensure PostgreSQL path is in system PATH
- Restart PowerShell/Command Prompt after adding to PATH

### Port 5432 Already In Use
- Check what's using it:
```bash
netstat -ano | findstr :5432
```
- Either close that application or change PostgreSQL port to 5433 during installation

## Database Management Commands

```bash
# List all databases
psql -U postgres -l

# Connect to database
psql -U postgres -d vaux_db

# List tables
\dt

# Show table structure
\d products

# Show users/roles
\du

# Backup database
pg_dump -U postgres vaux_db > backup.sql

# Restore database
psql -U postgres -d vaux_db < backup.sql

# Drop database (careful!)
dropdb -U postgres vaux_db
```

## Success Indicators ✓

Your setup is complete when:
- ✓ PostgreSQL running (Services shows it as running)
- ✓ Database `vaux_db` created
- ✓ Tables created automatically (users, products, cart_items)
- ✓ Spring Boot starts without database errors
- ✓ API returns products at `/api/products`

## Next Steps

1. Start the Spring Boot application
2. Insert sample products data
3. Test in your frontend with the API

See `QUICK_START.md` for testing endpoints.
