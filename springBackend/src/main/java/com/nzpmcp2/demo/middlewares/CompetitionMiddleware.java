package com.nzpmcp2.demo.middlewares;

import com.nzpmcp2.demo.models.Competition;
import com.nzpmcp2.demo.repositories.CompetitionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompetitionMiddleware {

    private final CompetitionRepository competeRepo;

    @Autowired
    public CompetitionMiddleware(CompetitionRepository competeRepo) {
        this.competeRepo = competeRepo;
    }

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
}
