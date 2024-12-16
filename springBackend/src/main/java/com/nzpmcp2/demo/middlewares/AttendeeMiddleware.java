package com.nzpmcp2.demo.middlewares;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.models.Event;
import com.nzpmcp2.demo.models.User;
import com.nzpmcp2.demo.repositories.EventRepository;
import com.nzpmcp2.demo.repositories.UserRepository;

@Service
public class AttendeeMiddleware {

    @Autowired
    public EventRepository eventRepo;
    @Autowired
    public UserRepository userRepo;
    @Autowired
    public EventMiddleware eventMid;
    @Autowired
    public UserMiddleware userMid;

    // Remove user from all joined events
    public void removeUserFromEvents(String userId) {
        try {
            // Check if user exists
            User user = userMid.checkUserExists(userId);
            List<String> eventIds = user.getEvents();

            // Remove user from all joined events
            for (String eventId : eventIds) {
                try {
                    Event event = eventMid.checkEventExists(eventId);
                    event.removeAttendee(userId);
                    eventRepo.save(event);
                } catch (Exception e) { continue; }
            }

        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Remove event from all joined users
    public void removeEventFromUsers(String eventId) {
        try {
            // Check if event exists
            Event event = eventMid.checkEventExists(eventId);
            List<String> userIds = event.getAttendees();

            // Remove event from all joined users
            for (String userId : userIds) {
                try {
                    User user = userMid.checkUserExists(userId);
                    user.removeEvent(eventId);
                    userRepo.save(user);
                } catch (Exception e) { continue; }
            }

        } catch (Exception e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
