package com.nzpmcp2.demo.services;

import com.nzpmcp2.demo.middlewares.BuilderMiddleware;
import com.nzpmcp2.demo.middlewares.CompetitionMiddleware;
import com.nzpmcp2.demo.middlewares.QuestionMiddleware;
import com.nzpmcp2.demo.models.Competition;
import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.repositories.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@AllArgsConstructor

@Service
public class QuestionService {

    private final QuestionRepository questionRepo;
    private final QuestionMiddleware questionMid;
    private final BuilderMiddleware buildMid;

    // Get all questions
    public List<Question> getAllQuestions() {
        return questionRepo.findAll();
    }

    // Get question by id
    public Question getQuestionById(String id) {
        try {
            return questionMid.checkQuestionExists(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Create a new question
    public void createQuestion(Question question) {
        try {
            questionMid.checkQuestionFields(question);

            if (question.getPoints() == null) {
                question.setPoints(1);
            }

            questionRepo.save(question);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Remove a question
    public void deleteQuestion(String id) {
        try {
            // Check question exists
            questionMid.checkQuestionExists(id);

            // Remove question from competition
            buildMid.removeQuestionFromAllCompetitions(id);

            // Delete question
            questionRepo.deleteById(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Update a question
    public void updateQuestion(Question newQuestion) {
        try {
            // Check question exists
            Question question = questionMid.checkQuestionExists(newQuestion.getId());

            // Update question
            question.update(newQuestion);

            if (question.getPoints() == null) {
                question.setPoints(1);
            }

            questionMid.checkQuestionFields(question);
            questionRepo.save(question);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
