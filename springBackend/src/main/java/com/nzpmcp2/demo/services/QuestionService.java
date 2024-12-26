package com.nzpmcp2.demo.services;

import com.nzpmcp2.demo.middlewares.QuestionMiddleware;
import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.repositories.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepo;
    private final QuestionMiddleware questionMid;

    public QuestionService(QuestionRepository questionRepo,
                           QuestionMiddleware questionMid) {
        this.questionRepo = questionRepo;
        this.questionMid = questionMid;
    }

    // Get all questions
    public List<Question> getAllQuestions() {
        return questionRepo.findAll();
    }

    // Get question by id
    public Question getQuestionByTitle(String title) {
        try {
            return questionMid.checkQuestionExists(title);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Create a new question
    public Question createQuestion(Question question) {
        try {
            questionMid.checkQuestionFields(question);
            questionMid.checkQuestionExists(question.getTitle());

            questionRepo.save(question);
            return question;
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Remove a question
    public void deleteQuestion(String title) {
        try {
            // Check question exists
            questionMid.checkQuestionExists(title);

            // TODO: Remove question from competition

            // Delete question
            questionRepo.deleteById(title);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Update a question
    public void updateQuestion(String title, Question question) {
        try {
            // Check question exists
            Question foundQuestion = questionMid.checkQuestionExists(title);

            // Check if duplicated
            Optional<Question> optionalQuestion = questionRepo.findById(question.getTitle());
            if (optionalQuestion.isPresent()) {
                throw new IllegalStateException("Question already exists");
            }

            // Update question
            foundQuestion.update(question);
            questionRepo.deleteById(title);
            questionRepo.save(question);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }


}
