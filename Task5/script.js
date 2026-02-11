// Database Simulation - Accounts
let userAccounts = [
    { id: 'U001', name: 'John Smith', balance: 5000.00 },
    { id: 'U002', name: 'Alice Johnson', balance: 3500.00 },
    { id: 'U003', name: 'Bob Williams', balance: 7200.00 },
    { id: 'U004', name: 'Emma Davis', balance: 1200.00 }
];

let merchantAccounts = [
    { id: 'M001', name: 'Amazon Store', balance: 150000.00 },
    { id: 'M002', name: 'Netflix Services', balance: 85000.00 },
    { id: 'M003', name: 'Uber Technologies', balance: 120000.00 },
    { id: 'M004', name: 'Apple Inc.', balance: 250000.00 }
];

let transactionHistory = [];
let transactionIdCounter = 1000;

// Initialize Application
function initApp() {
    populateAccountSelects();
    displayAccounts();
    updateBalanceDisplay();
    attachEventListeners();
}

// Populate Account Dropdowns
function populateAccountSelects() {
    const userSelect = document.getElementById('userAccount');
    const merchantSelect = document.getElementById('merchantAccount');

    userAccounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = `${account.name} (${account.id})`;
        userSelect.appendChild(option);
    });

    merchantAccounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = `${account.name} (${account.id})`;
        merchantSelect.appendChild(option);
    });
}

// Display Account Cards
function displayAccounts() {
    const userAccountsList = document.getElementById('userAccountsList');
    const merchantAccountsList = document.getElementById('merchantAccountsList');

    userAccountsList.innerHTML = userAccounts.map(account => `
        <div class="account-card">
            <div class="account-header">
                <div>
                    <div class="account-name">${account.name}</div>
                    <div class="account-id">${account.id}</div>
                </div>
            </div>
            <div class="account-balance-display">$${account.balance.toFixed(2)}</div>
        </div>
    `).join('');

    merchantAccountsList.innerHTML = merchantAccounts.map(account => `
        <div class="account-card">
            <div class="account-header">
                <div>
                    <div class="account-name">${account.name}</div>
                    <div class="account-id">${account.id}</div>
                </div>
            </div>
            <div class="account-balance-display">$${account.balance.toFixed(2)}</div>
        </div>
    `).join('');
}

// Update Balance Display on Selection
function updateBalanceDisplay() {
    const userSelect = document.getElementById('userAccount');
    const merchantSelect = document.getElementById('merchantAccount');

    userSelect.addEventListener('change', function() {
        const account = userAccounts.find(a => a.id === this.value);
        if (account) {
            document.getElementById('userBalance').textContent = `Balance: $${account.balance.toFixed(2)}`;
            updateTransactionPreview();
        }
    });

    merchantSelect.addEventListener('change', function() {
        const account = merchantAccounts.find(a => a.id === this.value);
        if (account) {
            document.getElementById('merchantBalance').textContent = `Balance: $${account.balance.toFixed(2)}`;
            updateTransactionPreview();
        }
    });
}

// Update Transaction Preview
function updateTransactionPreview() {
    const userId = document.getElementById('userAccount').value;
    const merchantId = document.getElementById('merchantAccount').value;
    const amount = parseFloat(document.getElementById('paymentAmount').value) || 0;

    const user = userAccounts.find(a => a.id === userId);
    const merchant = merchantAccounts.find(a => a.id === merchantId);

    document.getElementById('previewFrom').textContent = user ? user.name : '-';
    document.getElementById('previewTo').textContent = merchant ? merchant.name : '-';
    document.getElementById('previewAmount').textContent = `$${amount.toFixed(2)}`;
}

// Process Payment Transaction
async function processPayment(e) {
    e.preventDefault();

    const userId = document.getElementById('userAccount').value;
    const merchantId = document.getElementById('merchantAccount').value;
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const description = document.getElementById('paymentDescription').value;

    // Validate inputs
    if (!userId || !merchantId || !amount) {
        showAlert('error', 'Validation Error', 'Please fill in all required fields');
        return;
    }

    // Start transaction
    await executeTransaction(userId, merchantId, amount, description);
}

