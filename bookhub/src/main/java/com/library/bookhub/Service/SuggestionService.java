
package com.library.bookhub.Service;

import com.library.bookhub.Domain.SuggestionDto;
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

    public void createSuggestion(SuggestionDto suggestion) {
        Suggestion su = new Suggestion();
        if (suggestion.getBookName() == null || suggestion.getBookName().isEmpty()) {
            throw new IllegalArgumentException("Book name cannot be null or empty");
        }
        su.setBookName(suggestion.getBookName());
        
        su.setCreatedAt(LocalDateTime.now());
        su.setAuthor(suggestion.getAuthor());
       
        suggestionRepository.save(su);
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
