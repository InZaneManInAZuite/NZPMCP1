package com.nzpmcp2.demo.config;

public enum Permissions {
    USER_GET_ALL("user:getall"),
    USER_GET_BY_ID("user:getbyid"),
    USER_CREATE("user:create"),
    USER_UPDATE("user:update"),
    USER_DELETE("user:delete"),

    EVENT_GET_ALL("event:getall"),
    EVENT_GET_BY_ID("event:getbyid"),
    EVENT_CREATE("event:create"),
    EVENT_UPDATE("event:update"),
    EVENT_DELETE("event:delete"),

    COMPETITION_GET_ALL("competition:getall"),
    COMPETITION_GET_BY_ID("competition:getbyid"),
    COMPETITION_CREATE("competition:create"),
    COMPETITION_UPDATE("competition:update"),
    COMPETITION_DELETE("competition:delete"),

    QUESTION_GET_ALL("question:getall"),
    QUESTION_GET_BY_ID("question:getbyid"),
    QUESTION_CREATE("question:create"),
    QUESTION_UPDATE("question:update"),
    QUESTION_DELETE("question:delete"),

    ATTEMPT_GET_ALL("attempt:getall"),
    ATTEMPT_GET_BY_ID("attempt:getbyid"),
    ATTEMPT_GET_BY_STUDENT("attempt:getbystudent"),
    ATTEMPT_GET_BY_COMPETITION("attempt:getbycompetition"),
    ATTEMPT_CREATE("attempt:create"),
    ATTEMPT_UPDATE("attempt:update"),
    ATTEMPT_DELETE("attempt:delete");



    private final String permission;

    Permissions(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
