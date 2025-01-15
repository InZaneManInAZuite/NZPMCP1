package com.nzpmcp2.demo.models;

import java.util.Date;
import java.util.List;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter @Setter @Builder
@AllArgsConstructor
@ToString(exclude = {"attendees"})

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
    private Integer attemptLimit;
    private Boolean graded;
    private Boolean published;

    // Copy the event
    public Event copy() {
        List<String> attendeesCopy = List.copyOf(attendees);
        return new Event(id, name, date,
                description, attendeesCopy, competitionId,
                startTime, endTime, location,
                attemptLimit, graded, published);
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
        startTime = event.getStartTime() == null ? startTime : event.getStartTime();
        endTime = event.getEndTime() == null ? endTime : event.getEndTime();
        location = event.getLocation() == null ? location : event.getLocation();
        attemptLimit = event.getAttemptLimit() == null ? attemptLimit : event.getAttemptLimit();
        graded = event.getGraded() == null ? graded : event.getGraded();
        published = event.getPublished() == null ? published : event.getPublished();
    }
}
