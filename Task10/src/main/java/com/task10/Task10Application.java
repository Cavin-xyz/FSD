package com.task10;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the Spring Boot Student CRUD Application.
 */
@SpringBootApplication
public class Task10Application {

    public static void main(String[] args) {
        SpringApplication.run(Task10Application.class, args);
        System.out.println("==================================================");
        System.out.println(" Task 10: Spring Boot Student CRUD App Started!   ");
        System.out.println(" H2 Console : http://localhost:8080/h2-console    ");
        System.out.println(" REST API   : http://localhost:8080/api/students  ");
        System.out.println("==================================================");
    }
}
