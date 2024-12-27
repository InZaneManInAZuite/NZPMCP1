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
    EVENT_DELETE("event:delete");


    private final String permission;

    Permissions(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
