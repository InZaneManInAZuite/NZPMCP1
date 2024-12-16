package com.nzpmcp2.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nzpmcp2.demo.repositories.EventRepository;
import com.nzpmcp2.demo.repositories.UserRepository;

@Service
public class AttendeeService {

    @Autowired
    public EventRepository eventRepository;
    @Autowired
    public UserRepository userRepository;

    
}
