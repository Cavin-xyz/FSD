package com.task8.service;

import com.task8.model.Employee;
import com.task8.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for Employee business logic.
 *
 * @Component   – registers this class as a Spring-managed bean.
 * @Autowired   – Spring injects the EmployeeRepository dependency
 *               automatically (Dependency Injection).
 *
 * Neither EmployeeService nor its callers create the repository manually;
 * the IoC container wires everything together.
 */
@Component("employeeService")
public class EmployeeService {

    /**
     * Dependency Injection via constructor (recommended best practice).
     * @Autowired on the constructor tells Spring to resolve and inject
     * the matching bean for EmployeeRepository.
     */
    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
        System.out.println("[DI]   EmployeeService created – EmployeeRepository injected by Spring.");
    }

    // ----------------------------------------------------------------
    // Business operations
    // ----------------------------------------------------------------

    /**
     * Add a new employee. Validates that id > 0 and name is not blank.
     */
    public void addEmployee(int id, String name, String department, double salary) {
        if (id <= 0 || name == null || name.isBlank()) {
            System.out.println("[SVC]  Invalid employee data – skipping.");
            return;
        }
        Employee emp = new Employee(id, name.trim(), department, salary);
        employeeRepository.save(emp);
    }

    /**
     * Retrieve a single employee by ID.
     */
    public Optional<Employee> getEmployee(int id) {
        return employeeRepository.findById(id);
    }

    /**
     * Retrieve all employees.
     */
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    /**
     * Give a raise to an employee (percentage-based).
     */
    public boolean giveRaise(int id, double percentIncrease) {
        Optional<Employee> opt = employeeRepository.findById(id);
        if (opt.isEmpty()) {
            System.out.println("[SVC]  Employee with id " + id + " not found.");
            return false;
        }
        Employee emp = opt.get();
        double newSalary = emp.getSalary() * (1 + percentIncrease / 100.0);
        emp.setSalary(newSalary);
        return employeeRepository.update(emp);
    }

    /**
     * Remove an employee by ID.
     */
    public boolean removeEmployee(int id) {
        return employeeRepository.deleteById(id);
    }

    /**
     * Total count of employees in memory.
     */
    public int getCount() {
        return employeeRepository.count();
    }
}
