package com.nzpmcp2.demo.middlewares;

import com.nzpmcp2.demo.models.Competition;
import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.repositories.CompetitionRepository;
import com.nzpmcp2.demo.repositories.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor

@Service
public class QuestionMiddleware {

    private final QuestionRepository questionRepo;
    private final MongoTemplate mongoTemplate;
    private final CompetitionRepository competitionRepo;

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


    // Get all questions
    public List<Question> getAllCompetitionQuestions(String competitionId) {


        Optional<Competition> competitionOption = competitionRepo.findById(competitionId);
        if (competitionOption.isEmpty()) {
            throw new IllegalStateException("Competition not found");
        }

        Competition competition = competitionOption.get();
        List<String> idList = Arrays.stream(competition.getQuestionIds()).toList();


        if (competition.getQuestionIds() != null) {
            Query query = new Query();
            query.addCriteria(Criteria.where("_id").in(idList));

            List<Question> questionsList = mongoTemplate.find(query, Question.class);
            questionsList.sort(Comparator.comparingInt(q -> idList.indexOf(q.getId())));
            return questionsList;
        } else {
            throw new IllegalStateException("Error finding questions");
        }
    }
}
