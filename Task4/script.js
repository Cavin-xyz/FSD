// Database Tables - Dummy Data

// Customers Table
const customers = [
    { customer_id: 1, customer_name: "John Smith", email: "john.smith@email.com", city: "New York" },
    { customer_id: 2, customer_name: "Alice Johnson", email: "alice.j@email.com", city: "Los Angeles" },
    { customer_id: 3, customer_name: "Bob Williams", email: "bob.w@email.com", city: "Chicago" },
    { customer_id: 4, customer_name: "Emma Davis", email: "emma.d@email.com", city: "Houston" },
    { customer_id: 5, customer_name: "Michael Brown", email: "michael.b@email.com", city: "Phoenix" },
    { customer_id: 6, customer_name: "Sarah Miller", email: "sarah.m@email.com", city: "Philadelphia" }
];

// Products Table
const products = [
    { product_id: 101, product_name: "Laptop Pro 15", category: "Electronics", price: 1299.99 },
    { product_id: 102, product_name: "Wireless Mouse", category: "Electronics", price: 29.99 },
    { product_id: 103, product_name: "USB-C Cable", category: "Accessories", price: 15.99 },
    { product_id: 104, product_name: "Mechanical Keyboard", category: "Electronics", price: 89.99 },
    { product_id: 105, product_name: "Monitor 27 inch", category: "Electronics", price: 349.99 },
    { product_id: 106, product_name: "Laptop Bag", category: "Accessories", price: 49.99 },
    { product_id: 107, product_name: "Webcam HD", category: "Electronics", price: 79.99 },
    { product_id: 108, product_name: "External SSD 1TB", category: "Storage", price: 129.99 },
    { product_id: 109, product_name: "Headphones", category: "Electronics", price: 199.99 },
    { product_id: 110, product_name: "Phone Stand", category: "Accessories", price: 19.99 }
];

// Orders Table
const orders = [
    { order_id: 1001, customer_id: 1, product_id: 101, quantity: 1, order_date: "2024-01-15", status: "Completed" },
    { order_id: 1002, customer_id: 1, product_id: 102, quantity: 2, order_date: "2024-01-15", status: "Completed" },
    { order_id: 1003, customer_id: 2, product_id: 105, quantity: 1, order_date: "2024-01-20", status: "Shipped" },
    { order_id: 1004, customer_id: 2, product_id: 104, quantity: 1, order_date: "2024-01-20", status: "Shipped" },
    { order_id: 1005, customer_id: 3, product_id: 101, quantity: 2, order_date: "2024-02-01", status: "Completed" },
    { order_id: 1006, customer_id: 3, product_id: 107, quantity: 1, order_date: "2024-02-01", status: "Completed" },
    { order_id: 1007, customer_id: 4, product_id: 109, quantity: 1, order_date: "2024-02-05", status: "Pending" },
    { order_id: 1008, customer_id: 5, product_id: 108, quantity: 2, order_date: "2024-02-08", status: "Completed" },
    { order_id: 1009, customer_id: 1, product_id: 106, quantity: 1, order_date: "2024-02-10", status: "Shipped" },
    { order_id: 1010, customer_id: 2, product_id: 103, quantity: 3, order_date: "2024-02-12", status: "Completed" },
    { order_id: 1011, customer_id: 6, product_id: 101, quantity: 1, order_date: "2024-02-15", status: "Pending" },
    { order_id: 1012, customer_id: 3, product_id: 110, quantity: 2, order_date: "2024-02-18", status: "Completed" },
    { order_id: 1013, customer_id: 2, product_id: 102, quantity: 1, order_date: "2024-02-20", status: "Cancelled" },
    { order_id: 1014, customer_id: 4, product_id: 105, quantity: 1, order_date: "2024-02-22", status: "Shipped" },
    { order_id: 1015, customer_id: 5, product_id: 104, quantity: 1, order_date: "2024-02-25", status: "Completed" }
];

