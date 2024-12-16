package com.nzpmcp2.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.models.Event;
import com.nzpmcp2.demo.repositories.EventRepository;

@Service
public class EventService {

    @Autowired
    public EventRepository eventRepository;


    // Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Get event by id
    public Event getEventById(String id) {
        try {
            return checkEventExists(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Create event
    public Event createEvent(Event event) {
        try {
            // Check event requirements
            checkEventFields(event);
            checkEventDuplicated(event);

            // Create event
            eventRepository.save(event);
            return event;

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Delete an event
    public void deleteEvent(String id) {
        try {
            // Check if event exists
            checkEventExists(id);

            // Delete event
            eventRepository.deleteById(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Update an event
    public Event updateEvent(String id, Event updateEvent) {
        try {
            // Check if event exists and is not duplicated
            Event existingEvent = checkEventExists(id);
            existingEvent.update(updateEvent);
            checkEventDuplicated(existingEvent);

            // Update event
            eventRepository.save(existingEvent);
            return existingEvent;

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }




    // Helper methods

    // Check if event is duplicated
    private void checkEventDuplicated(Event event) {

        // Get all events
        List<Event> events = eventRepository.findAll();

        // Check if event is duplicated
        for (Event e : events) {
            if (e.getName() == event.getName() && e.getDate() == event.getDate()) {
                throw new IllegalStateException("Event already exists");
            }
        }
    }

    // Check if event exists
    private Event checkEventExists(String id) {
        Optional<Event> event = eventRepository.findById(id);
        if (event.isPresent()) {
            return event.get();
        } else {
            throw new IllegalStateException("Event not found");
        }
    }

    // Check if event has missing fields
    private void checkEventFields(Event event) {

        // Obtain event fields
        String name = event.getName();
        String description = event.getDescription();
        String date = event.getDate();

        // Check if fields are empty
        if (name == null || description == null || date == null) {
            throw new IllegalStateException("Event has missing fields");
        }
    }
}
