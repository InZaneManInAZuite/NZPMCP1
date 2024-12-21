package com.nzpmcp2.demo.services;

import java.util.List;
import java.util.Optional;

import com.nzpmcp2.demo.config.UserRoles;
import com.nzpmcp2.demo.middlewares.AuthMiddleware;
import com.nzpmcp2.demo.models.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.middlewares.AttendeeMiddleware;
import com.nzpmcp2.demo.middlewares.UserMiddleware;
import com.nzpmcp2.demo.models.User;
import com.nzpmcp2.demo.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final UserMiddleware userMid;
    private final AttendeeMiddleware attendeeMid;
    private final AuthMiddleware authMid;

    @Autowired
    public UserService(UserRepository userRepo,
                       UserMiddleware userMid,
                       AttendeeMiddleware attendeeMid,
                       AuthMiddleware authMid) {

        this.userRepo = userRepo;
        this.userMid = userMid;
        this.attendeeMid = attendeeMid;
        this.authMid = authMid;
    }


    // Get all users
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    // Get user by id
    public User getUserById(String id) {
        try {
            return userMid.checkUserExists(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Create user
    public User createUser(UserDto userDto) {
        try {

            // Build a new user with user builder
            User user = new User.Builder()
                    .addName(userDto.name())
                    .addEmail(userDto.email())
                    .addPassword(userDto.password())
                    .addRole(UserRoles.USER)
                    .build();

            // Check user requirements
            userMid.checkUserFields(user);
            userMid.checkEmailInUse(user);

            // Create user
            userRepo.save(user);
            return user;

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Delete a user
    public void deleteUser(String id) {
        try {
            // Check if user exists
            userMid.checkUserExists(id);

            // Remove user from all joined events
            attendeeMid.removeUserFromEvents(id);

            // Delete user
            userRepo.deleteById(id);

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Update a user
    public User updateUser(String id, User updateUser) {
        try {
            // Check if user exists and email is not already in use
            User existingUser = userMid.checkUserExists(id);
            existingUser.update(updateUser);
            userMid.checkEmailInUse(existingUser);

            // Update user
            userRepo.save(existingUser);
            return existingUser;

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Authenticate a user
    public User authenticateUser(User user) {
        try {
            authMid.checkAuthFields(user);

            String email = user.getEmail();

            return userMid.checkUserExists(email);
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
