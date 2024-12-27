package com.nzpmcp2.demo.services;

import com.nzpmcp2.demo.middlewares.QuestionMiddleware;
import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.repositories.QuestionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public void createQuestion(Question question) {
        try {
            questionMid.checkQuestionFields(question);
            questionMid.checkQuestionDuplicated(question.getTitle());
            questionRepo.save(question);
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
    public void updateQuestion(String currentTitle, Question newQuestion) {
        try {
            // Check question exists
            Question question = questionMid.checkQuestionExists(currentTitle);

            // Check if duplicated
            String newTitle = newQuestion.getTitle();
            if (!newTitle.isEmpty() && !currentTitle.equals(newTitle)) {
                questionMid.checkQuestionDuplicated(newTitle);
            }

            // Update question
            question.update(newQuestion);
            questionRepo.deleteById(currentTitle);
            questionRepo.save(question);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }


}
