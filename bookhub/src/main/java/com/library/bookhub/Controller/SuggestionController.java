package com.library.bookhub.Controller;

import com.library.bookhub.Model.Suggestion;
import com.library.bookhub.Service.SuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/suggestions")
public class SuggestionController {

    @Autowired
    private SuggestionService suggestionService;

    @PostMapping("/add")
    public ResponseEntity<String> createSuggestion(@RequestBody Suggestion suggestion) {
        try {
            suggestionService.createSuggestion(suggestion);
            return new ResponseEntity<>("Thank you for your suggestion!", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to process suggestion.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Suggestion> getSuggestionById(@PathVariable int id) {
        Optional<Suggestion> suggestion = suggestionService.getSuggestionById(id);
        return suggestion.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                                                         .body(null));
    }

}