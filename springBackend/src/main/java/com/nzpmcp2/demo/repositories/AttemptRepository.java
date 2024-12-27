package com.nzpmcp2.demo.repositories;

import com.nzpmcp2.demo.models.Attempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttemptRepository extends MongoRepository<Attempt, String> { }
