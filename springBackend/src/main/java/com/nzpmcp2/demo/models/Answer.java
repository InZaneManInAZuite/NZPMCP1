package com.nzpmcp2.demo.models;

public class Answer {

    private String questionId;
    private int answerIndex;

    public Answer(String questionId, int answerIndex) {
        this.questionId = questionId;
        this.answerIndex = answerIndex;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public int getAnswerIndex() {
        return answerIndex;
    }

    public void setAnswerIndex(int answerIndex) {
        this.answerIndex = answerIndex;
    }
}
