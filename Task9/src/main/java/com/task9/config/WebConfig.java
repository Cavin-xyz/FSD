package com.task9.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

/**
 * Spring MVC Java-based configuration – replaces dispatcher-servlet.xml.
 *
 * @Configuration  – marks this as a Spring config class.
 * @EnableWebMvc   – enables Spring MVC's annotation-driven feature set
 *                   (replaces <mvc:annotation-driven/> in XML).
 * @ComponentScan  – scans 'com.task9' for @Controller, @Service, etc.
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.task9")
public class WebConfig implements WebMvcConfigurer {

    /**
     * InternalResourceViewResolver – maps logical view names returned by
     * controllers to physical JSP files under /WEB-INF/views/.
     *
     * Example: returning "home" from a controller resolves to
     *          /WEB-INF/views/home.jsp
     */
    @Bean
    public ViewResolver viewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setViewClass(JstlView.class);
        resolver.setPrefix("/WEB-INF/views/");
        resolver.setSuffix(".jsp");
        return resolver;
    }

    /** Serve static resources (CSS, JS, images) from /resources/ */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/resources/");
    }
}
