package com.task9.controller;

import com.task9.model.Employee;
import com.task9.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

/**
 * EmployeeController – the Spring MVC Controller.
 *
 * Key annotations:
 *  @Controller      – specialisation of @Component; marks this as an MVC
 *                     controller and registers it as a Spring bean.
 *  @RequestMapping  – maps HTTP requests to handler methods.
 *  @Autowired       – Spring injects EmployeeService (DI).
 *  @GetMapping /
 *  @PostMapping     – shortcuts for @RequestMapping(method=...)
 *
 * MVC Flow:
 *  Browser → DispatcherServlet → HandlerMapping → EmployeeController
 *          → Model populated → ViewResolver → JSP rendered → Response
 */
@Controller
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    /** Constructor injection – best practice (no field-level @Autowired) */
    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // ----------------------------------------------------------------
    // HOME – redirect / to /employees
    // ----------------------------------------------------------------
    @GetMapping("/")
    public String root() {
        return "redirect:/employees";
    }

    // ----------------------------------------------------------------
    // LIST all employees  →  GET /employees
    // ----------------------------------------------------------------
    @GetMapping
    public String list(Model model) {
        model.addAttribute("employees", employeeService.getAll());
        model.addAttribute("pageTitle",  "All Employees");
        return "employees/list";   // resolves to /WEB-INF/views/employees/list.jsp
    }

    // ----------------------------------------------------------------
    // VIEW single employee  →  GET /employees/{id}
    // ----------------------------------------------------------------
    @GetMapping("/{id}")
    public String view(@PathVariable int id, Model model) {
        employeeService.getById(id).ifPresentOrElse(
            emp -> {
                model.addAttribute("employee", emp);
                model.addAttribute("pageTitle", "Employee Details – " + emp.getName());
            },
            () -> model.addAttribute("error", "Employee with ID " + id + " not found.")
        );
        return "employees/detail";  // resolves to /WEB-INF/views/employees/detail.jsp
    }

    // ----------------------------------------------------------------
    // SHOW add form  →  GET /employees/add
    // ----------------------------------------------------------------
    @GetMapping("/add")
    public String showAddForm(Model model) {
        model.addAttribute("employee", new Employee());
        model.addAttribute("pageTitle", "Add Employee");
        return "employees/form";
    }

    // ----------------------------------------------------------------
    // SUBMIT add form  →  POST /employees/add
    // ----------------------------------------------------------------
    @PostMapping("/add")
    public String addEmployee(@ModelAttribute Employee employee,
                              RedirectAttributes redirectAttrs) {
        employeeService.add(employee);
        redirectAttrs.addFlashAttribute("successMsg",
                "Employee '" + employee.getName() + "' added successfully!");
        return "redirect:/employees";
    }

    // ----------------------------------------------------------------
    // DELETE employee  →  GET /employees/delete/{id}
    // ----------------------------------------------------------------
    @GetMapping("/delete/{id}")
    public String delete(@PathVariable int id, RedirectAttributes redirectAttrs) {
        boolean deleted = employeeService.delete(id);
        redirectAttrs.addFlashAttribute("successMsg",
                deleted ? "Employee deleted." : "Employee not found.");
        return "redirect:/employees";
    }
}
