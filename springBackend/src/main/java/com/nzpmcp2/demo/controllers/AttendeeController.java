package com.nzpmcp2.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nzpmcp2.demo.models.Event;
import com.nzpmcp2.demo.models.User;
import com.nzpmcp2.demo.services.AttendeeService;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class AttendeeController {

    @Autowired
    AttendeeService attendeeService;

    @PutMapping("/events/{eventId}/add/{userId}")
    public ResponseEntity<Event> addAttendee(@PathVariable String eventId, @PathVariable String userId) {
        try {
            Event event = attendeeService.addAttendee(eventId, userId);
            return ResponseEntity.ok(event);
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/events/{eventId}/remove/{userId}")
    public ResponseEntity<Event> removeAttendee(@PathVariable String eventId, @PathVariable String userId) {
        try {
            Event event = attendeeService.removeAttendee(eventId, userId);
            return ResponseEntity.ok(event);
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/events/{eventId}/attendees")
    public ResponseEntity<List<User>> getAttendees(@PathVariable String eventId) {
        try {
            List<User> users = attendeeService.getAttendees(eventId);
            return ResponseEntity.ok(users);
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/users/{userId}/events")
    public ResponseEntity<List<Event>> getEvents(@PathVariable String userId) {
        try {
            List<Event> events = attendeeService.getEvents(userId);
            return ResponseEntity.ok(events);
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
