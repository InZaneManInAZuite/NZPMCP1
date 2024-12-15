package com.nzpmcp2.demo.models;

public class Event {
    


    // Fields
    private final String id;
    private String name;
    private String date;
    private String description;
    private String[] attendees;

    

    // Constructors

    public Event(String id, String name, String date, String description, String[] attendees) {
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

    public String[] getAttendees() {
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

    public void setAttendees(String[] attendees) {
        this.attendees = attendees;
    }



    // Methods

    // Copy the event
    public Event copy() {

        // Copy the attendees array
        String[] newAttendees = new String[attendees.length];
        for (int i = 0; i < attendees.length; i++) {
            newAttendees[i] = attendees[i];
        }

        // Return the new event
        return new Event(id, name, date, description, newAttendees);
    }

    // Add an attendee to the event
    public void addAttendee(String attendee) {

        // Create a new array with one more element than the current attendees array
        String[] newAttendees = new String[attendees.length + 1];

        // Copy the current attendees array into the new array
        for (int i = 0; i < attendees.length; i++) {
            newAttendees[i] = attendees[i];
        }

        // Add the new attendee to the end of the new array
        newAttendees[attendees.length] = attendee;

        // Set the new array as the attendees array
        attendees = newAttendees;
    }

    // Remove an attendee from the event
    public void removeAttendee(String attendee) {

        // Create a new array with one less element than the current attendees array
        String[] newAttendees = new String[attendees.length - 1];

        // Copy the current attendees array into the new array, skipping the removed attendee
        int j = 0;
        for (int i = 0; i < attendees.length; i++) {
            if (attendees[i] != attendee) {
                newAttendees[j] = attendees[i];
                j++;
            }
        }

        // Set the new array as the attendees array
        attendees = newAttendees;
    }
}
