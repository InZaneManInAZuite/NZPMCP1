package com.nzpmcp2.demo.controllers;

import com.nzpmcp2.demo.models.Attempt;
import com.nzpmcp2.demo.models.Competition;
import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.services.AttemptService;
import com.nzpmcp2.demo.services.CompetitionService;
import com.nzpmcp2.demo.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/attempts")
public class AttemptController {

    private final AttemptService attemptService;
    private final CompetitionService competitionService;
    private final QuestionService questionService;

    @Autowired
    public AttemptController(AttemptService attemptService, CompetitionService competitionService, QuestionService questionService) {
        this.attemptService = attemptService;
        this.competitionService = competitionService;
        this.questionService = questionService;
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

    @GetMapping("/student/{userId}")
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
            List<Question> questionsList = new ArrayList<Question>();
            Competition competition = competitionService.getCompetitionById(competitionId);

            if (competition != null && competition.getQuestionIds() != null) {
                for (String questionId : competition.getQuestionIds()) {
                    try {
                        Question question = questionService.getQuestionById(questionId);
                        if (question != null) {
                            questionsList.add(question);
                        }
                    } catch (IllegalStateException e) {
                        // Do nothing
                    }
                }
            }
            return ResponseEntity.ok(questionsList);
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
            Attempt attempt = attemptService.updateAttempt(attemptUpdate.getId(), attemptUpdate);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
