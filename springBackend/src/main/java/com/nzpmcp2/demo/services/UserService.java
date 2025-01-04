package com.nzpmcp2.demo.services;

import java.util.List;

import com.nzpmcp2.demo.config.UserRoles;
import com.nzpmcp2.demo.middlewares.AuthMiddleware;
import com.nzpmcp2.demo.models.UserDto;
import com.nzpmcp2.demo.models.UserView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepo,
                       UserMiddleware userMid,
                       AttendeeMiddleware attendeeMid,
                       AuthMiddleware authMid,
                       PasswordEncoder passwordEncoder) {

        this.userRepo = userRepo;
        this.userMid = userMid;
        this.attendeeMid = attendeeMid;
        this.authMid = authMid;
        this.passwordEncoder = passwordEncoder;
    }


    // Get all users
    public List<UserView> getAllUsers() {
        List<User> users = userRepo.findAll();
        return users.stream().map(User::toUserView).toList();
    }

    // Get user by id
    public UserView getUserById(String id) {
        try {
            return userMid.checkUserExists(id).toUserView();
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Create user
    public UserView createUser(User user) {
        try {
            if (user.getRole() != null) {
                user.setRole(user.getRole());
            } else {
                user.setRole(UserRoles.USER);
            }

            // Check user requirements
            userMid.checkUserFields(user);
            userMid.checkEmailInUse(user);

            // Create user
            userRepo.save(user);
            return user.toUserView();

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
    public UserView updateUser(String id, User updateUser) {
        try {
            // Check if user exists and email is not already in use
            User foundUser = userMid.checkUserExists(id);
            User userCopy = foundUser.copy();
            foundUser.update(updateUser);
            if (!foundUser.getEmail().equals(userCopy.getEmail())) {
                userMid.checkEmailInUse(foundUser);
            }

            // Encode password
            if (updateUser.getPassword() != null) {
                foundUser.setPassword(passwordEncoder.encode(updateUser.getPassword()));
            }

            // Update user
            userRepo.save(foundUser);
            return foundUser.toUserView();

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Authenticate a user
    public UserView authenticateUser(User user) {
        try {
            authMid.checkAuthFields(user);
            String email = user.getEmail();
            String password = user.getPassword();
            return authMid.isUserDetailCorrect(email, password);
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
