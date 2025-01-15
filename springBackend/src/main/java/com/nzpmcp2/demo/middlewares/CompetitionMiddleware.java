package com.nzpmcp2.demo.middlewares;

import com.nzpmcp2.demo.models.Competition;
import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.repositories.CompetitionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor

@Service
public class CompetitionMiddleware {

    private final CompetitionRepository competeRepo;
    private final QuestionMiddleware questionMid;

    // Check if competition exists
    public Competition checkCompetitionExists(String id) {
        Optional<Competition> competition = competeRepo.findById(id);
        if (competition.isPresent()) {
            return competition.get();
        } else {
            throw new IllegalStateException("Competition not found");
        }
    }

    // Check if competition has missing fields
    public void checkCompetitionFields(Competition competition) {
        String title = competition.getTitle();

        if (title == null) {
            throw new IllegalStateException("Competition missing fields");
        }
    }

    public Competition updateCompetitionPoints(Competition competition) {
        String[] questionIds = competition.getQuestionIds();
        if (questionIds == null || questionIds.length == 0) {
            competition.setPoints(0);
            return competition;
        } else {
            List<Question> questions = questionMid.getAllCompetitionQuestions(competition.getId());
            Integer points = 0;
            for (Question question : questions) {
                points += question.getPoints();
            }
            competition.setPoints(points);
            return competition;
        }
    }
}
