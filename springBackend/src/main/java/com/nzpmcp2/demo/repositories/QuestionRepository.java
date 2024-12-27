package com.nzpmcp2.demo.repositories;

import com.nzpmcp2.demo.models.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {

}
