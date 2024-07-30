 
package com.library.bookhub.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.bookhub.Model.Suggestion;

@Repository
public interface SuggestionRepo extends JpaRepository<Suggestion,Integer>{
    
}

