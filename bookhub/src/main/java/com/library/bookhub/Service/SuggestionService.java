
package com.library.bookhub.Service;

import com.library.bookhub.Model.Suggestion;
import com.library.bookhub.Repository.SuggestionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SuggestionService {

    @Autowired
    private SuggestionRepo suggestionRepository;

    public Suggestion createSuggestion(Suggestion suggestion) {
        suggestion.setCreatedAt(LocalDateTime.now()); 
        return suggestionRepository.save(suggestion);
    }

    public List<Suggestion> getAllSuggestions() {
        return suggestionRepository.findAll();
    }

    public Optional<Suggestion> getSuggestionById(int id) {
        return suggestionRepository.findById(id);
    }

    public void deleteSuggestion(int id) {
        suggestionRepository.deleteById(id);
    }

  
}
