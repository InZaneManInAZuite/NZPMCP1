package com.nzpmcp2.demo.models;

import com.nzpmcp2.demo.controllers.TimerController;
import lombok.Getter;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;

@Getter @Setter

public class TimerThread  extends Thread {

    private LocalDateTime timeNow = LocalDateTime.now();

    private static final Logger logger = LoggerFactory.getLogger(TimerThread.class);

    private TimerController timerController;

    @Override
    public void run() {
        while (true) {
            LocalDateTime now = LocalDateTime.now();
            if (timeNow.getSecond() < now.getSecond() || timeNow.getMinute() != now.getMinute()) {
                logger.info(timeNow.toString());
                timeNow = now;
            }
        }
    }
}
