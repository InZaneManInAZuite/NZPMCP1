package com.nzpmcp2.demo.controllers;

import com.nzpmcp2.demo.middlewares.BuilderMiddleware;
import com.nzpmcp2.demo.models.BuilderInput;
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
    public ResponseEntity<Void> placeCompeteToEvent(@RequestBody BuilderInput input) {
        try {
            buildMid.addCompetitionToEvent(input.competitionId(), input.eventId());
            buildMid.addEventToCompetition(input.eventId(), input.competitionId());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/remove/competition")
    public ResponseEntity<Void> removeCompeteFromEvent(@RequestBody BuilderInput input) {
        try{
            buildMid.removeCompetitionFromEvent(input.competitionId(), input.eventId());
            buildMid.removeEventFromCompetition(input.eventId(), input.competitionId());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/add/question")
    public ResponseEntity<Void> placeQuestionToCompetition(@RequestBody BuilderInput input) {
        try {
            buildMid.addQuestionToCompetition(input.questionId(), input.competitionId());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/remove/question")
    public ResponseEntity<Void> removeQuestionFromCompetition(@RequestBody BuilderInput input) {
        try {
            buildMid.removeQuestionFromCompetition(input.questionId(), input.competitionId());
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
