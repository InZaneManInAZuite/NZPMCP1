package com.nzpmcp2.demo.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.List;

@Getter @Setter @Builder
@AllArgsConstructor
@ToString(exclude = {"questionIds"})

@Document(collection = "competitions")
public class Competition {

    // Fields
    @Id
    private String id;
    private String title;
    private String[] questionIds;
    private List<String> events;
    private Integer points;

    // Methods

    public Competition copy() {
        String[] questionsCopy = Arrays.copyOf(this.questionIds, this.questionIds.length);
        List<String> eventsCopy = Arrays.asList(questionsCopy);
        return new Competition(id, title, questionsCopy, eventsCopy, points);
    }

    public void addAQuestion(String questionId) {
        questionIds = Arrays.copyOf(questionIds, questionIds.length + 1);
        questionIds[questionIds.length - 1] = questionId;
    }

    public void removeAQuestion(String questionId) {
        List<String> questionIdList = Arrays.asList(questionIds);
        questionIdList.remove(questionId);
        questionIds = questionIdList.toArray(new String[0]);
    }

    public void addEvent(String event) {
        events.add(event);
    }

    public void removeEvent(String event) {
        events.remove(event);
    }

    public void update(Competition competition) {
        title = competition.getTitle() == null ? title : competition.getTitle();
        questionIds = competition.getQuestionIds() == null ? questionIds : competition.getQuestionIds();
        events = competition.getEvents() == null ? events : competition.getEvents();
        points = competition.getPoints() == null ? points : competition.getPoints();
    }
}
