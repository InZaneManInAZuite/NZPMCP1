package com.nzpmcp2.demo.services;

import java.util.List;

import com.nzpmcp2.demo.config.UserRoles;
import com.nzpmcp2.demo.middlewares.AuthMiddleware;
import com.nzpmcp2.demo.models.UserDto;
import com.nzpmcp2.demo.models.UserView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepo,
                       UserMiddleware userMid,
                       AttendeeMiddleware attendeeMid,
                       AuthMiddleware authMid,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager) {

        this.userRepo = userRepo;
        this.userMid = userMid;
        this.attendeeMid = attendeeMid;
        this.authMid = authMid;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
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
                    .addPassword(passwordEncoder.encode(userDto.password()))
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
    public UserView authenticateUser(UserDto userDto) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDto.email(), userDto.password())
            );
            UserView userView = ((User) auth.getPrincipal()).toUserView();
            String token = "";
            userView.setToken(token);

            return userView;

        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
