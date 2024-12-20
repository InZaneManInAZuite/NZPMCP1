package com.nzpmcp2.demo.models;

import java.util.List;

import com.nzpmcp2.demo.config.UserRoles;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {


    // Fields
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private UserRoles role;
    private List<String> events;


    // Constructor
    public User(String id,
                String name,
                String email,
                String password,
                UserRoles role,
                List<String> events) {
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

    public String getPassword() {
        return password;
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
        List<String> newEvents = List.copyOf(events);

        // Create a new user object with the copied fields
        return new User(id, name, email, password, role, newEvents);
    }

    // Add an event to the user
    public void addEvent(String eventId) {
        if (events == null) {
            events = List.of(eventId);
        } else {
            events.add(eventId);
        }
    }

    // Remove an event from the user
    public void removeEvent(String eventId) {
        events.remove(eventId);
    }

    // Update the entire user based on another user
    public void update(User updateUser) {
        name = updateUser.getName() == null ? name : updateUser.getName();
        email = updateUser.getEmail() == null ? email : updateUser.getEmail();
        password = updateUser.getPassword() == null ? password : updateUser.getPassword();
        role = updateUser.getRole() == null ? role : updateUser.getRole();
        events = updateUser.getEvents() == null ? events : updateUser.getEvents();
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
}
