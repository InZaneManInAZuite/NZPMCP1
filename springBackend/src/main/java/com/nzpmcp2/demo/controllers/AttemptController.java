package com.nzpmcp2.demo.controllers;

import com.nzpmcp2.demo.models.Attempt;
import com.nzpmcp2.demo.services.AttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/attempts")
public class AttemptController {

    private final AttemptService attemptService;

    @Autowired
    public AttemptController(AttemptService attemptService) {
        this.attemptService = attemptService;
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

    @GetMapping("/student")
    public ResponseEntity<List<Attempt>> getStudentAttempts(@RequestParam String studentEmail) {
        try {
            List<Attempt> attempts = attemptService.getAttemptsByStudent(studentEmail);
            return ResponseEntity.ok(attempts);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/competition")
    public ResponseEntity<List<Attempt>> getCompetitionAttempts(@RequestParam String competitionId) {
        try {
            List<Attempt> attempts = attemptService.getAttemptsByCompetition(competitionId);
            return ResponseEntity.ok(attempts);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/id")
    public ResponseEntity<Attempt> getAttemptById(@RequestParam String attemptId) {
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
