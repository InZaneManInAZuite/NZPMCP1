package com.nzpmcp2.demo.middlewares;

import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionMiddleware {

    private final QuestionRepository questionRepo;

    @Autowired
    public QuestionMiddleware(QuestionRepository questionRepo) {
        this.questionRepo = questionRepo;
    }

    // Check question exists
    public Question checkQuestionExists(String title) {
        Optional<Question> question = questionRepo.findById(title);
        if (question.isPresent()) {
            return question.get();
        } else {
            throw new IllegalStateException("Question not found");
        }
    }

    // Check question fields
    public void checkQuestionFields(Question question) {
        String title = question.getTitle();
        List<String> options = question.getOptions();
        int correctChoiceIndex = question.getCorrectChoiceIndex();

        if (title == null || options == null || options.size() <= correctChoiceIndex || correctChoiceIndex == -1) {
            throw new IllegalStateException("Event has missing fields");
        }
    }

    // Check if duplicate question exists
    public void checkQuestionDuplicated(String title) {
        Optional<Question> question = questionRepo.findById(title);
        if (question.isPresent()) {
            throw new IllegalStateException("Question already exists");
        }
    }
}
