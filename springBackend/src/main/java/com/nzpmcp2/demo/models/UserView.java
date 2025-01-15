package com.nzpmcp2.demo.models;

import com.nzpmcp2.demo.config.UserRoles;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter @Setter
@AllArgsConstructor
@ToString(exclude = {"events"})

public class UserView {

    private final String id;
    private final String name;
    private final String email;
    private final UserRoles role;
    private final List<String> events;
    private String token;
}
