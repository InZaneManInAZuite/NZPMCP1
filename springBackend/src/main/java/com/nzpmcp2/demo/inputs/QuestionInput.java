package com.nzpmcp2.demo.inputs;

import java.util.List;

public record QuestionInput(String title, String newTitle, List<String> options, int correctChoiceIndex) { }
