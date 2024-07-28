package com.library.bookhub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.bookhub.Model.ToDo;
import com.library.bookhub.Service.ToDoService;

@Controller
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:5173")

public class ToDoController {
    @Autowired
    private ToDoService toDoService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ToDo>> getTodos(@PathVariable int userId) {
        return ResponseEntity.ok(toDoService.getTodosForUser(userId)) ;
    }

    @PostMapping("/addtodo")
    public ResponseEntity<?> addTodo(@RequestBody ToDo todo) {
        return ResponseEntity.ok("success");
    }

    @PatchMapping("/done/{todoId}")
    public ResponseEntity<?> markAsDone(@PathVariable int todoId) {
        toDoService.markAsDone(todoId);
        return ResponseEntity.ok("marked as complete");
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<?> deleteTodo(@PathVariable int todoId) {
        toDoService.deleteTodo(todoId);
        return ResponseEntity.ok("deleted");
    }
}
