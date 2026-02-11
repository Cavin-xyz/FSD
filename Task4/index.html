<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Management System</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>🛒 Order Management System</h1>
            <p class="subtitle">Customer Orders with JOIN Queries & Analytics</p>
        </header>

        <!-- Analytics Cards -->
        <div class="analytics-section">
            <div class="analytics-card highlight">
                <div class="card-icon">🏆</div>
                <div class="card-content">
                    <h3>Highest Value Order</h3>
                    <div class="card-value" id="highestOrderValue">$0.00</div>
                    <div class="card-details">
                        <p id="highestOrderCustomer">-</p>
                        <p id="highestOrderDate">-</p>
                    </div>
                </div>
            </div>

            <div class="analytics-card highlight">
                <div class="card-icon">⭐</div>
                <div class="card-content">
                    <h3>Most Active Customer</h3>
                    <div class="card-value" id="mostActiveCustomerName">-</div>
                    <div class="card-details">
                        <p id="mostActiveCustomerOrders">0 orders</p>
                        <p id="mostActiveCustomerTotal">Total: $0.00</p>
                    </div>
                </div>
            </div>

            <div class="analytics-card">
                <div class="card-icon">📊</div>
                <div class="card-content">
                    <h3>Total Orders</h3>
                    <div class="card-value" id="totalOrders">0</div>
                    <p class="card-label">All time</p>
                </div>
            </div>

            <div class="analytics-card">
                <div class="card-icon">💰</div>
                <div class="card-content">
                    <h3>Total Revenue</h3>
                    <div class="card-value" id="totalRevenue">$0.00</div>
                    <p class="card-label">All time</p>
                </div>
            </div>
        </div>

        <!-- Database Tables Section -->
        <div class="tables-section">
            <h2>📋 Database Tables</h2>
            
            <div class="tables-grid">
                <!-- Customers Table -->
                <div class="table-container">
                    <h3>👥 Customers Table</h3>
                    <div class="table-wrapper">
                        <table id="customersTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>City</th>
                                </tr>
                            </thead>
                            <tbody id="customersTableBody">
                                <!-- Populated by JS -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Products Table -->
                <div class="table-container">
                    <h3>📦 Products Table</h3>
                    <div class="table-wrapper">
                        <table id="productsTable">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody id="productsTableBody">
                                <!-- Populated by JS -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Orders Table -->
                <div class="table-container full-width">
                    <h3>📝 Orders Table</h3>
                    <div class="table-wrapper">
                        <table id="ordersTable">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer ID</th>
                                    <th>Product ID</th>
                                    <th>Quantity</th>
                                    <th>Order Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody id="ordersTableBody">
                                <!-- Populated by JS -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- JOIN Query Results -->
        <div class="join-section">
            <h2>🔗 JOIN Query Results</h2>
            <div class="query-box">
                <code>
                    SELECT o.order_id, c.customer_name, p.product_name, o.quantity, 
                           (p.price * o.quantity) AS total_amount, o.order_date, o.status
                    FROM orders o
                    INNER JOIN customers c ON o.customer_id = c.customer_id
                    INNER JOIN products p ON o.product_id = p.product_id
                    ORDER BY o.order_date DESC
                </code>
            </div>

            <div class="controls-bar">
                <div class="filter-group">
                    <label for="customerFilter">Customer:</label>
                    <select id="customerFilter">
                        <option value="all">All Customers</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="statusFilter">Status:</label>
                    <select id="statusFilter">
                        <option value="all">All Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
                <div class="filter-group">
                    <label for="sortBy">Sort By:</label>
                    <select id="sortBy">
                        <option value="date-desc">Date (Newest First)</option>
                        <option value="date-asc">Date (Oldest First)</option>
                        <option value="amount-desc">Amount (High to Low)</option>
                        <option value="amount-asc">Amount (Low to High)</option>
                    </select>
                </div>
            </div>

            <div class="table-container">
                <div class="table-wrapper">
                    <table id="joinResultsTable">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Total Amount</th>
                                <th>Order Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody id="joinResultsBody">
                            <!-- Populated by JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Customer Order History -->
        <div class="history-section">
            <h2>📜 Customer Order History</h2>
            <div class="customer-cards" id="customerCards">
                <!-- Populated by JS -->
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>