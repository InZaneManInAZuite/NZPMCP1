package com.nzpmcp2.demo.repositories;

import com.nzpmcp2.demo.models.Competition;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetitionRepository extends MongoRepository<Competition, String> {

}
