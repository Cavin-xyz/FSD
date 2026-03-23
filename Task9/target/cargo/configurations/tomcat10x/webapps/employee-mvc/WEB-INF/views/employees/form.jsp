<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${pageTitle} | EmployeeMS</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css">
</head>
<body>
<nav class="navbar">
    <span class="brand">&#128188; EmployeeMS</span>
    <a href="${pageContext.request.contextPath}/employees">All Employees</a>
    <a href="${pageContext.request.contextPath}/employees/add">+ Add Employee</a>
</nav>

<div class="container">
    <h1>Add New Employee</h1>

    <%-- Spring MVC @ModelAttribute binds form fields to Employee object --%>
    <form class="emp-form" method="post"
          action="${pageContext.request.contextPath}/employees/add">

        <div class="form-group">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="e.g. John Doe" required>
        </div>

        <div class="form-group">
            <label for="department">Department</label>
            <select id="department" name="department" required>
                <option value="">-- Select Department --</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
            </select>
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="john@company.com" required>
        </div>

        <div class="form-group">
            <label for="salary">Salary (&#8377;)</label>
            <input type="number" id="salary" name="salary" min="0" step="1000"
                   placeholder="e.g. 75000" required>
        </div>

        <div class="action-row">
            <button type="submit" class="btn btn-view">&#10003; Save Employee</button>
            <a class="btn btn-delete"
               href="${pageContext.request.contextPath}/employees">Cancel</a>
        </div>
    </form>
</div>
</body>
</html>
