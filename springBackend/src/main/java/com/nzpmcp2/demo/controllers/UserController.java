package com.nzpmcp2.demo.controllers;

// import java dependencies
import java.util.List;

// import api dependencies
import com.nzpmcp2.demo.models.UserDto;
import com.nzpmcp2.demo.models.UserView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import local dependencies
import com.nzpmcp2.demo.services.UserService;
import com.nzpmcp2.demo.models.User;



@CrossOrigin
@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<UserView>> getAllUsers() {
        List<UserView> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserView> getUserById(@PathVariable String id) {
        try {
            UserView user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<UserView> createUser(@RequestBody UserDto userDto) {
        try {
            UserView newUser = userService.createUser(userDto);
            return ResponseEntity.ok(newUser);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserView> updateUser(@PathVariable String id, @RequestBody User user) {
        try {
            UserView updatedUser = userService.updateUser(id, user);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalStateException e) {
            if (e.getMessage().equals("User not found")) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        }
    }

    @PostMapping("/auth")
    public ResponseEntity<UserView> authUser(@RequestBody User user) {
        try {
            UserView authUser = userService.authenticateUser(user);
            return ResponseEntity.ok(authUser);
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
