package com.nzpmcp2.demo.models;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public class Event {
    

    // Fields
    @Id
    private String id;
    private String name;
    private Date date;
    private String description;
    private List<String> attendees;
    private String competitionId;
    private Date startTime;
    private Date endTime;
    private String location;



    // Constructors
    public Event(String id,
                 String name,
                 Date date,
                 String description,
                 List<String> attendees,
                 String competitionId,
                 Date startTime,
                 Date endTime,
                 String location) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.description = description;
        this.attendees = attendees;
        this.competitionId = competitionId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
    }


    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Date getDate() {
        return date;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getAttendees() {
        return attendees;
    }

    public String getCompetitionId() {
        return competitionId;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public String getLocation() {
        return location;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAttendees(List<String> attendees) {
        this.attendees = attendees;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public void setLocation(String location) {
        this.location = location;
    }



    // Methods

    // Copy the event
    public Event copy() {
        List<String> attendeesCopy = List.copyOf(attendees);
        return new Event(id, name, date, description, attendeesCopy, competitionId, startTime, endTime, location);
    }

    // Add an attendee to the event
    public void addAttendee(String attendee) {
        if (attendees == null) {
            attendees = List.of(attendee);
        } else if (!attendees.contains(attendee)) {
            attendees.add(attendee);
        }
    }

    // Remove an attendee from the event
    public void removeAttendee(String attendee) {
        attendees = attendees.stream().filter(user -> !user.equals(attendee)).toList();
    }

    // Update the event
    public void update(Event event) {
        name = event.getName() == null ? name : event.getName();
        date = event.getDate() == null ? date : event.getDate();
        description = event.getDescription() == null ? description : event.getDescription();
        attendees = event.getAttendees() == null ? attendees : event.getAttendees();
        competitionId = event.getCompetitionId() == null ? competitionId : event.getCompetitionId();
    }

    // Override the toString method
    @Override
    public String toString() {
        return "Event{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", date='" + date + '\'' +
                ", description='" + description + '\'' +
                ", attendees=" + attendees + '\'' +
                ", competitionId='" + competitionId + '\'' +
                ", startTime=" + startTime + '\'' +
                ", endTime=" + endTime + '\'' +
                ", location='" + location +
                '}';
    }
}
