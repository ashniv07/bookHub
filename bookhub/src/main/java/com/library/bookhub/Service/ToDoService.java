package com.library.bookhub.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.bookhub.Model.ToDo;
import com.library.bookhub.Repository.ToDoRepo;

@Service
public class ToDoService {
    @Autowired
    private ToDoRepo toDoRepository;

    public List<ToDo> getTodosForUser(int userId) {
        return toDoRepository.findByUserId(userId);
    }

    public ToDo addTodo(ToDo todo) {
        todo.setCompleted(false);
        return toDoRepository.save(todo);
    }

    public void markAsDone(int todoId) {
        Optional<ToDo> optionalToDo = toDoRepository.findById(todoId);
        if (optionalToDo.isPresent()) {
            ToDo todo = optionalToDo.get();
            todo.setCompleted(true);  
            toDoRepository.save(todo);
        } else {
            throw new RuntimeException("ToDo item not found with id: " + todoId);
        }
    }

    
    public void deleteTodo(int id) {
        toDoRepository.deleteById(id);
    }
}