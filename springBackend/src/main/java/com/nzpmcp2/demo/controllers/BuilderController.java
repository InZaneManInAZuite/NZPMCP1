package com.nzpmcp2.demo.controllers;

import com.nzpmcp2.demo.middlewares.BuilderMiddleware;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/builder")
public class BuilderController {

    private final BuilderMiddleware buildMid;

    public BuilderController(BuilderMiddleware buildMid) {
        this.buildMid = buildMid;
    }

    @PutMapping("/add/competition")
    public ResponseEntity<Void> placeCompeteToEvent(@RequestParam String competitionId,
                                                    @RequestParam String eventId) {
        try {
            buildMid.addCompetitionToEvent(competitionId, eventId);
            buildMid.addEventToCompetition(eventId, competitionId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/remove/competition")
    public ResponseEntity<Void> removeCompeteFromEvent(@RequestParam String competitionId,
                                                       @RequestParam String eventId) {
        try{
            buildMid.removeCompetitionFromEvent(competitionId, eventId);
            buildMid.removeEventFromCompetition(eventId, competitionId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/add/question")
    public ResponseEntity<Void> placeQuestionToCompetition(@RequestParam String competitionId,
                                                           @RequestParam String questionId) {
        try {
            buildMid.addQuestionToCompetition(questionId, competitionId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/remove/question")
    public ResponseEntity<Void> removeQuestionFromCompetition(@RequestParam String competitionId,
                                                              @RequestParam String questionId) {
        try {
            buildMid.removeQuestionFromCompetition(questionId, competitionId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
