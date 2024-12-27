package com.nzpmcp2.demo.services;

import com.nzpmcp2.demo.middlewares.CompetitionMiddleware;
import com.nzpmcp2.demo.models.Competition;
import com.nzpmcp2.demo.repositories.CompetitionRepository;
import com.nzpmcp2.demo.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {

    private final CompetitionRepository competeRepo;
    private final CompetitionMiddleware competeMid;
    private final EventRepository eventRepo;

    @Autowired
    public CompetitionService(CompetitionRepository competeRepo,
                              CompetitionMiddleware competeMid,
                              EventRepository eventRepo) {
        this.competeRepo = competeRepo;
        this.competeMid = competeMid;
        this.eventRepo = eventRepo;
    }

    // Get all competitions
    public List<Competition> getAllCompetitions() {
        return competeRepo.findAll();
    }

    // Get competition by title
    public Competition getCompetitionByTitle(String title) {
        try {
            return competeMid.checkCompetitionExists(title);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Create a new competition
    public Competition createCompetition(Competition competition) {
        try {
            competeMid.checkCompetitionFields(competition);
            competeMid.checkCompetitionDuplicated(competition.getTitle());
            competeRepo.save(competition);
            return competition;
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Remove a competition
    public void deleteCompetition(String title) {
        try {
            // Obtain competition
            competeMid.checkCompetitionExists(title);

            // TODO: Remove competition from all included events

            // Remove competition
            competeRepo.deleteById(title);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    // Update a competition
    public void updateCompetition(String currentTitle, Competition competitionUpdate) {
        try {
            // Check if competition exists
            Competition competition = competeMid.checkCompetitionExists(currentTitle);

            // Check if competition is duplicated
            String newTitle = competitionUpdate.getTitle();
            if (!newTitle.isEmpty() && !newTitle.equals(currentTitle)) {
                competeMid.checkCompetitionDuplicated(newTitle);
            }

            // Update the competition
            competition.update(competitionUpdate);
            competeRepo.deleteById(currentTitle);
            competeRepo.save(competition);
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }
}
