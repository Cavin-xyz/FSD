* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.container {
  width: 100%;
  max-width: 450px;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login-box {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.icon {
  font-size: 60px;
  margin-bottom: 15px;
  animation: rotate 2s ease-in-out infinite;
}

@keyframes rotate {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
}

.login-header h1 {
  color: #333;
  font-size: 28px;
  margin-bottom: 8px;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

/* Alert Box */
.alert {
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.alert.show {
  opacity: 1;
  transform: translateY(0);
}

.alert.hidden {
  display: none;
}

.alert.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.alert.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 0;
  margin-left: 10px;
}

.close-btn:hover {
  opacity: 1;
}

/* Form Groups */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
  font-size: 14px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 15px;
  font-size: 18px;
  z-index: 1;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: inherit;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

input.input-error {
  border-color: #e74c3c;
  background-color: #fff5f5;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 5px;
  transition: transform 0.2s;
}

.toggle-password:hover {
  transform: scale(1.1);
}

.error-message {
  display: block;
  color: #e74c3c;
  font-size: 12px;
  margin-top: 5px;
  min-height: 16px;
  font-weight: 500;
}

/* Form Options */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 14px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  color: #666;
}

.checkbox-container input {
  margin-right: 8px;
  cursor: pointer;
}

.forgot-password {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.forgot-password:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* Login Button */
.btn-login {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

.btn-login:active:not(:disabled) {
  transform: translateY(0);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Loader */
.loader {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader.hidden {
  display: none;
}

/* Signup Link */
.signup-link {
  text-align: center;
  margin-top: 25px;
  color: #666;
  font-size: 14px;
}

.signup-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.signup-link a:hover {
  color: #764ba2;
  text-decoration: underline;
}

/* Demo Credentials */
.demo-credentials {
  margin-top: 30px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #667eea;
}

.demo-credentials h3 {
  color: #333;
  font-size: 14px;
  margin-bottom: 12px;
}

.demo-user {
  padding: 8px 0;
  font-size: 13px;
  color: #555;
  border-bottom: 1px solid #e0e0e0;
}

.demo-user:last-child {
  border-bottom: none;
}

.demo-user strong {
  color: #667eea;
  display: inline-block;
  min-width: 70px;
}

/* Responsive Design */
@media (max-width: 500px) {
  .login-box {
    padding: 30px 25px;
  }

  .login-header h1 {
    font-size: 24px;
  }

  .form-options {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  .demo-credentials {
    padding: 15px;
  }

  .demo-user {
    font-size: 12px;
  }
}

/* Animations for form inputs */
input:focus + .input-icon {
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
