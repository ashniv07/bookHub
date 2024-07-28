package com.library.bookhub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.library.bookhub.Model.ToDo;
import com.library.bookhub.Service.ToDoService;
import com.library.bookhub.util.JwtTokenUtil;

@Controller
@RequestMapping("/todo")
@CrossOrigin(origins = "http://localhost:5173")
public class ToDoController {
    @Autowired
    private ToDoService toDoService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getTodos(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable int userId) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token) == 1) {
                return ResponseEntity.ok(toDoService.getTodosForUser(userId));
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to view todos");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to get todos: " + e.getMessage());
        }
    }

    @PostMapping("/addtodo")
    public ResponseEntity<?> addTodo(@RequestHeader(value = "Authorization", required = false) String token, @RequestBody ToDo todo) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token) == 1) {
                ToDo createdTodo = toDoService.addTodo(todo);
                return ResponseEntity.ok(createdTodo);
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to add todo");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to add todo: " + e.getMessage());
        }
    }

    @PatchMapping("/done/{todoId}")
    public ResponseEntity<?> markAsDone(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable int todoId) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token) == 1) {
                toDoService.markAsDone(todoId);
                return ResponseEntity.ok("Marked as complete");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update todo");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to mark todo as done: " + e.getMessage());
        }
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<?> deleteTodo(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable int todoId) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if (jwtTokenUtil.getRoleFromToken(token) == 1) {
                toDoService.deleteTodo(todoId);
                return ResponseEntity.ok("Deleted");
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to delete todo");
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to delete todo: " + e.getMessage());
        }
    }
}
