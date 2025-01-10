package com.nzpmcp2.demo;

import com.nzpmcp2.demo.models.TimerThread;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@RestController
public class DemoApplication {

	public static void main(String[] args) {
		TimerThread timer = new TimerThread();
		timer.isDaemon();
		timer.start();
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("api/*")
						.allowedOrigins("http://localhost:5173/*")
						.allowedOrigins("https://web.postman.co/*")
						.allowedMethods("GET", "POST", "PUT", "DELETE");

			}
		};
	}

}
