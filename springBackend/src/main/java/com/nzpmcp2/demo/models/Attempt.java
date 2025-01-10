package com.nzpmcp2.demo.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Getter @Setter @Builder
@AllArgsConstructor
@ToString(exclude = {"answers"})

@Document(collection = "attempts")
public class Attempt {

    ///  Fields ///
    @Id
    private String id;
    private String userId;
    private String competitionId;
    private String eventId;
    private List<Answer> answers;
    private Date startTime;
    private Date endTime;

    /// Methods ///
    public Attempt copy() {
        List<Answer> answersCopy = List.copyOf(answers);
        return new Attempt(id, userId, competitionId, eventId, answersCopy, startTime, endTime);
    }

    public void update(Attempt attempt) {
        this.userId = attempt.getUserId() == null ? userId : attempt.getUserId();
        this.competitionId = attempt.getCompetitionId() == null ? competitionId : attempt.getCompetitionId();
        this.eventId = attempt.getEventId() == null ? eventId : attempt.getEventId();
        this.answers = attempt.getAnswers() == null ? answers : attempt.getAnswers();
        this.startTime = attempt.getStartTime() == null ? startTime : attempt.getStartTime();
        this.endTime = attempt.getEndTime() == null ? endTime : attempt.getEndTime();
    }
}
