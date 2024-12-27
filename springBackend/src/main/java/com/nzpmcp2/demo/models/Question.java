package com.nzpmcp2.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "questions")
public class Question {

    /// Fields ///
    @Id
    private String title;
    private List<String> options;
    private int correctChoiceIndex;

    /// Constructor ///
    public Question(String title, List<String> options, int correctChoiceIndex) {
        this.title = title;
        this.options = options;
        this.correctChoiceIndex = correctChoiceIndex;
    }

    /// Getter and Setters ///
    public String getTitle() {
        return title;
    }

    public List<String> getOptions() {
        return options;
    }

    public int getCorrectChoiceIndex() {
        return correctChoiceIndex;
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

    /// Methods ///

    public Question copy(Question question) {
        List<String> options = question.getOptions();
        return new Question(question.getTitle(), options, question.getCorrectChoiceIndex());
    }

    public void update(Question question) {
        title = question.getTitle() == null ? title : question.getTitle();
        options = question.getOptions() == null ? options : question.getOptions();
        if (correctChoiceIndex != question.getCorrectChoiceIndex()) {
            correctChoiceIndex = question.getCorrectChoiceIndex();
        }
    }

    // Change contents of specific option
    public void setOption(String option, int index) {
        this.options.set(index, option);
    }

    @Override
    public String toString() {
        return "Question{" +
                "title='" + title + '\'' +
                ", options='" + options + '\'' +
                ", correctChoiceIndex='" + correctChoiceIndex +
                '}';
    }

    public static class Builder {
        private String title;
        private List<String> options;
        private int correctChoiceIndex;

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

        public Question build() {
            return new Question(title, options, correctChoiceIndex);
        }
    }
}
