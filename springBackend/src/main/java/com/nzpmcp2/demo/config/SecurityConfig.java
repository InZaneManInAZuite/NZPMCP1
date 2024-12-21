package com.nzpmcp2.demo.config;

import com.nzpmcp2.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtConfig jwtConfig;
    private final UserRepository userRepo;

    @Autowired
    public SecurityConfig(JwtConfig jwtConfig,
                          UserRepository userRepo) {
        this.jwtConfig = jwtConfig;
        this.userRepo = userRepo;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth ->

                        auth.requestMatchers(HttpMethod.POST, "/api/users").permitAll()
                                .anyRequest().authenticated())
                .oauth2ResourceServer(oath2ResourceServer ->
                        oath2ResourceServer.jwt(Customizer.withDefaults()))
                .build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(jwtConfig.getSecretKey()).build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setPasswordEncoder(passwordEncoder());
        authProvider.setUserDetailsService(userDetailsService());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authManager(AuthenticationProvider authenticationProvider) {
        return new ProviderManager(authenticationProvider);
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepo.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User " + username + " not found"));
    }
}
