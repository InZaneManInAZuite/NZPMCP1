package com.nzpmcp2.demo.controllers;

// import java dependencies
import java.util.List;
import java.util.Optional;

// import api dependencies
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;
import com.nzpmcp2.demo.config.JwtConfig;
import com.nzpmcp2.demo.models.UserView;
import com.nzpmcp2.demo.repositories.UserRepository;
import com.nzpmcp2.demo.services.TokenService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import local dependencies
import com.nzpmcp2.demo.services.UserService;
import com.nzpmcp2.demo.models.User;

import javax.crypto.SecretKey;

@AllArgsConstructor

@CrossOrigin("${frontend.url}")
@RestController
@RequestMapping("api/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtConfig jwtConfig;
    private final TokenService tokenService;

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
    public ResponseEntity<UserView> createUser(@RequestBody User user) {
        try {
            UserView newUser = userService.createUser(user);
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

    @CrossOrigin(allowCredentials = "true",
            allowedHeaders = "*"
    )
    @PostMapping("/auth")
    public ResponseEntity<UserView> authUser(@RequestBody User user) {
        try {
            UserView authUser = userService.authenticateUser(user);
            Optional<User> foundUser = userRepository.findByEmail(user.getEmail());
            if (foundUser.isPresent()) {

                String refreshToken = tokenService.generateToken(foundUser.get(), true);
                HttpHeaders headers = new HttpHeaders();
                headers.add("Set-Cookie", "refresh_token=" + refreshToken +
                        "; HttpOnly; Path=/; SameSite=None; Max-Age=36000");


                return ResponseEntity.status(HttpStatus.OK).headers(headers).body(authUser);
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<String> refreshToken(@CookieValue("refresh_token") String refreshToken) {
        try {
            if (refreshToken == null || refreshToken.isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            SecretKey key = jwtConfig.getSecretKey();
            JWSVerifier verifier = new MACVerifier(key);
            SignedJWT signedJWT = SignedJWT.parse(refreshToken);

            if (signedJWT.verify(verifier)) {
                Optional<User> user = userRepository.findById(refreshToken);
                if (user.isPresent()) {
                    String accessToken = tokenService.generateToken(user.get(), false);

                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Access-Control-Allow-Credentials", "true");

                    return ResponseEntity.status(HttpStatus.OK).headers(headers).body(accessToken);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } else {
                return ResponseEntity.badRequest().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
