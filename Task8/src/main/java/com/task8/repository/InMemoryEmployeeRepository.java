package com.task8.repository;

import com.task8.model.Employee;
import org.springframework.stereotype.Component;

import java.util.*;

/**
 * In-memory implementation of {@link EmployeeRepository}.
 *
 * Annotated with @Component so Spring's component scan picks it up
 * and registers it as a singleton bean in the ApplicationContext.
 *
 * Demonstrates: Inversion of Control (IoC) – Spring manages this object's
 * lifecycle; the caller never calls `new InMemoryEmployeeRepository()`.
 */
@Component("employeeRepository")
public class InMemoryEmployeeRepository implements EmployeeRepository {

    /** In-memory store: employeeId → Employee */
    private final Map<Integer, Employee> store = new LinkedHashMap<>();

    // ----------------------------------------------------------------
    // Constructor – Spring invokes this via IoC
    // ----------------------------------------------------------------
    public InMemoryEmployeeRepository() {
        System.out.println("[IoC]  InMemoryEmployeeRepository bean created by Spring BeanFactory.");
    }

    // ----------------------------------------------------------------
    // CRUD Operations
    // ----------------------------------------------------------------

    @Override
    public void save(Employee employee) {
        if (store.containsKey(employee.getId())) {
            System.out.println("[REPO] Employee with id " + employee.getId() + " already exists. Use update().");
            return;
        }
        store.put(employee.getId(), employee);
        System.out.println("[REPO] Saved   → " + employee);
    }

    @Override
    public Optional<Employee> findById(int id) {
        return Optional.ofNullable(store.get(id));
    }

    @Override
    public List<Employee> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public boolean update(Employee employee) {
        if (!store.containsKey(employee.getId())) {
            return false;
        }
        store.put(employee.getId(), employee);
        System.out.println("[REPO] Updated → " + employee);
        return true;
    }

    @Override
    public boolean deleteById(int id) {
        Employee removed = store.remove(id);
        if (removed != null) {
            System.out.println("[REPO] Deleted → " + removed);
        }
        return removed != null;
    }

    @Override
    public int count() {
        return store.size();
    }
}
