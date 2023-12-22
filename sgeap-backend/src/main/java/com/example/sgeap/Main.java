package com.example.sgeap;

import io.mongock.runner.springboot.EnableMongock;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableMongock
public class Main {
	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}
}
