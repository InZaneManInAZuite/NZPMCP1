package com.nzpmcp2.demo.middlewares;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.models.User;
import com.nzpmcp2.demo.repositories.UserRepository;

@Service
public class AuthMiddleware {
    
    @Autowired
    UserRepository userRepo;

    // Check if the user can log in
    public User isUserDetailCorrect(String email, String password) {

        // Get all the users
        List<User> users = userRepo.findAll();
        
        // Check if the user exists
        for (User user : users) {
            if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
                return user;
            }
        }

        throw new IllegalStateException("Email or password is incorrect");
    }

    // Check if the user gives email and password
    public void checkAuthFields(User user) {

        // Obtain the email and password from the user
        String email = user.getEmail();
        String password = user.getPassword();

        if (email == null || password == null) {
            throw new IllegalStateException("Email and password are required");
        }
    }
}
