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

    <%-- Error state --%>
    <c:if test="${not empty error}">
        <div class="alert alert-error">${error}</div>
        <a class="btn btn-view" href="${pageContext.request.contextPath}/employees">&#8592; Back</a>
    </c:if>

    <%-- Detail card --%>
    <c:if test="${not empty employee}">
        <h1>Employee Details</h1>
        <div class="detail-card">
            <div class="detail-avatar">${fn:substring(employee.name,0,1)}</div>
            <div class="detail-info">
                <h2>${employee.name}</h2>
                <span class="badge">${employee.department}</span>
                <table class="info-table">
                    <tr><th>ID</th>         <td>${employee.id}</td></tr>
                    <tr><th>Email</th>       <td>${employee.email}</td></tr>
                    <tr><th>Salary</th>      <td>&#8377;${employee.salary}</td></tr>
                    <tr><th>Department</th>  <td>${employee.department}</td></tr>
                </table>
                <div class="action-row">
                    <a class="btn btn-view"
                       href="${pageContext.request.contextPath}/employees">&#8592; All Employees</a>
                    <a class="btn btn-delete"
                       href="${pageContext.request.contextPath}/employees/delete/${employee.id}"
                       onclick="return confirm('Delete ${employee.name}?')">Delete</a>
                </div>
            </div>
        </div>
    </c:if>

</div>
</body>
</html>
