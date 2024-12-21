package com.nzpmcp2.demo.models;

import org.springframework.data.annotation.Id;

import java.util.List;

public class UserView {

    @Id
    private String id;
    private String token;
    private String name;
    private String email;

    public UserView(String id, String token, String name, String email) {
        this.id = id;
        this.token = token;
        this.name = name;
        this.email = email;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
