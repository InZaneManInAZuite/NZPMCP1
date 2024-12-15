package com.nzpmcp2.demo.models;

public class User {


    
    // Fields
    private final String id;
    private String name;
    private String email;
    private String password;
    private String[] events;



    // Constructors
    public User(String id, String name, String email, String password, String[] events) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.events = events;
    }

    public User(String id) {
        this.id = id;
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

    public String[] getEvents() {
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

    public void setEvents(String[] events) {
        this.events = events;
    }



    // Methods

    // Copy the user object
    public User copy() {

        // Copy the events array
        String newEvents[] = new String[events.length];
        for (int i = 0; i < events.length; i++) {
            newEvents[i] = events[i];
        }

        // Return a new User object with the copied events array
        return new User(id, name, email, password, newEvents);
    }

    // Add an event to the user
    public void addEvent(String eventId) {

        // Create a new array with the new event added
        String[] newEvents = new String[events.length + 1];

        // Copy the events array to the new array
        for (int i = 0; i < events.length; i++) {
            newEvents[i] = events[i];
        }

        // Add the new event to the new array
        newEvents[events.length] = eventId;

        // Set the events array to the new array
        events = newEvents;
    }


    // Remove an event from the user
    public void removeEvent(String eventId) {

        // Create a new array with one less element than the current events array
        String[] newEvents = new String[events.length - 1];

        // Copy the current events array to the new array, skipping the removed event
        int j = 0;
        for (int i = 0; i < events.length; i++) {
            if (events[i] != eventId) {
                newEvents[j] = events[i];
                j++;
            }
        }

        // Set the events array to the new array
        events = newEvents;
    }
}
