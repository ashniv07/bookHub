package com.library.bookhub.Controller;

import com.library.bookhub.Domain.SuggestionDto;
import com.library.bookhub.Model.Suggestion;
import com.library.bookhub.Service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

@RequestMapping("/suggestions")
public class SuggestionController {

    @Autowired
    private SuggestionService suggestionService;

        @PostMapping("/add")
        public ResponseEntity<?> createSuggestion(@RequestBody SuggestionDto suggestion) {
            try {
                suggestionService.createSuggestion(suggestion);
                return new ResponseEntity<>("Thank you for your suggestion!", HttpStatus.CREATED);
            } catch (Exception e) {
                return new ResponseEntity<>("Failed to process suggestion.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    @GetMapping("/get")
    public ResponseEntity<List<Suggestion>> getAllSuggestions() {
        List<Suggestion> suggestion = suggestionService.getAllSuggestions();
        return ResponseEntity.ok(suggestion);
    }

}