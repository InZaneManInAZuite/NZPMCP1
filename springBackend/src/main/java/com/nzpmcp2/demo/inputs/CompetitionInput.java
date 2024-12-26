package com.nzpmcp2.demo.inputs;

import java.util.List;

public record CompetitionInput(String title, String newTitle ,String[] questionIds, List<String> events) { }
