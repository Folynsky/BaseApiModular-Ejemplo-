// service/src/main/java/com/example/service/UserRepository.java
package com.example.service;

import com.example.common.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Métodos personalizados si los necesitas, ej:
    // Optional<User> findByName(String name);
}