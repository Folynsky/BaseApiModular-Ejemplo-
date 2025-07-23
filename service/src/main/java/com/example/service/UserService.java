package com.example.service;

import com.example.common.User;
import org.springframework.stereotype.Service; // <-- Make sure this is here!

import java.util.Arrays;
import java.util.List;

@Service // <-- And this one!
public class UserService {
    public List<User> getAllUsers() {
        return Arrays.asList(
                new User(1L, "Kevin"),
                new User(2L, "María")
        );
    }
}