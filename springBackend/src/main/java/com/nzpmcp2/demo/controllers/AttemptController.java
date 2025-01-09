package com.nzpmcp2.demo.controllers;

import com.nzpmcp2.demo.middlewares.CompetitionMiddleware;
import com.nzpmcp2.demo.models.Attempt;
import com.nzpmcp2.demo.models.Competition;
import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.repositories.QuestionRepository;
import com.nzpmcp2.demo.services.AttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/attempts")
public class AttemptController {

    private final AttemptService attemptService;
    private final QuestionRepository questionRepository;
    private final CompetitionMiddleware competitionMiddleware;

    @Autowired
    public AttemptController(AttemptService attemptService, QuestionRepository questionRepository, CompetitionMiddleware competitionMiddleware) {
        this.attemptService = attemptService;
        this.questionRepository = questionRepository;
        this.competitionMiddleware = competitionMiddleware;
    }

    @GetMapping
    public ResponseEntity<List<Attempt>> getAttempts() {
        try {
            List<Attempt> attempts = attemptService.getAllAttempts();
            return ResponseEntity.ok(attempts);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Attempt>> getStudentAttempts(@PathVariable String userId) {
        try {
            List<Attempt> attempts = attemptService.getAttemptsByStudent(userId);
            return ResponseEntity.ok(attempts);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/questions/{competitionId}")
    public ResponseEntity<List<Question>> getQuestions(@PathVariable String competitionId) {
        try {
            Competition competition = competitionMiddleware.checkCompetitionExists(competitionId);
            List<String> idList = Arrays.stream(competition.getQuestionIds()).toList();
            if (competition.getQuestionIds() != null) {
                List<Question> questionsList = questionRepository.findQuestionsByListOfIds(idList);
                return ResponseEntity.ok(questionsList);
            } else {
                return ResponseEntity.noContent().build();
            }
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/competition/{competitionId}")
    public ResponseEntity<List<Attempt>> getCompetitionAttempts(@PathVariable String competitionId) {
        try {
            List<Attempt> attempts = attemptService.getAttemptsByCompetition(competitionId);
            return ResponseEntity.ok(attempts);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user-event/{userId}/{eventId}")
    public ResponseEntity<List<Attempt>> getUserAttempts(@PathVariable String userId, @PathVariable String eventId) {
        try {
            List<Attempt> attempts = attemptService.getAttemptsByUserAndEvent(userId, eventId);
            if (attempts != null && !attempts.isEmpty()) {
                return ResponseEntity.ok(attempts);
            } else {
                return ResponseEntity.noContent().build();
            }

        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/id/{attemptId}")
    public ResponseEntity<Attempt> getAttemptById(@PathVariable String attemptId) {
        try {
            Attempt attempt = attemptService.getAttemptById(attemptId);
            return ResponseEntity.ok(attempt);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Attempt> createAttempt(@RequestBody Attempt attempt) {
        try {
            Attempt attemptCreated = attemptService.createAttempt(attempt);
            return ResponseEntity.ok(attemptCreated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAttemptById(@RequestParam String attemptId) {
        try {
            attemptService.deleteAttempt(attemptId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<Void> updateAttemptById(@RequestBody Attempt attemptUpdate) {
        try {
            attemptService.updateAttempt(attemptUpdate.getId(), attemptUpdate);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
