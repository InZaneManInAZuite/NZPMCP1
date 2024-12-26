package com.nzpmcp2.demo.controllers;

import com.nzpmcp2.demo.inputs.QuestionInput;
import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.services.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        try {
            List<Question> questions = questionService.getAllQuestions();
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/specific")
    public ResponseEntity<Question> getQuestionById(@RequestParam String title) {
        try {
            Question question = questionService.getQuestionByTitle(title);
            return ResponseEntity.ok(question);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Void> createQuestion(@RequestBody Question question) {
        try {
            questionService.createQuestion(question);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/specific")
    public ResponseEntity<Void> deleteQuestionById(@RequestParam String title) {
        try {
            questionService.deleteQuestion(title);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/specific")
    public ResponseEntity<Void> updateQuestion(@RequestBody QuestionInput questionInput) {
        try {
            Question newQuestion = new Question.Builder()
                    .setTitle(questionInput.newTitle())
                    .setOptions(questionInput.options())
                    .setCorrectChoiceIndex(questionInput.correctChoiceIndex())
                    .build();

            questionService.updateQuestion(questionInput.title(), newQuestion);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
