package com.nzpmcp2.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "attempts")
public class Attempt {

    ///  Fields ///
    @Id
    private String id;
    private String studentEmail;
    private String competitionId;
    private Map<String, Integer> attempts;

    ///  Constructor ///
    public Attempt(String id, String email, String competitionId, Map<String, Integer> attempts) {
        this.id = id;
        this.studentEmail = email;
        this.competitionId = competitionId;
        this.attempts = attempts;
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

    public Map<String, Integer> getAttempts() {
        return attempts;
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

    public void setAttempts(Map<String, Integer> attempts) {
        this.attempts = attempts;
    }

    /// Methods ///
    public Attempt copy() {
        return new Attempt(id, studentEmail, competitionId, attempts);
    }

    public void update(Attempt attempt) {
        this.studentEmail = attempt.getStudentEmail() == null ? studentEmail : attempt.getStudentEmail();
        this.competitionId = attempt.getCompetitionId() == null ? competitionId : attempt.getCompetitionId();
        this.attempts = attempt.getAttempts() == null ? attempts : attempt.getAttempts();
    }

    @Override
    public String toString() {
        return "Question{" +
                "id='" + id + '\'' +
                ", studentEmail='" + studentEmail + '\'' +
                ", competitionId='" + competitionId + '\'' +
                ", attempts=" + attempts +
                '}';
    }
}
