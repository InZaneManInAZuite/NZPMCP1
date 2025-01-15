package com.nzpmcp2.demo.repositories;

import com.nzpmcp2.demo.models.Attempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttemptRepository extends MongoRepository<Attempt, String> {

    List<Attempt> findByUserId(String userId);

    List<Attempt> findByEventId(String eventId);

    List<Attempt> findByCompetitionId(String competitionId);

    List<Attempt> findByEventIdAndUserId(String eventId, String userId);

    void deleteAllByEventId(String id);

    void deleteAllByUserId(String userId);

    void deleteAllByCompetitionId(String competitionId);
}
