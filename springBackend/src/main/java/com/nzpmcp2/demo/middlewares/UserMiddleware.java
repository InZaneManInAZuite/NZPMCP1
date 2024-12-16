package com.nzpmcp2.demo.middlewares;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.models.User;
import com.nzpmcp2.demo.repositories.UserRepository;

@Service
public class UserMiddleware {
    
    @Autowired
    public UserRepository userRepository;

    // Check if user exists
    public User checkUserExists(String id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new IllegalStateException("User not found");
        }
    }

    // Check if user has missing fields
    public void checkUserFields(User user) {

        // Obtain user fields
        String email = user.getEmail();
        String password = user.getPassword();
        String name = user.getName();

        // Check if user has missing fields
        if (email == null || password == null || name == null) {
            throw new IllegalStateException("User has missing fields");
        }
    }

    // Check if email is already in use
    public void checkEmailInUse(User user) {

        // Obtain all users
        List<User> allUsers = userRepository.findAll();
        String email = user.getEmail();

        // Check if email is already in use
        for (User existingUser : allUsers) {
            if (existingUser.getEmail() == email) {
                throw new IllegalStateException("Email already in use");
            }
        }
    }
}
