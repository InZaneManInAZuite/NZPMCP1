package com.nzpmcp2.demo.middlewares;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.models.Event;
import com.nzpmcp2.demo.repositories.EventRepository;

@Service
public class EventMiddleware {

    private final EventRepository eventRepo;

    @Autowired
    public EventMiddleware(EventRepository eventRepo) {
        this.eventRepo = eventRepo;
    }

    // Check if event exists
    public Event checkEventExists(String id) {
        Optional<Event> event = eventRepo.findById(id);
        if (event.isPresent()) {
            return event.get();
        } else {
            throw new IllegalStateException("Event not found");
        }
    }

    // Check if event has missing fields
    public void checkEventFields(Event event) {

        // Obtain event fields
        String name = event.getName();
        String description = event.getDescription();
        String date = event.getDate();

        // Check if fields are empty
        if (name == null || description == null || date == null) {
            throw new IllegalStateException("Event has missing fields");
        }
    }

    // Check if event is duplicated
    public void checkEventDuplicated(Event event) {

        // Get all events
        List<Event> events = eventRepo.findAll();

        // Check if event is duplicated
        for (Event e : events) {
            if (e.getName().equals(event.getName()) && e.getDate().equals(event.getDate())) {
                throw new IllegalStateException("Event already exists");
            }
        }
    }
}
