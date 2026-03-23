package com.task8;

import com.task8.config.AppConfig;
import com.task8.model.Employee;
import com.task8.service.EmployeeService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;
import java.util.Optional;

/**
 * Entry point for the Employee Management application.
 *
 * Demonstrates:
 *  1. IoC  – Spring ApplicationContext (backed by a BeanFactory) creates
 *            and manages beans; we never use `new` for service/repo.
 *  2. DI   – EmployeeRepository is injected into EmployeeService by Spring.
 *  3. CRUD – add, view, update salary, delete employees stored in memory.
 */
public class MainApp {

    public static void main(String[] args) {

        // ----------------------------------------------------------------
        // 1. Bootstrap the Spring IoC Container
        //    AnnotationConfigApplicationContext uses an internal BeanFactory
        //    to discover, instantiate, and wire all @Component beans.
        // ----------------------------------------------------------------
        System.out.println("=".repeat(65));
        System.out.println("  TASK 8 – Employee Management (Spring Core IoC & DI Demo)");
        System.out.println("=".repeat(65));
        System.out.println("\n[BOOT] Starting Spring ApplicationContext...\n");

        ApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        System.out.println("\n[BOOT] Spring IoC container ready.\n");

        // ----------------------------------------------------------------
        // 2. Retrieve the EmployeeService bean from the BeanFactory
        //    (no 'new EmployeeService()' anywhere in this file)
        // ----------------------------------------------------------------
        EmployeeService service = context.getBean("employeeService", EmployeeService.class);

        // ----------------------------------------------------------------
        // 3. Demonstrate CRUD operations
        // ----------------------------------------------------------------

        separator("Adding Employees");

        service.addEmployee(1, "Alice ",  "Engineering",  95000);
        service.addEmployee(2, "Bob ",       "Marketing",    72000);
        service.addEmployee(3, "Carol ",  "HR",           68000);
        service.addEmployee(4, "David ",     "Engineering",  88000);
        service.addEmployee(5, "Eva ",    "Finance",      81000);

        // ----------------------------------------------------------------
        // 4. Display all employees
        // ----------------------------------------------------------------
        separator("All Employees (" + service.getCount() + " records)");
        printAll(service.getAllEmployees());

        // ----------------------------------------------------------------
        // 5. Find a specific employee
        // ----------------------------------------------------------------
        separator("Find Employee by ID = 3");
        Optional<Employee> found = service.getEmployee(3);
        found.ifPresentOrElse(
                e -> System.out.println("Found  → " + e),
                ()  -> System.out.println("Employee not found.")
        );

        // ----------------------------------------------------------------
        // 6. Give a raise
        // ----------------------------------------------------------------
        separator("Give 10% Raise to Employee ID = 1");
        boolean raised = service.giveRaise(1, 10);
        System.out.println("Raise applied: " + raised);
        service.getEmployee(1).ifPresent(e -> System.out.println("Updated → " + e));

        // ----------------------------------------------------------------
        // 7. Remove an employee
        // ----------------------------------------------------------------
        separator("Remove Employee ID = 2");
        boolean deleted = service.removeEmployee(2);
        System.out.println("Deleted: " + deleted);

        // ----------------------------------------------------------------
        // 8. Print final roster
        // ----------------------------------------------------------------
        separator("Final Employee Roster (" + service.getCount() + " records)");
        printAll(service.getAllEmployees());

        // ----------------------------------------------------------------
        // 9. Demonstrate BeanFactory bean identity (singleton scope)
        // ----------------------------------------------------------------
        separator("Bean Scope Verification (Singleton)");
        EmployeeService svc1 = context.getBean("employeeService", EmployeeService.class);
        EmployeeService svc2 = context.getBean("employeeService", EmployeeService.class);
        System.out.println("svc1 == svc2 (same singleton) : " + (svc1 == svc2));

        // ----------------------------------------------------------------
        // 10. Close the context (triggers bean destruction lifecycle)
        // ----------------------------------------------------------------
        ((AnnotationConfigApplicationContext) context).close();
        System.out.println("\n[BOOT] Spring ApplicationContext closed. Goodbye!\n");
    }

    // ----------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------
    private static void printAll(List<Employee> employees) {
        if (employees.isEmpty()) {
            System.out.println("  (no employees)");
        } else {
            employees.forEach(e -> System.out.println("  " + e));
        }
    }

    private static void separator(String title) {
        System.out.println("\n" + "-".repeat(65));
        System.out.println("  " + title);
        System.out.println("-".repeat(65));
    }
}
