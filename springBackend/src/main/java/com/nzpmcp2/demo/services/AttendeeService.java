package com.nzpmcp2.demo.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.middlewares.EventMiddleware;
import com.nzpmcp2.demo.middlewares.UserMiddleware;
import com.nzpmcp2.demo.models.Event;
import com.nzpmcp2.demo.models.User;
import com.nzpmcp2.demo.repositories.EventRepository;
import com.nzpmcp2.demo.repositories.UserRepository;

@Service
public class AttendeeService {

    @Autowired
    public EventRepository eventRepo;
    @Autowired
    public UserRepository userRepo;
    @Autowired
    public EventMiddleware eventMid;
    @Autowired
    public UserMiddleware userMid;
    
    // Add attendee to event
    public Event addAttendee(String eventId, String userId) {
        try {
            // Check if event and user exists
            Event event = eventMid.checkEventExists(eventId);
            User user = userMid.checkUserExists(userId);
            
            // Add attendee to event
            event.addAttendee(userId);
            user.addEvent(eventId);

            // Save changes
            eventRepo.save(event);
            userRepo.save(user);

            return event;
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Remove attendee from event
    public Event removeAttendee(String eventId, String userId) {
        try {
            // Check if event and user exists
            Event event = eventMid.checkEventExists(eventId);
            User user = userMid.checkUserExists(userId);
            
            // Remove attendee from event
            event.removeAttendee(userId);
            user.removeEvent(eventId);

            // Save changes
            eventRepo.save(event);
            userRepo.save(user);

            return event;
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Get all attendees of an event
    public List<User> getAttendees(String eventId) {
        try {
            // Check if event exists
            Event event = eventMid.checkEventExists(eventId);
            
            // Get all attendees
            List<String> attendeeIds = event.getAttendees();
            List<User> attendees = new ArrayList<User>();
            for (String id : attendeeIds) {
                try {
                    User attendee = userMid.checkUserExists(id);
                    attendees.add(attendee);
                } catch (IllegalStateException e) {
                    // Skip if user not found
                }
            }

            return attendees;
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Get all events of an attendee
    public List<Event> getEvents(String userId) {
        try {
            // Check if user exists
            User user = userMid.checkUserExists(userId);
            
            // Get all events
            List<String> eventIds = user.getEvents();
            List<Event> events = new ArrayList<Event>();
            for (String id : eventIds) {
                try {
                    Event event = eventMid.checkEventExists(id);
                    events.add(event);
                } catch (IllegalStateException e) {
                    // Skip if event not found
                }
            }

            return events;
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    } 
}
