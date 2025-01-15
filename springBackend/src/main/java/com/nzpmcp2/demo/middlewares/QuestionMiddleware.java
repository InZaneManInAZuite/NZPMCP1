package com.nzpmcp2.demo.middlewares;

import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.repositories.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor

@Service
public class QuestionMiddleware {

    private final QuestionRepository questionRepo;

    // Check question exists
    public Question checkQuestionExists(String id) {
        Optional<Question> question = questionRepo.findById(id);
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

        if (question.getPoints() == null) {
            question.setPoints(1);
        }

        if (title == null ||
                options == null ||
                options.size() <= correctChoiceIndex ||
                correctChoiceIndex == -1 ||
                question.getPoints() < 1) {

            throw new IllegalStateException("Event has missing fields");
        }
    }
}
