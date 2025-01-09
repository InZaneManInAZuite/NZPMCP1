package com.nzpmcp2.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

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

    ///  Constructor ///
    public Attempt(String id, String userId, String competitionId, String eventId, List<Answer> answers, Date startTime, Date endTime) {
        this.id = id;
        this.userId = userId;
        this.competitionId = competitionId;
        this.eventId = eventId;
        this.answers = answers;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    /// Getters and Setters ///
    public String getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public String getCompetitionId() {
        return competitionId;
    }

    public String getEventId() {
        return eventId;
    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

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

    @Override
    public String toString() {
        return "Question{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", competitionId='" + competitionId + '\'' +
                ", eventId='" + eventId + '\'' +
                ", answers=" + answers + '\'' +
                ", startTime=" + startTime + '\'' +
                ", endTime=" + endTime + '\'' +
                '}';
    }
}
