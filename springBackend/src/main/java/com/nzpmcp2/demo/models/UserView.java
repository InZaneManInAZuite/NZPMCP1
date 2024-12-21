package com.nzpmcp2.demo.models;

import com.nzpmcp2.demo.config.UserRoles;
import org.springframework.data.annotation.Id;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

public class UserView {

    private String id;
    private String token;
    private String name;
    private String email;
    private UserRoles role;
    private List<String> events;

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
