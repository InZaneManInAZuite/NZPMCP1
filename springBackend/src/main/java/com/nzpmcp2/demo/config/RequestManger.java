package com.nzpmcp2.demo.config;


import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

public class RequestManger {
    private final static String ADMIN = UserRoles.ADMIN.name();

    public static HttpSecurity manageRequests(HttpSecurity http) {
        try {
            return http
                    .authorizeHttpRequests(auth ->
                            auth
                                    /////////// Attendee APIs ///////////
                                    // Removing attendee or getting all attendee from an event needs to be by ADMIN
                                    .requestMatchers(HttpMethod.PUT, "/events/*/remove/*").hasRole(ADMIN)
                                    .requestMatchers(HttpMethod.GET, "/events/*/attendees").hasRole(ADMIN)
                                    // Adding event or getting all events attended by a user needs to be by the user, or
                                    // by an ADMIN
                                    .requestMatchers(HttpMethod.PUT, "/events/*/add/*").authenticated()
                                    .requestMatchers(HttpMethod.GET, "/users/*/events").authenticated()


                                    /////////// Users APIs ///////////
                                    // Creating users and authentication do not require authentication
                                    .requestMatchers(HttpMethod.POST, "/api/users").permitAll()
                                    .requestMatchers(HttpMethod.POST, "/api/users/auth").permitAll()
                                    // Viewing all users requires role to be ADMIN
                                    .requestMatchers(HttpMethod.GET, "/api/users").hasRole(ADMIN)
                                    // Updating or deleting is only allowed if it's the same user, or
                                    // it is an ADMIN
                                    .requestMatchers(HttpMethod.PUT, "/api/users/*").authenticated()
                                    .requestMatchers(HttpMethod.DELETE, "/api/users/*").authenticated()


                                    /////////// Events APIs ///////////
                                    // Obtaining any event is permitted for all
                                    .requestMatchers(HttpMethod.GET,  "/api/events").permitAll()
                                    .requestMatchers(HttpMethod.GET, "/api/events/*").permitAll()
                                    // Creating, updating, and deleting events require ADMIN
                                    .requestMatchers(HttpMethod.POST, "/api/events").hasRole(ADMIN)
                                    .requestMatchers(HttpMethod.PUT, "/api/events/*").hasRole(ADMIN)
                                    .requestMatchers(HttpMethod.DELETE, "/api/events/*").hasRole(ADMIN)


                                    /////////// Competitions APIs ///////////
                                    .requestMatchers(HttpMethod.GET, "/api/competitions/*").authenticated()
                                    .requestMatchers(HttpMethod.POST,"/api/competitions").hasRole(ADMIN)
                                    .requestMatchers(HttpMethod.DELETE,"/api/competitions/*").hasRole(ADMIN)
                                    .requestMatchers(HttpMethod.PUT,"/api/competitions").hasRole(ADMIN)


                                    /////////// Questions APIs ///////////
                                    .requestMatchers("/api/questions").hasRole(ADMIN)
                                    .requestMatchers("/api/questions/*").hasRole(ADMIN)


                                    /////////// Attempts APIs ///////////
                                    .requestMatchers("/api/attempts").authenticated()
                                    .requestMatchers("/api/attempts/*").authenticated()


                                    /////////// Builder APIs ///////////
                                    .requestMatchers(HttpMethod.PUT, "/api/builder/*").hasRole(ADMIN)



                                    /////////// Default ///////////
                                    .anyRequest().permitAll());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
