package com.nzpmcp2.demo.controllers;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@AllArgsConstructor(onConstructor = @__(@Autowired))

@EnableScheduling
@Controller
public class TimerController {

    private final SimpMessagingTemplate messagingTemplate;
    private final Logger logger = LoggerFactory.getLogger(TimerController.class);

    @Scheduled(fixedRate = 1000)
    @MessageMapping("/timer.update")
    @SendTo("/topic/timer")
    public void universalTimer() throws Exception {
        this.messagingTemplate.convertAndSend("/topic/timer", LocalDateTime.now());
    }
}