// JOIN Query - Simulating INNER JOIN
function performJoinQuery() {
    return orders.map(order => {
        const customer = customers.find(c => c.customer_id === order.customer_id);
        const product = products.find(p => p.product_id === order.product_id);
        
        return {
            order_id: order.order_id,
            customer_name: customer.customer_name,
            customer_email: customer.email,
            customer_city: customer.city,
            product_name: product.product_name,
            category: product.category,
            unit_price: product.price,
            quantity: order.quantity,
            total_amount: product.price * order.quantity,
            order_date: order.order_date,
            status: order.status
        };
    });
}

// Subquery: Find Highest Value Order
function findHighestValueOrder() {
    const joinedData = performJoinQuery();
    return joinedData.reduce((max, order) => 
        order.total_amount > max.total_amount ? order : max
    );
}

// Subquery: Find Most Active Customer
function findMostActiveCustomer() {
    const customerOrderCount = {};
    const customerTotal = {};
    
    orders.forEach(order => {
        const customer = customers.find(c => c.customer_id === order.customer_id);
        const product = products.find(p => p.product_id === order.product_id);
        const total = product.price * order.quantity;
        
        if (!customerOrderCount[order.customer_id]) {
            customerOrderCount[order.customer_id] = 0;
            customerTotal[order.customer_id] = 0;
        }
        customerOrderCount[order.customer_id]++;
        customerTotal[order.customer_id] += total;
    });
    
    let maxOrders = 0;
    let mostActiveCustomerId = null;
    
    for (let customerId in customerOrderCount) {
        if (customerOrderCount[customerId] > maxOrders) {
            maxOrders = customerOrderCount[customerId];
            mostActiveCustomerId = parseInt(customerId);
        }
    }
    
    const customer = customers.find(c => c.customer_id === mostActiveCustomerId);
    
    return {
        customer_name: customer.customer_name,
        order_count: maxOrders,
        total_spent: customerTotal[mostActiveCustomerId]
    };
}

// Initialize Dashboard
function initDashboard() {
    populateCustomersTable();
    populateProductsTable();
    populateOrdersTable();
    populateJoinResults();
    updateAnalytics();
    populateCustomerHistory();
    populateCustomerFilter();
    attachEventListeners();
}

// Populate Customers Table
function populateCustomersTable() {
    const tbody = document.getElementById('customersTableBody');
    tbody.innerHTML = customers.map(customer => `
        <tr>
            <td>${customer.customer_id}</td>
            <td><strong>${customer.customer_name}</strong></td>
            <td>${customer.email}</td>
            <td>${customer.city}</td>
        </tr>
    `).join('');
}

// Populate Products Table
function populateProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.product_id}</td>
            <td><strong>${product.product_name}</strong></td>
            <td><span class="category-badge">${product.category}</span></td>
            <td class="price">$${product.price.toFixed(2)}</td>
        </tr>
    `).join('');
}

// Populate Orders Table
function populateOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.order_id}</td>
            <td>${order.customer_id}</td>
            <td>${order.product_id}</td>
            <td>${order.quantity}</td>
            <td>${formatDate(order.order_date)}</td>
            <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
        </tr>
    `).join('');
}

// Populate JOIN Results
function populateJoinResults(filteredData = null) {
    const data = filteredData || performJoinQuery();
    const tbody = document.getElementById('joinResultsBody');
    
    tbody.innerHTML = data.map(row => `
        <tr>
            <td>${row.order_id}</td>
            <td><strong>${row.customer_name}</strong></td>
            <td>${row.product_name}</td>
            <td>${row.quantity}</td>
            <td class="price">$${row.unit_price.toFixed(2)}</td>
            <td class="price"><strong>$${row.total_amount.toFixed(2)}</strong></td>
            <td>${formatDate(row.order_date)}</td>
            <td><span class="status-badge status-${row.status.toLowerCase()}">${row.status}</span></td>
        </tr>
    `).join('');
}

