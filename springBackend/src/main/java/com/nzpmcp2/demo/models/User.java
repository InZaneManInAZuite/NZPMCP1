package com.nzpmcp2.demo.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import com.nzpmcp2.demo.config.UserRoles;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Document(collection = "users")
public class User implements UserDetails {

    // Fields
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private UserRoles role;
    private List<String> events;

    public User(String id, String name, String email, String password, UserRoles role, List<String> events) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.events = events;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return role.getGrantedAuthorities();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public UserRoles getRole() {
        return role;
    }

    public List<String> getEvents() {
        return events;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(UserRoles role) {
        this.role = role;
    }

    public void setEvents(List<String> events) {
        this.events = events;
    }


    // Methods

    // Copy the user object
    public User copy() {

        // Copy the events list
        if (events == null) {
            return new User(id, name, email, password, role, events);
        } else {
            List<String> eventsCopy = List.copyOf(events);
            return new User(id, name, email, password, role, eventsCopy);
        }

    }

    // Add an event to the user
    public void addEvent(String eventId) {
        if (events == null) {
            events = List.of(eventId);
        } else if (!events.contains(eventId)) {
            events.add(eventId);
        }
    }

    // Remove an event from the user
    public void removeEvent(String eventId) {
        events = events.stream().filter(e -> !e.equals(eventId)).toList();
    }

    // Update the entire user based on another user
    public void update(User updateUser) {
        name = updateUser.getName() == null ? name : updateUser.getName();
        email = updateUser.getEmail() == null ? email : updateUser.getEmail();
        password = updateUser.getPassword() == null ? password : updateUser.getPassword();
        role = updateUser.getRole() == null ? role : updateUser.getRole();
        events = updateUser.getEvents() == null ? events : updateUser.getEvents();
    }

    public UserView toUserView() {
        return new UserView(id, null, name, email, role, events);
    }

    // Override the toString method
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role + '\''+
                ", events=" + events +
                '}';
    }

    public static class Builder {

        private String id;
        private String name;
        private String email;
        private String password;
        private UserRoles role;
        private List<String> events;

        public Builder addId(String id) {
            this.id = id;
            return this;
        }

        public Builder addName(String name) {
            this.name = name;
            return this;
        }

        public Builder addEmail(String email) {
            this.email = email;
            return this;
        }

        public Builder addPassword(String password) {
            this.password = password;
            return this;
        }

        public Builder addRole(UserRoles role) {
            this.role = role;
            return this;
        }

        public Builder addEvents(List<String> events) {
            this.events = events;
            return this;
        }

        public User build() {
            return new User(id, name, email, password, role, events);
        }
    }
}
