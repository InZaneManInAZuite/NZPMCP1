package com.nzpmcp2.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.middlewares.AttendeeMiddleware;
import com.nzpmcp2.demo.middlewares.EventMiddleware;
import com.nzpmcp2.demo.models.Event;
import com.nzpmcp2.demo.repositories.EventRepository;

@Service
public class EventService {

    @Autowired
    public EventRepository eventRepo;
    @Autowired
    public EventMiddleware eventMid;
    @Autowired
    public AttendeeMiddleware attendeeMid;


    // Get all events
    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    // Get event by id
    public Event getEventById(String id) {
        try {
            return eventMid.checkEventExists(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Create event
    public Event createEvent(Event event) {
        try {
            // Check event requirements
            eventMid.checkEventFields(event);
            eventMid.checkEventDuplicated(event);

            // Create event
            eventRepo.save(event);
            return event;

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Delete an event
    public void deleteEvent(String id) {
        try {
            // Check if event exists
            eventMid.checkEventExists(id);

            // Remove event from all joined users
            attendeeMid.removeEventFromUsers(id);

            // Delete event
            eventRepo.deleteById(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Update an event
    public Event updateEvent(String id, Event updateEvent) {
        try {
            // Check if event exists and is not duplicated
            Event existingEvent = eventMid.checkEventExists(id);
            existingEvent.update(updateEvent);
            eventMid.checkEventDuplicated(existingEvent);

            // Update event
            eventRepo.save(existingEvent);
            return existingEvent;

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
