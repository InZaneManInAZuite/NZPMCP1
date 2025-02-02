package com.nzpmcp2.demo.controllers;

import com.nzpmcp2.demo.middlewares.QuestionMiddleware;
import com.nzpmcp2.demo.models.*;
import com.nzpmcp2.demo.repositories.AttemptRepository;
import com.nzpmcp2.demo.repositories.CompetitionRepository;
import com.nzpmcp2.demo.repositories.EventRepository;
import com.nzpmcp2.demo.services.AttemptService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor

@CrossOrigin
@RestController
@RequestMapping("/api/attempts")
public class AttemptController {

    private final AttemptService attemptService;
    private final AttemptRepository attemptRepo;
    private final QuestionMiddleware questionMid;
    private final CompetitionRepository competitionRepo;
    private final EventRepository eventRepo;

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
            Optional<Competition> competitionOption = competitionRepo.findById(competitionId);
            if (competitionOption.isPresent()) {
                List<Question> questions = questionMid.getAllCompetitionQuestions(competitionOption.get());
                return ResponseEntity.ok(questions);
            } else {
                return ResponseEntity.notFound().build();
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
            if (attempts != null) {
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

    @GetMapping("/score/{attemptId}")
    public ResponseEntity<Attempt> getAttemptScore(@PathVariable String attemptId) {
        try {
            Optional<Attempt> attemptOption = attemptRepo.findById(attemptId);

            if (attemptOption.isPresent()) {
                Attempt attempt = attemptOption.get();

                Optional<Competition> competitionOption = competitionRepo.findById(attempt.getCompetitionId());

                if (competitionOption.isEmpty()) {
                    return ResponseEntity.notFound().build();
                }

                Competition competition = competitionOption.get();

                List<Question> questions = questionMid.getAllCompetitionQuestions(competition);

                Integer score = 0;
                for (Question question : questions) {
                    Optional<Answer> answerOption = attempt.getAnswers().stream().filter(a ->
                            a.getQuestionId().equals(question.getId())).findFirst();
                    if (answerOption.isPresent()) {
                        Answer answer = answerOption.get();
                        if (answer.getAnswerIndex() == question.getCorrectChoiceIndex()) {
                            score += question.getPoints();
                        }
                    }
                }

                attempt.setScore(score);
                attemptRepo.save(attempt);
                return ResponseEntity.ok(attempt);

            } else {
                String message = "Attempt not found";
                return ResponseEntity.status(HttpStatus.NOT_FOUND).header("message", message).build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/score-report/{eventId}")
    public ResponseEntity<Void> getAttemptScoreEvent(@PathVariable String eventId) {
        try {
            Optional<Event> eventOpt = eventRepo.findById(eventId);
            List<Attempt> attempts = attemptRepo.findByEventId(eventId);
            if (eventOpt.isEmpty() || attempts.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            Event event = eventOpt.get();

            Optional<Competition> competitionOpt = competitionRepo.findById(eventOpt.get().getCompetitionId());
            if (competitionOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            Competition competition = competitionOpt.get();





            List<Question> questions = questionMid.getAllCompetitionQuestions(competition);

            Integer points = 0;
            for (Question question : questions) {
                points += question.getPoints();
            }
            competition.setPoints(points);
            competitionRepo.save(competition);





            for (Attempt attempt : attempts) {
                Integer score = 0;
                for (Question question : questions) {
                    Optional<Answer> answerOption = attempt.getAnswers().stream().filter(a ->
                            a.getQuestionId().equals(question.getId())).findFirst();
                    if (answerOption.isPresent()) {
                        Answer answer = answerOption.get();
                        if (answer.getAnswerIndex() == question.getCorrectChoiceIndex()) {
                            score += question.getPoints();
                        }
                    }
                }
                attempt.setScore(score);
                attemptRepo.save(attempt);
            }



            event.setGraded(true);
            eventRepo.save(event);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
