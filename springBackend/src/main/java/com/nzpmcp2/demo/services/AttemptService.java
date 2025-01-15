package com.nzpmcp2.demo.services;

import com.nzpmcp2.demo.middlewares.AttemptMiddleware;
import com.nzpmcp2.demo.middlewares.EventMiddleware;
import com.nzpmcp2.demo.middlewares.UserMiddleware;
import com.nzpmcp2.demo.models.Attempt;
import com.nzpmcp2.demo.models.Event;
import com.nzpmcp2.demo.repositories.AttemptRepository;
import com.nzpmcp2.demo.repositories.EventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor

@Service
public class AttemptService {

    private final AttemptRepository attemptRepo;
    private final AttemptMiddleware attemptMid;
    private final UserMiddleware userMiddleware;
    private final EventMiddleware eventMiddleware;
    private final EventRepository eventRepository;

    // Get all attempts
    public List<Attempt> getAllAttempts() {
        List<Attempt> attempts = attemptRepo.findAll();
        attempts.sort(Comparator.comparing(Attempt::getStartTime).reversed());
        return attempts;
    }

    // Get all attempts by student id
    public List<Attempt> getAttemptsByStudent(String userId) {
        try {
            userMiddleware.checkUserExists(userId);
            List<Attempt> attempts = attemptRepo.findByUserId(userId);
            attempts.sort(Comparator.comparing(Attempt::getStartTime).reversed());
            return attempts;
        } catch (IllegalStateException e) {
            throw new IllegalArgumentException("Attempt not found");
        }
    }

    // Get all attempts by competition id
    public List<Attempt> getAttemptsByCompetition(String competitionId) {
        try {
            attemptMid.checkAttemptExists(competitionId);
            List<Attempt> attempts = attemptRepo.findByCompetitionId(competitionId);
            attempts.sort(Comparator.comparing(Attempt::getStartTime).reversed());
            return attempts;
        } catch (IllegalStateException e) {
            throw new IllegalArgumentException("Attempt not found");
        }
    }

    public List<Attempt> getAttemptsByUserAndEvent(String userId, String eventId) {
        try {
            userMiddleware.checkUserExists(userId);
            eventMiddleware.checkEventExists(eventId);

            List<Attempt> attempts = attemptRepo.findByEventIdAndUserId(eventId, userId);
            attempts.sort(Comparator.comparing(Attempt::getStartTime).reversed());
            return attempts;
        } catch (IllegalStateException e) {
            throw new IllegalArgumentException("Attempt not found");
        }
    }

    // Get attempt by id
    public Attempt getAttemptById(String attemptId) {
        try {
            return attemptMid.checkAttemptExists(attemptId);
        } catch (IllegalStateException e) {
            throw new IllegalArgumentException("Attempt not found");
        }
    }

    // Create a new attempt
    public Attempt createAttempt(Attempt attempt) {
        try {
            attemptMid.checkAttemptFields(attempt);

            List<Attempt> attempts = attemptRepo.findByEventIdAndUserId(attempt.getEventId(), attempt.getUserId());

            Optional<Event> event = eventRepository.findById(attempt.getEventId());
            if (event.isPresent() && event.get().getAttemptLimit() <= attempts.size()) {
                throw new IllegalStateException("Attempt limit exceeded");
            }

            attemptRepo.save(attempt);
            return attempt;
        } catch (IllegalStateException e) {
            throw new IllegalArgumentException("Attempt failed to create");
        }
    }

    // Delete an attempt
    public void deleteAttempt(String attemptId) {
        try {
            attemptMid.checkAttemptExists(attemptId);
            attemptRepo.deleteById(attemptId);
        } catch (IllegalStateException e) {
            throw new IllegalArgumentException("Attempt not found");
        }
    }

    // Update an attempt
    public void updateAttempt(String attemptId, Attempt attemptUpdate) {
        try {
            Attempt attempt = attemptMid.checkAttemptExists(attemptId);

            if (attempt.getEndTime() != null) {
                throw new IllegalStateException("Attempt end time exceeded");
            }

            Optional<Event> eventOption = eventRepository.findById(attemptUpdate.getEventId());
            if (eventOption.isPresent()) {
                Date endTime = eventOption.get().getEndTime();
                if (endTime.before(new Date())) {
                    attempt.setEndTime(endTime);

                    attemptRepo.save(attempt);
                    return;
                }
            }

            attempt.update(attemptUpdate);

            attemptRepo.save(attempt);
        } catch (IllegalStateException e) {
            throw new IllegalArgumentException("Attempt not found");
        }
    }
}
