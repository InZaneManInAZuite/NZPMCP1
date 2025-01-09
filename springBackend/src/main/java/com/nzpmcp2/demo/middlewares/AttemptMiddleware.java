package com.nzpmcp2.demo.middlewares;

import com.nzpmcp2.demo.models.Attempt;
import com.nzpmcp2.demo.repositories.AttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class AttemptMiddleware {

    private final AttemptRepository attemptRepo;

    @Autowired
    public AttemptMiddleware(AttemptRepository attemptRepo) {
        this.attemptRepo = attemptRepo;
    }

    // Check if attempt exists
    public Attempt checkAttemptExists(String attemptId) {
        Optional<Attempt> attempt = attemptRepo.findById(attemptId);

        if (attempt.isPresent()) {
            return attempt.get();
        } else {
            throw new IllegalStateException("Attempt not found");
        }
    }

    // Check if attempt has missing fields
    public void checkAttemptFields(Attempt attempt) {
        String userId = attempt.getUserId();
        String competitionId = attempt.getCompetitionId();
        String eventId = attempt.getEventId();

        if (userId == null || userId.isEmpty() ||
                competitionId == null || competitionId.isEmpty() ||
                eventId == null || eventId.isEmpty()) {
            throw new IllegalStateException("Attempt missing fields");
        }
    }
}
