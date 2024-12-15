package com.nzpmcp2.demo.controllers;

// import java dependencies
import java.util.ArrayList;
import java.util.List;

// import api dependencies
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import local dependencies
import com.nzpmcp2.demo.repositories.UserRepository;
import com.nzpmcp2.demo.models.User;



@CrossOrigin
@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    UserRepository userRepo;


    @GetMapping
    public ResponseEntity getAllUsers() {

        List<User> allUsers = userRepo.findAll();

        return ResponseEntity.ok(allUsers);
    }


}
