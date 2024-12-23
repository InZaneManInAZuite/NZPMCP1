package com.nzpmcp2.demo.models;

import com.nzpmcp2.demo.config.UserRoles;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class UserView {

    private final String id;
    private final String name;
    private final String email;
    private final UserRoles role;
    private final List<String> events;
    private String token;

    public UserView(String id, String token, String name, String email, UserRoles role, List<String> events) {
        this.id = id;
        this.token = token;
        this.name = name;
        this.email = email;
        this.role = role;
        this.events = events;
    }

    public String getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public UserRoles getRole() {
        return role;
    }

    public List<String> getEvents() {
        return events;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role + '\''+
                ", events=" + events +
                '}';
    }
}
