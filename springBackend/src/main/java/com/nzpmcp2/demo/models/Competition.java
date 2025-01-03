package com.nzpmcp2.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.List;

@Document(collection = "competitions")
public class Competition {

    // Fields
    @Id
    private String id;
    private String title;
    private String[] questionIds;
    private List<String> events;

    // Constructor
    public Competition(String id, String title, String[] questionIds, List<String> events) {
        this.id = id;
        this.title = title;
        this.questionIds = questionIds;
        this.events = events;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String[] getQuestionIds() {
        return questionIds;
    }

    public List<String> getEvents() {
        return events;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setQuestionIds(String[] questionIds) {
        this.questionIds = questionIds;
    }

    public void setEvents(List<String> events) {
        this.events = events;
    }

    // Methods

    public Competition copy() {
        String[] questionsCopy = Arrays.copyOf(this.questionIds, this.questionIds.length);
        List<String> eventsCopy = Arrays.asList(questionsCopy);
        return new Competition(id, title, questionsCopy, eventsCopy);
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

    public void addQuestions(String[] newQuestionIds) {
        List<String> oldQuestionList = Arrays.asList(questionIds);
        oldQuestionList.addAll(Arrays.asList(newQuestionIds));
        this.questionIds = oldQuestionList.toArray(new String[0]);
    }

    public void removeQuestions(String[] newQuestionIds) {
        List<String> oldQuestionList = Arrays.asList(questionIds);
        oldQuestionList.removeAll(Arrays.asList(newQuestionIds));
        this.questionIds = oldQuestionList.toArray(new String[0]);
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
    }

    @Override
    public String toString() {
        return "Competition{" +
                "id='" + id + '\'' +
                "title='" + title + '\'' +
                ", questionIds='" + Arrays.toString(questionIds) + '\'' +
                ", events='" + events +
                '}';
    }

    public static class Builder {
        private String id;
        private String title;
        private String[] questionIds;
        private List<String> events;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder setQuestionIds(String[] questionIds) {
            this.questionIds = questionIds;
            return this;
        }

        public Builder setEvents(List<String> events) {
            this.events = events;
            return this;
        }

        public Competition build() {
            return new Competition(id, title, questionIds, events);
        }
    }
}
