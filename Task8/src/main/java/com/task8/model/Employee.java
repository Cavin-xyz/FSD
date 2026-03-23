package com.task8.model;

/**
 * Employee model class representing an employee entity.
 * Plain POJO – managed by Spring IoC container as a prototype bean.
 */
public class Employee {

    private int id;
    private String name;
    private String department;
    private double salary;

    // ---- Constructors ----
    public Employee() {}

    public Employee(int id, String name, String department, double salary) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.salary = salary;
    }

    // ---- Getters & Setters ----
    public int getId()                    { return id; }
    public void setId(int id)             { this.id = id; }

    public String getName()               { return name; }
    public void setName(String name)      { this.name = name; }

    public String getDepartment()              { return department; }
    public void setDepartment(String department){ this.department = department; }

    public double getSalary()                  { return salary; }
    public void setSalary(double salary)       { this.salary = salary; }

    @Override
    public String toString() {
        return String.format("Employee { id=%-3d | name=%-20s | department=%-15s | salary=%.2f }",
                id, name, department, salary);
    }
}
