package com.task8.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * Spring Java-based configuration class.
 *
 * @Configuration  – marks this as a source of bean definitions.
 * @ComponentScan  – instructs Spring to scan the "com.task8" package
 *                  and register all classes annotated with @Component
 *                  (and its specialisations @Service, @Repository, etc.)
 *                  as beans in the ApplicationContext / BeanFactory.
 *
 * This replaces the traditional applicationContext.xml XML config file.
 */
@Configuration
@ComponentScan(basePackages = "com.task8")
public class AppConfig {
    /*
     * No explicit @Bean methods needed here because we rely entirely on
     * annotation-driven component scanning.  Spring's BeanFactory will
     * discover InMemoryEmployeeRepository and EmployeeService automatically.
     */
}
