package com.example.service;

import com.example.common.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when; // Importa 'when' de Mockito

// Usamos MockitoExtension para inicializar los mocks
@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock // Esto crea un mock del UserRepository
    private UserRepository userRepository;

    @InjectMocks // Esto inyecta el mock de UserRepository en UserService
    private UserService userService;

    private User user1;
    private User user2;

    @BeforeEach // Se ejecuta antes de cada prueba
    void setUp() {
        user1 = new User(1L, "Test User 1");
        user2 = new User(2L, "Test User 2");
    }

    @Test
    void shouldGetAllUsers() {
        // RED (Rojo) - Configura el mock para devolver datos cuando se llame a findAll()
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        // Act - Llama al método que estamos probando
        List<User> users = userService.getAllUsers();

        // Assert - Verifica que el resultado es el esperado
        assertNotNull(users);
        assertEquals(2, users.size());
        assertEquals("Test User 1", users.get(0).getName());
        assertEquals("Test User 2", users.get(1).getName());
    }

    @Test
    void shouldSaveUser() {
        // Arrange - Prepara un nuevo usuario y configura el mock
        User newUser = new User(null, "New User"); // ID null porque la DB lo genera
        User savedUser = new User(3L, "New User"); // Usuario como si fuera devuelto por la DB

        // RED (Rojo) - Configura el mock para devolver el usuario guardado cuando se llame a save()
        // Este 'save' es el que necesitamos que exista en UserRepository
        when(userRepository.save(newUser)).thenReturn(savedUser); // <--- Esto asume que save existe

        // Act - Llama al método que estamos probando
        User result = userService.saveUser(newUser);

        // Assert - Verifica que el usuario fue guardado y devuelto correctamente
        assertNotNull(result);
        assertEquals(3L, result.getId());
        assertEquals("New User", result.getName());
    }
}