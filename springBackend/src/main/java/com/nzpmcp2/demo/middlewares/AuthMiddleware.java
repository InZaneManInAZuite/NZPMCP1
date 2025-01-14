package com.nzpmcp2.demo.middlewares;

import com.nzpmcp2.demo.models.UserView;
import com.nzpmcp2.demo.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.models.User;

@Service
public class AuthMiddleware {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @Autowired
    public AuthMiddleware(AuthenticationManager authenticationManager,
                          TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    // Check if the user can log in
    public UserView isUserDetailCorrect(String email, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );


            User user = (User) auth.getPrincipal();
            String token = tokenService.generateToken(user, false);


            UserView userView = user.toUserView();
            userView.setToken(token);
            return userView;
        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
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
