package com.nzpmcp2.demo.controllers;

import com.nzpmcp2.demo.inputs.CompetitionInput;
import com.nzpmcp2.demo.models.Competition;
import com.nzpmcp2.demo.services.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/competitions")
public class CompetitionController {

    private final CompetitionService competeService;

    @Autowired
    public CompetitionController(CompetitionService competeService) {
        this.competeService = competeService;
    }

    @GetMapping
    public ResponseEntity<List<Competition>> getAllCompetitions() {
        try {
            List<Competition> competitions = competeService.getAllCompetitions();
            return ResponseEntity.ok(competitions);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/title")
    public ResponseEntity<Competition> getCompetitionById(@RequestParam String title) {
        try {
            Competition competition = competeService.getCompetitionByTitle(title);
            return ResponseEntity.ok(competition);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition) {
        try{
            Competition newCompetition = competeService.createCompetition(competition);
            return ResponseEntity.ok(newCompetition);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteCompetition(@RequestParam String title) {
        try {
            competeService.deleteCompetition(title);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<Competition> updateCompetition(@RequestBody CompetitionInput competeInput) {
        try {
            Competition newCompete = new Competition.Builder()
                    .setTitle(competeInput.newTitle())
                    .setQuestionIds(competeInput.questionIds())
                    .setEvents(competeInput.events())
                    .build();

            String title = competeInput.title();
            competeService.updateCompetition(title, newCompete);
            return ResponseEntity.ok(newCompete);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // TODO: Add new controllers for its interactions with events
}
