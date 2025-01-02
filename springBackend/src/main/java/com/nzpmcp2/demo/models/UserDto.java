package com.nzpmcp2.demo.models;

import com.nzpmcp2.demo.config.UserRoles;

public record UserDto(String name, String email, String password, UserRoles role) { }
