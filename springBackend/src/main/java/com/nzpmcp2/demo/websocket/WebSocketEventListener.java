package com.nzpmcp2.demo.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private static final Logger logger = LoggerFactory.getLogger(WebSocketEventListener.class);

    @EventListener
    public void handleWebSocketConnectListener(final SessionConnectedEvent event) {
        logger.info("Someone connected to : {}", event);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(final SessionDisconnectEvent event) {
        logger.info("Someone disconnected from the server: {}", event);
    }
}
