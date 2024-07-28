package com.library.bookhub.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.bookhub.Model.ToDo;

@Repository
public interface ToDoRepo extends JpaRepository<ToDo,Integer> {
     List<ToDo> findByUserId(int userId);
     Optional<ToDo> findById(int id);
}
