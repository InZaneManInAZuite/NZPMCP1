package com.nzpmcp2.demo.controllers;

import com.nzpmcp2.demo.middlewares.BuilderMiddleware;
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
    private final BuilderMiddleware buildMid;

    @Autowired
    public CompetitionController(CompetitionService competeService,
                                 BuilderMiddleware buildMid) {
        this.competeService = competeService;
        this.buildMid = buildMid;
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

    @GetMapping("/{id}")
    public ResponseEntity<Competition> getCompetitionById(@PathVariable String id) {
        try {
            Competition competition = competeService.getCompetitionById(id);
            return ResponseEntity.ok(competition);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Competition> createCompetition(@RequestBody Competition competition) {
        try{
            competeService.createCompetition(competition);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompetition(@PathVariable String id) {
        try {
            buildMid.removeCompetitionFromAllEvents(id);
            competeService.deleteCompetition(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<Competition> updateCompetition(@RequestBody Competition competition) {
        try {
            competeService.updateCompetition(competition);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
