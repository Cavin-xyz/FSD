package com.task8.repository;

import com.task8.model.Employee;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface defining CRUD operations for Employee.
 * This interface forms part of the IoC contract – concrete implementations
 * are registered as Spring beans and injected wherever needed.
 */
public interface EmployeeRepository {

    void save(Employee employee);

    Optional<Employee> findById(int id);

    List<Employee> findAll();

    boolean update(Employee employee);

    boolean deleteById(int id);

    int count();
}
