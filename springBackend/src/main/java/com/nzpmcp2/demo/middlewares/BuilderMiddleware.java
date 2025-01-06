package com.nzpmcp2.demo.middlewares;

import com.nzpmcp2.demo.models.Competition;
import com.nzpmcp2.demo.models.Event;
import com.nzpmcp2.demo.models.Question;
import com.nzpmcp2.demo.repositories.CompetitionRepository;
import com.nzpmcp2.demo.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class BuilderMiddleware {

    private final EventRepository eventRepo;
    private final EventMiddleware eventMid;
    private final CompetitionRepository competeRepo;
    private final CompetitionMiddleware competeMid;
    private final QuestionMiddleware questionMid;

    @Autowired
    public BuilderMiddleware(EventRepository eventRepo,
                             EventMiddleware eventMid,
                             CompetitionRepository competeRepo,
                             CompetitionMiddleware competeMid,
                             QuestionMiddleware questionMid) {
        this.eventRepo = eventRepo;
        this.eventMid = eventMid;
        this.competeRepo = competeRepo;
        this.competeMid = competeMid;
        this.questionMid = questionMid;
    }

    public void addCompetitionToEvent(String competitionId, String eventId) {
        try {
            competeMid.checkCompetitionExists(competitionId);
            Event event = eventMid.checkEventExists(eventId);

            if (event.getCompetitionId().isEmpty()) {
                event.setCompetitionId(competitionId);
                eventRepo.save(event);
            } else {
                throw new IllegalStateException("Event already has competition");
            }

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    public void addEventToCompetition(String eventId, String competitionId) {
        try {
            Competition competition = competeMid.checkCompetitionExists(competitionId);
            eventMid.checkEventExists(eventId);

            if (competition.getEvents().isEmpty()) {
                List<String> newEvents = new ArrayList<>();
                newEvents.add(eventId);
                competition.setEvents(newEvents);
                competeRepo.save(competition);
            } else {
                List<String> newEvents = competition.getEvents();
                if (!newEvents.contains(eventId)) {
                    newEvents.add(eventId);
                    competition.setEvents(newEvents);
                    competeRepo.save(competition);
                }
            }

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    public void removeEventFromCompetition(String eventId, String competitionId) {
        try {
            Competition competition = competeMid.checkCompetitionExists(competitionId);
            eventMid.checkEventExists(eventId);

            if (competition.getEvents().isEmpty()) {
                return;
            }
            List<String> newEvents = competition.getEvents().stream().filter(id -> !id.equals(eventId)).toList();

            competition.setEvents(newEvents);
            competeRepo.save(competition);

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    public void removeCompetitionFromEvent(String competitionId, String eventId) {
        try {
            competeMid.checkCompetitionExists(competitionId);
            Event event = eventMid.checkEventExists(eventId);

            if (!event.getCompetitionId().isEmpty() && event.getCompetitionId().equals(competitionId)) {
                event.setCompetitionId(null);
                eventRepo.save(event);
            } else {
                throw new IllegalStateException("Competition is not assigned to event");
            }

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    public void removeCompetitionFromAllEvents(String competeId) {
        try {
            competeMid.checkCompetitionExists(competeId);

            eventRepo.findAll().forEach(event -> {
                if (!event.getCompetitionId().isEmpty() && event.getCompetitionId().equals(competeId)) {
                    event.setCompetitionId(null);
                    eventRepo.save(event);
                }
            });
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    public void removeEventFromAllCompetition(String eventId) {
        try {
            eventMid.checkEventExists(eventId);

            competeRepo.findAll().forEach(competition -> {
                if (!competition.getEvents().isEmpty()) {
                    List<String> newEvents = competition.getEvents().stream().filter(id -> !id.equals(eventId)).toList();
                    competition.setEvents(newEvents);
                    competeRepo.save(competition);
                }
            });
        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }



    public void addQuestionToCompetition(String questionId, String competitionId) {
        try {
            questionMid.checkQuestionExists(questionId);
            Competition competition = competeMid.checkCompetitionExists(competitionId);

            List<String> questionIds = new ArrayList<>();
            if (competition.getQuestionIds() != null && competition.getQuestionIds().length > 0) {
                questionIds.addAll(Arrays.asList(competition.getQuestionIds()));
                questionIds.add(questionId);
                competition.setQuestionIds(questionIds.toArray(new String[0]));
                competeRepo.save(competition);
            } else {
                questionIds.add(questionId);
                competition.setQuestionIds(questionIds.toArray(new String[0]));
                competeRepo.save(competition);
            }


        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    public void removeQuestionFromCompetition(String questionId, String competitionId) {
        try {
            questionMid.checkQuestionExists(questionId);
            Competition competition = competeMid.checkCompetitionExists(competitionId);

            if (competition.getQuestionIds() != null && competition.getQuestionIds().length > 0) {
                List<String> questionIds = new ArrayList<>(Arrays.asList(competition.getQuestionIds()));
                List<String> filteredList = questionIds.stream().filter(id -> !id.equals(questionId)).toList();

                competition.setQuestionIds(filteredList.toArray(new String[0]));
                competeRepo.save(competition);
            }

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

    public void removeQuestionFromAllCompetitions(String questionId) {
        try {
            questionMid.checkQuestionExists(questionId);

            try {
                competeRepo.findAll().forEach(competition -> {
                    if (competition.getQuestionIds().length > 0) {
                        List<String> questionIds = new ArrayList<>(Arrays.asList(competition.getQuestionIds()));
                        if (questionIds.contains(questionId)) {
                            List<String> newQues = questionIds.stream().filter(id -> !id.equals(questionId)).toList();
                            competition.setQuestionIds(newQues.toArray(new String[0]));
                        }
                    }
                });
            } catch (IllegalStateException e) {
                // Do nothing
            }

        } catch (IllegalStateException e) {
            throw new IllegalStateException(e.getMessage());
        }
    }

}
