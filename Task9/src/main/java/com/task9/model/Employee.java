package com.task9.model;

/**
 * Employee model – plain POJO, no Spring annotations needed here.
 * Spring MVC will use this as a Model attribute to pass data to views.
 */
public class Employee {

    private int id;
    private String name;
    private String department;
    private String email;
    private double salary;

    public Employee() {}

    public Employee(int id, String name, String department, String email, double salary) {
        this.id         = id;
        this.name       = name;
        this.department = department;
        this.email      = email;
        this.salary     = salary;
    }

    // Getters & Setters
    public int    getId()                      { return id; }
    public void   setId(int id)                { this.id = id; }

    public String getName()                    { return name; }
    public void   setName(String name)         { this.name = name; }

    public String getDepartment()              { return department; }
    public void   setDepartment(String d)      { this.department = d; }

    public String getEmail()                   { return email; }
    public void   setEmail(String email)       { this.email = email; }

    public double getSalary()                  { return salary; }
    public void   setSalary(double salary)     { this.salary = salary; }
}
