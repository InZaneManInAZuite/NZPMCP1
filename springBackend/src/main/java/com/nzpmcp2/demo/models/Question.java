package com.nzpmcp2.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "questions")
public class Question {

    /// Fields ///
    @Id
    private String id;
    private String title;
    private List<String> options;
    private int correctChoiceIndex;
    private String difficulty;
    private List<String> topics;

    /// Constructor ///
    public Question(String id,
                    String title,
                    List<String> options,
                    int correctChoiceIndex,
                    String difficulty,
                    List<String> topics) {
        this.id = id;
        this.title = title;
        this.options = options;
        this.correctChoiceIndex = correctChoiceIndex;
        this.difficulty = difficulty;
        this.topics = topics;
    }

    /// Getter and Setters ///
    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public List<String> getOptions() {
        return options;
    }

    public int getCorrectChoiceIndex() {
        return correctChoiceIndex;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public List<String> getTopics() {
        return topics;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public void setCorrectChoiceIndex(int correctChoiceIndex) {
        this.correctChoiceIndex = correctChoiceIndex;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public void setTopics(List<String> topics) {
        this.topics = topics;
    }

    /// Methods ///

    public Question copy(Question question) {
        List<String> options = question.getOptions();
        List<String> topics = question.getTopics();
        return new Question(question.getId(),
                question.getTitle(),
                options,
                question.getCorrectChoiceIndex(),
                question.getDifficulty(),
                topics);
    }

    public void update(Question question) {
        title = question.getTitle() == null ? title : question.getTitle();
        options = question.getOptions() == null ? options : question.getOptions();
        if (correctChoiceIndex != question.getCorrectChoiceIndex()) {
            correctChoiceIndex = question.getCorrectChoiceIndex();
        }
        difficulty = question.getDifficulty() == null ? difficulty : question.getDifficulty();
        topics = question.getTopics() == null ? topics : question.getTopics();
    }

    // Change contents of specific option
    public void setOption(String option, int index) {
        this.options.set(index, option);
    }

    @Override
    public String toString() {
        return "Question{" +
                "id='" + id + '\'' +
                "title='" + title + '\'' +
                ", options='" + options + '\'' +
                ", correctChoiceIndex='" + correctChoiceIndex +
                ", difficulty='" + difficulty + '\'' +
                ", topics=" + topics +
                '}';
    }

    public static class Builder {
        private String id;
        private String title;
        private List<String> options;
        private int correctChoiceIndex;
        private String difficulty;
        private List<String> topics;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder setTitle(String title) {
            this.title = title;
            return this;
        }

        public Builder setOptions(List<String> options) {
            this.options = options;
            return this;
        }

        public Builder setCorrectChoiceIndex(int correctChoiceIndex) {
            this.correctChoiceIndex = correctChoiceIndex;
            return this;
        }

        public Builder setDifficulty(String difficulty) {
            this.difficulty = difficulty;
            return this;
        }

        public Builder setTopics(List<String> topics) {
            this.topics = topics;
            return this;
        }

        public Question build() {
            return new Question(id, title, options, correctChoiceIndex, difficulty, topics);
        }
    }
}