// Update Analytics
function updateAnalytics() {
    // Highest Value Order
    const highestOrder = findHighestValueOrder();
    document.getElementById('highestOrderValue').textContent = `$${highestOrder.total_amount.toFixed(2)}`;
    document.getElementById('highestOrderCustomer').textContent = highestOrder.customer_name;
    document.getElementById('highestOrderDate').textContent = `Order #${highestOrder.order_id} • ${formatDate(highestOrder.order_date)}`;
    
    // Most Active Customer
    const mostActive = findMostActiveCustomer();
    document.getElementById('mostActiveCustomerName').textContent = mostActive.customer_name;
    document.getElementById('mostActiveCustomerOrders').textContent = `${mostActive.order_count} orders`;
    document.getElementById('mostActiveCustomerTotal').textContent = `Total: $${mostActive.total_spent.toFixed(2)}`;
    
    // Total Orders
    document.getElementById('totalOrders').textContent = orders.length;
    
    // Total Revenue
    const totalRevenue = performJoinQuery().reduce((sum, order) => sum + order.total_amount, 0);
    document.getElementById('totalRevenue').textContent = `$${totalRevenue.toFixed(2)}`;
}

// Populate Customer History
function populateCustomerHistory() {
    const customerCards = document.getElementById('customerCards');
    const joinedData = performJoinQuery();
    
    customers.forEach(customer => {
        const customerOrders = joinedData.filter(o => o.customer_name === customer.customer_name);
        const totalSpent = customerOrders.reduce((sum, o) => sum + o.total_amount, 0);
        
        const card = document.createElement('div');
        card.className = 'customer-card';
        card.innerHTML = `
            <div class="customer-header">
                <div>
                    <div class="customer-name">${customer.customer_name}</div>
                    <div class="customer-email">${customer.email}</div>
                </div>
                <div class="order-count">${customerOrders.length} Orders</div>
            </div>
            
            <div class="customer-stats">
                <div class="stat-item">
                    <div class="stat-label">Total Spent</div>
                    <div class="stat-value">$${totalSpent.toFixed(2)}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Avg Order</div>
                    <div class="stat-value">$${(totalSpent / customerOrders.length || 0).toFixed(2)}</div>
                </div>
            </div>
            
            <div class="order-list">
                <h4>Recent Orders:</h4>
                ${customerOrders.slice(0, 3).map(order => `
                    <div class="order-item">
                        <div class="order-info">
                            <div class="order-product">${order.product_name}</div>
                            <div class="order-date">${formatDate(order.order_date)} • Qty: ${order.quantity}</div>
                        </div>
                        <div class="order-amount">$${order.total_amount.toFixed(2)}</div>
                    </div>
                `).join('')}
            </div>
        `;
        customerCards.appendChild(card);
    });
}

// Populate Customer Filter
function populateCustomerFilter() {
    const select = document.getElementById('customerFilter');
    customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.customer_name;
        option.textContent = customer.customer_name;
        select.appendChild(option);
    });
}

// Filter and Sort JOIN Results
function filterAndSortResults() {
    let data = performJoinQuery();
    
    // Filter by customer
    const customerFilter = document.getElementById('customerFilter').value;
    if (customerFilter !== 'all') {
        data = data.filter(row => row.customer_name === customerFilter);
    }
    
    // Filter by status
    const statusFilter = document.getElementById('statusFilter').value;
    if (statusFilter !== 'all') {
        data = data.filter(row => row.status === statusFilter);
    }
    
    // Sort
    const sortBy = document.getElementById('sortBy').value;
    data.sort((a, b) => {
        switch(sortBy) {
            case 'date-desc':
                return new Date(b.order_date) - new Date(a.order_date);
            case 'date-asc':
                return new Date(a.order_date) - new Date(b.order_date);
            case 'amount-desc':
                return b.total_amount - a.total_amount;
            case 'amount-asc':
                return a.total_amount - b.total_amount;
            default:
                return 0;
        }
    });
    
    populateJoinResults(data);
}

// Attach Event Listeners
function attachEventListeners() {
    document.getElementById('customerFilter').addEventListener('change', filterAndSortResults);
    document.getElementById('statusFilter').addEventListener('change', filterAndSortResults);
    document.getElementById('sortBy').addEventListener('change', filterAndSortResults);
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initDashboard);
