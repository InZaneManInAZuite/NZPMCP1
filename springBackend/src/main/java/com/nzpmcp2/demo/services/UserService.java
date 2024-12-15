package com.nzpmcp2.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.models.User;
import com.nzpmcp2.demo.repositories.UserRepository;

@Service
public class UserService {
    
    @Autowired
    public UserRepository userRepository;


    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by id
    public User getUserById(String id) {
        try {
            return checkUserExists(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Create user
    public User createUser(User user) {
        try {
            // Check user requirements
            checkUserFields(user);
            checkEmailInUse(user.getEmail());

            // Create user
            userRepository.save(user);
            return user;

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Delete a user
    public void deleteUser(String id) {
        try {
            // Check if user exists
            checkUserExists(id);

            // Delete user
            userRepository.deleteById(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Update a user
    public User updateUser(String id, User updateUser) {
        try {
            // Check if user exists and email is not already in use
            User existingUser = checkUserExists(id);
            checkEmailInUse(id);

            // Update existing user
            existingUser.update(updateUser);

            // Update user
            userRepository.save(existingUser);
            return existingUser;

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }




    // Helper methods

    // Check if email is already in use
    public void checkEmailInUse(String email) {

        // Obtain all users
        List<User> allUsers = userRepository.findAll();

        // Check if email is already in use
        for (User existingUser : allUsers) {
            if (existingUser.getEmail() == email) {
                throw new IllegalStateException("Email already in use");
            }
        }
    }

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
}
