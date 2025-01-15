package com.nzpmcp2.demo.models;

import java.util.Collection;
import java.util.List;

import com.nzpmcp2.demo.config.UserRoles;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Builder
@ToString(exclude = {"events"})

@Document(collection = "users")
public class User implements UserDetails {

    // Getters and Setters
    // Fields
    @Getter @Id private String id;
    @Setter @Getter private String name;
    @Setter @Getter private String email;
    @Setter private String password;
    @Setter @Getter private UserRoles role;
    @Setter @Getter private List<String> events;

    public User(String id, String name, String email, String password, UserRoles role, List<String> events) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.events = events;
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


    // Methods

    // Copy the user object
    public User copy() {

        // Copy the events list
        if (events == null) {
            return new User(id, name, email, password, role, null);
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
        return new UserView(id, name, email, role, events, null);
    }
}
