package com.example.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.boot.autoconfigure.domain.EntityScan; // Import this

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.api", "com.example.service"})
@EnableJpaRepositories(basePackages = "com.example.service")
@EntityScan(basePackages = "com.example.common") // <-- ADD THIS LINE!
public class ApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }
}