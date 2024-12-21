package com.nzpmcp2.demo.models;

import org.springframework.data.annotation.Id;

import java.util.List;

public class UserView {

    @Id
    private String id;
    private String token;
    private String name;
    private String email;
    private List<String> events;

    public UserView(String id, String token, String name, String email, List<String> events) {
        this.id = id;
        this.token = token;
        this.name = name;
        this.email = email;
        this.events = events;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
