package com.task9.service;

import com.task9.model.Employee;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * In-memory Employee service.
 *
 * @Service is a specialisation of @Component – tells Spring to register
 * this class as a bean and makes the intent (service layer) explicit.
 *
 * Data is stored in a LinkedHashMap so insertion order is preserved.
 */
@Service
public class EmployeeService {

    private final Map<Integer, Employee> store = new LinkedHashMap<>();
    private int nextId = 1;

    /** Seed some demo employees on startup */
    public EmployeeService() {
        store.put(nextId, new Employee(nextId++, "Alice Johnson",  "Engineering", "alice@company.com",  95000));
        store.put(nextId, new Employee(nextId++, "Bob Smith",      "Marketing",   "bob@company.com",    72000));
        store.put(nextId, new Employee(nextId++, "Carol Williams", "HR",          "carol@company.com",  68000));
        store.put(nextId, new Employee(nextId++, "David Brown",    "Engineering", "david@company.com",  88000));
        store.put(nextId, new Employee(nextId++, "Eva Martinez",   "Finance",     "eva@company.com",    81000));
    }

    public List<Employee> getAll() {
        return new ArrayList<>(store.values());
    }

    public Optional<Employee> getById(int id) {
        return Optional.ofNullable(store.get(id));
    }

    public Employee add(Employee e) {
        e.setId(nextId);
        store.put(nextId++, e);
        return e;
    }

    public boolean delete(int id) {
        return store.remove(id) != null;
    }
}
