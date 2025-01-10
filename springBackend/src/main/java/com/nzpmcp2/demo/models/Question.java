package com.nzpmcp2.demo.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter @Setter @Builder
@AllArgsConstructor
@ToString

@Document(collection = "questions")
public class Question {

    /// Fields ///
    @Id
    private String id;
    private String title;
    private List<String> options;
    private Integer correctChoiceIndex;
    private String difficulty;
    private List<String> topics;

    /// Methods ///

    public Question copy() {
        List<String> optionsCopy = List.copyOf(options);
        List<String> topicsCopy = List.copyOf(topics);
        return new Question(id, title, optionsCopy, correctChoiceIndex, difficulty, topicsCopy);
    }

    public void update(Question question) {
        title = question.getTitle() == null ? title : question.getTitle();
        options = question.getOptions() == null ? options : question.getOptions();
        correctChoiceIndex = question.getCorrectChoiceIndex() == null ? correctChoiceIndex : question.getCorrectChoiceIndex();
        difficulty = question.getDifficulty() == null ? difficulty : question.getDifficulty();
        topics = question.getTopics() == null ? topics : question.getTopics();
    }

    // Change contents of specific option
    public void setOption(String option, int index) {
        this.options.set(index, option);
    }
}
