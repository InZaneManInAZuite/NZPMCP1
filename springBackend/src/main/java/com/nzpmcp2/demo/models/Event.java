package com.nzpmcp2.demo.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public class Event {
    

    // Fields
    @Id
    private String id;
    private String name;
    private String date;
    private String description;
    private List<String> attendees = List.of();


    // Constructors
    public Event(String id, String name, String date, String description, List<String> attendees) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.description = description;
        this.attendees = attendees;
    }


    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getAttendees() {
        return attendees;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAttendees(List<String> attendees) {
        this.attendees = attendees;
    }



    // Methods

    // Copy the event
    public Event copy() {
        List<String> attendeesCopy = List.copyOf(attendees);
        return new Event(id, name, date, description, attendeesCopy);
    }

    // Add an attendee to the event
    public void addAttendee(String attendee) {
        if (attendees == null) {
            attendees = List.of(attendee);
        } else {
            attendees.add(attendee);
        }
    }

    // Remove an attendee from the event
    public void removeAttendee(String attendee) {
        attendees.remove(attendee);
    }

    // Update the event
    public void update(Event event) {
        name = event.getName() == null ? name : event.getName();
        date = event.getDate() == null ? date : event.getDate();
        description = event.getDescription() == null ? description : event.getDescription();
        attendees = event.getAttendees() == null ? attendees : event.getAttendees();
    }

    // Override the toString method
    @Override
    public String toString() {
        return "Event{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", date='" + date + '\'' +
                ", description='" + description + '\'' +
                ", attendees=" + attendees +
                '}';
    }
}
