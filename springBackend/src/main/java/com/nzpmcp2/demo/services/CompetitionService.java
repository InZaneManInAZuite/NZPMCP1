package com.nzpmcp2.demo.services;

import com.nzpmcp2.demo.middlewares.BuilderMiddleware;
import com.nzpmcp2.demo.middlewares.CompetitionMiddleware;
import com.nzpmcp2.demo.models.Competition;
import com.nzpmcp2.demo.repositories.AttemptRepository;
import com.nzpmcp2.demo.repositories.CompetitionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor

@Service
public class CompetitionService {

    private final CompetitionRepository competeRepo;
    private final CompetitionMiddleware competeMid;
    private final AttemptRepository attemptRepo;
    private final BuilderMiddleware buildMid;

    // Get all competitions
    public List<Competition> getAllCompetitions() {
        return competeRepo.findAll();
    }

    // Get competition by title
    public Competition getCompetitionById(String id) {
        try {
            return competeMid.checkCompetitionExists(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Create a new competition
    public void createCompetition(Competition competition) {
        try {
            competeMid.checkCompetitionFields(competition);
            competeRepo.save(competition);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Remove a competition
    public void deleteCompetition(String id) {
        try {
            // Obtain competition
            competeMid.checkCompetitionExists(id);

            // Remove competition from all included events
            buildMid.removeCompetitionFromAllEvents(id);
            attemptRepo.deleteAllByCompetitionId(id);

            // Remove competition
            competeRepo.deleteById(id);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Update a competition
    public void updateCompetition(Competition competitionUpdate) {
        try {
            // Check if competition exists
            Competition competition = competeMid.checkCompetitionExists(competitionUpdate.getId());

            // Update the competition
            competition.update(competitionUpdate);
            Competition newCompetition = competeMid.updateCompetitionPoints(competition);

            competeRepo.save(newCompetition);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
