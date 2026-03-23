<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} | EmployeeMS</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css">link>
</head>
<body>
<nav class="navbar">
    <span class="brand">&#128188; EmployeeMS</span>
    <a href="${pageContext.request.contextPath}/employees">All Employees</a>
    <a href="${pageContext.request.contextPath}/employees/add">+ Add Employee</a>
</nav>

<div class="container">
    <h1>Employee List</h1>

    <%-- Flash message --%>
    <c:if test="${not empty successMsg}">
        <div class="alert alert-success">${successMsg}</div>
    </c:if>

    <table class="employee-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Salary (&#8377;)</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <c:choose>
                <c:when test="${empty employees}">
                    <tr><td colspan="6" class="empty">No employees found.</td></tr>
                </c:when>
                <c:otherwise>
                    <c:forEach var="emp" items="${employees}">
                        <tr>
                            <td>${emp.id}</td>
                            <td>${emp.name}</td>
                            <td><span class="badge">${emp.department}</span></td>
                            <td>${emp.email}</td>
                            <td>&#8377;<c:out value="${emp.salary}"/></td>
                            <td>
                                <a class="btn btn-view"
                                   href="${pageContext.request.contextPath}/employees/${emp.id}">View</a>
                                <a class="btn btn-delete"
                                   href="${pageContext.request.contextPath}/employees/delete/${emp.id}"
                                   onclick="return confirm('Delete ${emp.name}?')">Delete</a>
                            </td>
                        </tr>
                    </c:forEach>
                </c:otherwise>
            </c:choose>
        </tbody>
    </table>
</div>
</body>
</html>
