package com.nzpmcp2.demo.services;

import java.util.Comparator;
import java.util.List;

import com.nzpmcp2.demo.middlewares.AttendeeMiddleware;
import com.nzpmcp2.demo.repositories.AttemptRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.middlewares.EventMiddleware;
import com.nzpmcp2.demo.models.Event;
import com.nzpmcp2.demo.repositories.EventRepository;

@AllArgsConstructor

@Service
public class EventService {

    private final EventRepository eventRepo;
    private final EventMiddleware eventMid;
    private final AttendeeMiddleware attendeeMid;
    private final AttemptRepository attemptRepo;


    // Get all events
    public List<Event> getAllEvents() {
        List<Event> events = eventRepo.findAll();
        events.sort(Comparator.comparing(Event::getDate));
        return events;
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


            // Remove all events from users
            attendeeMid.removeEventFromUsers(id);
            attemptRepo.deleteAllByEventId(id);

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