// Execute Transaction with COMMIT/ROLLBACK
async function executeTransaction(userId, merchantId, amount, description, forceError = null) {
    const transactionId = `TXN${transactionIdCounter++}`;
    const timestamp = new Date().toISOString();

    // Show processing modal
    showTransactionModal();

    // Create backup for rollback
    const userBackup = JSON.parse(JSON.stringify(userAccounts));
    const merchantBackup = JSON.parse(JSON.stringify(merchantAccounts));

    let transactionSteps = [];
    let transactionStatus = 'pending';
    let failureReason = '';

    try {
        // Step 1: Begin Transaction
        await addTransactionStep('⏳', 'BEGIN TRANSACTION', 'Initiating payment process...', 'processing');
        await sleep(800);
        transactionSteps.push({ step: 'BEGIN TRANSACTION', status: 'success' });

        // Step 2: Validate User Account
        await addTransactionStep('🔍', 'VALIDATE USER', 'Checking user account...', 'processing');
        await sleep(800);
        
        const userAccount = userAccounts.find(a => a.id === userId);
        if (!userAccount) {
            throw new Error('User account not found');
        }
        
        updateStepStatus('success');
        transactionSteps.push({ step: 'VALIDATE USER', status: 'success' });

        // Step 3: Check Balance
        await addTransactionStep('💰', 'CHECK BALANCE', `Verifying sufficient funds...`, 'processing');
        await sleep(800);

        if (forceError === 'insufficient') {
            throw new Error('Insufficient funds in user account');
        }

        if (userAccount.balance < amount) {
            throw new Error(`Insufficient funds. Available: $${userAccount.balance.toFixed(2)}, Required: $${amount.toFixed(2)}`);
        }

        updateStepStatus('success');
        transactionSteps.push({ step: 'CHECK BALANCE', status: 'success' });

        // Step 4: Deduct from User
        await addTransactionStep('➖', 'DEDUCT AMOUNT', `Deducting $${amount.toFixed(2)} from user account...`, 'processing');
        await sleep(1000);

        userAccount.balance -= amount;

        updateStepStatus('success');
        transactionSteps.push({ step: 'DEDUCT FROM USER', status: 'success', amount: -amount });

        // Step 5: Add to Merchant
        await addTransactionStep('➕', 'ADD TO MERCHANT', `Adding $${amount.toFixed(2)} to merchant account...`, 'processing');
        await sleep(1000);

        if (forceError === 'system') {
            throw new Error('System error occurred during merchant credit');
        }

        const merchantAccount = merchantAccounts.find(a => a.id === merchantId);
        if (!merchantAccount) {
            throw new Error('Merchant account not found');
        }

        merchantAccount.balance += amount;

        updateStepStatus('success');
        transactionSteps.push({ step: 'ADD TO MERCHANT', status: 'success', amount: +amount });

        // Step 6: COMMIT Transaction
        await addTransactionStep('✅', 'COMMIT', 'Committing transaction...', 'processing');
        await sleep(800);

        transactionStatus = 'committed';
        updateStepStatus('success');

        // Success
        await sleep(500);
        hideTransactionModal();
        showAlert('success', 'Transaction Committed ✅', 
            `Payment of $${amount.toFixed(2)} processed successfully. Transaction ID: ${transactionId}`);

    } catch (error) {
        // ROLLBACK on error
        failureReason = error.message;
        
        await addTransactionStep('🔄', 'ROLLBACK', 'Error detected. Rolling back transaction...', 'processing');
        await sleep(1000);

        // Restore original state
        userAccounts = userBackup;
        merchantAccounts = merchantBackup;

        transactionStatus = 'rolled-back';
        updateStepStatus('error');

        await sleep(500);
        hideTransactionModal();
        showAlert('rollback', 'Transaction Rolled Back ❌', 
            `Payment failed and has been rolled back. Reason: ${failureReason}`);
    }

    // Record transaction in history
    const user = userAccounts.find(a => a.id === userId);
    const merchant = merchantAccounts.find(a => a.id === merchantId);

    transactionHistory.unshift({
        id: transactionId,
        timestamp,
        from: user.name,
        to: merchant.name,
        amount,
        description,
        status: transactionStatus,
        reason: failureReason || 'Transaction completed successfully',
        steps: transactionSteps
    });

    // Update UI
    displayAccounts();
    displayTransactionHistory();
    document.getElementById('paymentForm').reset();
    updateTransactionPreview();
}

