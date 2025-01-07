package com.nzpmcp2.demo.services;

import com.nzpmcp2.demo.middlewares.AttemptMiddleware;
import com.nzpmcp2.demo.models.Attempt;
import com.nzpmcp2.demo.models.User;
import com.nzpmcp2.demo.repositories.AttemptRepository;
import com.nzpmcp2.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AttemptService {

    private final AttemptRepository attemptRepo;
    private final AttemptMiddleware attemptMid;
    private final UserRepository userRepository;

    @Autowired
    public AttemptService(AttemptRepository attemptRepo,
                          AttemptMiddleware attemptMid, UserRepository userRepository) {
        this.attemptRepo = attemptRepo;
        this.attemptMid = attemptMid;
        this.userRepository = userRepository;
    }

    // Get all attempts
    public List<Attempt> getAllAttempts() {
        return attemptRepo.findAll();
    }

    // Get all attempts by student id
    public List<Attempt> getAttemptsByStudent(String userId) {
        try {
            Optional<User> userOptional = userRepository.findById(userId);
            List<Attempt> attempts = attemptRepo.findAll();

            if (userOptional.isPresent()) {
                String email = userOptional.get().getEmail();

                return attempts.stream()
                        .filter(attempt -> attempt.getStudentEmail().equals(email))
                        .toList();
            } else {
                throw new IllegalStateException("User not found");
            }

        } catch (IllegalStateException e) {
            throw new IllegalArgumentException("Attempt not found");
        }
    }

    // Get all attempts by competition id
    public List<Attempt> getAttemptsByCompetition(String competitionId) {
        try {
            return attemptRepo.findAll().stream()
                    .filter(attempt -> attempt.getCompetitionId().equals(competitionId))
                    .toList();
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
    public Attempt updateAttempt(String attemptId, Attempt attemptUpdate) {
        try {
            Attempt attempt = attemptMid.checkAttemptExists(attemptId);
            attempt.update(attemptUpdate);

            attemptRepo.save(attempt);
            return attempt;
        } catch (IllegalStateException e) {
            throw new IllegalArgumentException("Attempt not found");
        }
    }
}
