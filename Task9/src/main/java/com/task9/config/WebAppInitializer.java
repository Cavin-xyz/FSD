package com.task9.config;

import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRegistration;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

/**
 * Servlet 3.0+ initializer – replaces web.xml entirely.
 *
 * Spring detects this class automatically via the ServiceLoader mechanism
 * (SpringServletContainerInitializer implements ServletContainerInitializer).
 *
 * What this does (equivalent XML):
 *   <servlet>
 *     <servlet-name>dispatcher</servlet-name>
 *     <servlet-class>DispatcherServlet</servlet-class>
 *     <init-param>contextClass → AnnotationConfigWebApplicationContext</init-param>
 *     <load-on-startup>1</load-on-startup>
 *   </servlet>
 *   <servlet-mapping>
 *     <url-pattern>/</url-pattern>
 *   </servlet-mapping>
 */
public class WebAppInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

        // 1. Create the Spring Web Application Context backed by our Java config
        AnnotationConfigWebApplicationContext context =
                new AnnotationConfigWebApplicationContext();
        context.register(WebConfig.class);   // <-- points to our @Configuration class

        // 2. Create the DispatcherServlet – the Spring MVC front controller
        DispatcherServlet dispatcher = new DispatcherServlet(context);

        // 3. Register and map the DispatcherServlet with the servlet container
        ServletRegistration.Dynamic registration =
                servletContext.addServlet("dispatcher", dispatcher);
        registration.setLoadOnStartup(1);
        registration.addMapping("/");        // handles all requests
    }
}