// Transaction Modal Functions
function showTransactionModal() {
    const modal = document.getElementById('transactionModal');
    const stepsContainer = document.getElementById('transactionSteps');
    stepsContainer.innerHTML = '';
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 10);
}

function hideTransactionModal() {
    const modal = document.getElementById('transactionModal');
    modal.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

async function addTransactionStep(icon, title, description, status) {
    const stepsContainer = document.getElementById('transactionSteps');
    const step = document.createElement('div');
    step.className = `step-item ${status}`;
    step.innerHTML = `
        <div class="step-icon">${icon}</div>
        <div class="step-content">
            <div class="step-title">${title}</div>
            <div class="step-description">${description}</div>
        </div>
    `;
    stepsContainer.appendChild(step);
}

function updateStepStatus(status) {
    const steps = document.querySelectorAll('.step-item');
    const lastStep = steps[steps.length - 1];
    if (lastStep) {
        lastStep.className = `step-item ${status}`;
    }
}

// Display Transaction History
function displayTransactionHistory(filter = 'all') {
    const container = document.getElementById('transactionsList');
    
    let filtered = transactionHistory;
    if (filter !== 'all') {
        filtered = transactionHistory.filter(t => t.status === filter);
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📭</div>
                <p>No ${filter === 'all' ? '' : filter} transactions found</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(transaction => `
        <div class="transaction-item ${transaction.status}">
            <div class="transaction-header">
                <span class="transaction-id">${transaction.id}</span>
                <span class="transaction-status ${transaction.status}">
                    ${transaction.status === 'committed' ? '✅ COMMITTED' : '❌ ROLLED BACK'}
                </span>
            </div>
            <div class="transaction-details">
                <div class="detail-item">
                    <div class="detail-label">From</div>
                    <div class="detail-value">${transaction.from}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">To</div>
                    <div class="detail-value">${transaction.to}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Amount</div>
                    <div class="detail-value">$${transaction.amount.toFixed(2)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Date</div>
                    <div class="detail-value">${new Date(transaction.timestamp).toLocaleString()}</div>
                </div>
            </div>
            <div class="transaction-reason">
                <strong>${transaction.description}</strong><br>
                ${transaction.reason}
            </div>
        </div>
    `).join('');
}

// Show Alert
function showAlert(type, title, message) {
    const alert = document.getElementById('transactionAlert');
    const icons = {
        success: '✅',
        error: '❌',
        rollback: '🔄'
    };

    document.getElementById('alertIcon').textContent = icons[type];
    document.getElementById('alertTitle').textContent = title;
    document.getElementById('alertMessage').textContent = message;

    alert.className = `transaction-alert ${type}`;
    setTimeout(() => alert.classList.add('show'), 10);
}

// Test Scenarios
function testSuccess() {
    document.getElementById('userAccount').value = 'U003'; // Bob with $7200
    document.getElementById('merchantAccount').value = 'M001';
    document.getElementById('paymentAmount').value = '100.00';
    document.getElementById('paymentDescription').value = 'Test successful payment';
    updateBalanceDisplay();
    updateTransactionPreview();
}

function testInsufficientFunds() {
    document.getElementById('userAccount').value = 'U004'; // Emma with $1200
    document.getElementById('merchantAccount').value = 'M002';
    document.getElementById('paymentAmount').value = '5000.00'; // More than she has
    document.getElementById('paymentDescription').value = 'Test insufficient funds scenario';
    updateBalanceDisplay();
    updateTransactionPreview();
}

async function testSystemError() {
    const userId = 'U001';
    const merchantId = 'M003';
    const amount = 50.00;
    const description = 'Test system error scenario';
    
    await executeTransaction(userId, merchantId, amount, description, 'system');
}

// Event Listeners
function attachEventListeners() {
    document.getElementById('paymentForm').addEventListener('submit', processPayment);
    document.getElementById('paymentAmount').addEventListener('input', updateTransactionPreview);
    
    document.getElementById('closeAlert').addEventListener('click', () => {
        document.getElementById('transactionAlert').classList.remove('show');
    });

    // History filters
    document.querySelectorAll('.btn-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            displayTransactionHistory(this.dataset.filter);
        });
    });
}

// Utility: Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', initApp);
