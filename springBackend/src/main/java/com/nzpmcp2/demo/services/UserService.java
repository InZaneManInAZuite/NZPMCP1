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
            // Check if email is already in use
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
    public User updateUser(String id, User updatedUser) {
        try {
            // Check if user exists and email is not already in use
            checkUserExists(id);
            checkEmailInUse(id);

            // Update user
            userRepository.save(updatedUser);
            return updatedUser;

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
}
