package com.nzpmcp2.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nzpmcp2.demo.models.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
}
