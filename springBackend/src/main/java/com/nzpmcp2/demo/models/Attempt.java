package com.nzpmcp2.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Document(collection = "attempts")
public class Attempt {

    ///  Fields ///
    @Id
    private String id;
    private String studentEmail;
    private String competitionId;
    private String eventId;
    private List<String> questionIds;
    private List<String> answerIds;
    private Date startTime;

    ///  Constructor ///
    public Attempt(String id, String studentEmail, String competitionId, String eventId, List<String> questionIds, List<String> answerIds) {
        this.id = id;
        this.studentEmail = studentEmail;
        this.eventId = eventId;
        this.competitionId = competitionId;
        this.questionIds = questionIds;
        this.answerIds = answerIds;
    }

    /// Getters and Setters ///
    public String getId() {
        return id;
    }

    public String getStudentEmail() {
        return studentEmail;
    }

    public String getCompetitionId() {
        return competitionId;
    }

    public String getEventId() {
        return eventId;
    }

    public List<String> getQuestionIds() {
        return questionIds;
    }

    public List<String> getAnswerIds() {
        return answerIds;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public void setQuestionIds(List<String> questionIds) {
        this.questionIds = questionIds;
    }

    public void setAnswerIds(List<String> answerIds) {
        this.answerIds = answerIds;
    }

    /// Methods ///
    public Attempt copy() {
        return new Attempt(id, studentEmail, competitionId, eventId, questionIds, answerIds);
    }

    public void update(Attempt attempt) {
        this.studentEmail = attempt.getStudentEmail() == null ? studentEmail : attempt.getStudentEmail();
        this.competitionId = attempt.getCompetitionId() == null ? competitionId : attempt.getCompetitionId();
        this.eventId = attempt.getEventId() == null ? eventId : attempt.getEventId();
        this.questionIds = attempt.getQuestionIds() == null ? questionIds : attempt.getQuestionIds();
        this.answerIds = attempt.getAnswerIds() == null ? answerIds : attempt.getAnswerIds();
    }

    @Override
    public String toString() {
        return "Question{" +
                "id='" + id + '\'' +
                ", studentEmail='" + studentEmail + '\'' +
                ", competitionId='" + competitionId + '\'' +
                ", eventId='" + eventId + '\'' +
                ", questionIds=" + questionIds + '\'' +
                ", answerIds=" + answerIds +
                '}';
    }
}
