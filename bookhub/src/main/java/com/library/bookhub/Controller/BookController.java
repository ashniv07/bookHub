package com.library.bookhub.Controller;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RequestParam;

import com.library.bookhub.Domain.BookDto;
import com.library.bookhub.Domain.ResultDto;
import com.library.bookhub.Model.Book;
import com.library.bookhub.Service.BookService;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {


    @Autowired
    private BookService bookService;

    //Mapping for finding books
    @GetMapping("/findbooks")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> book = bookService.FindAllBooks();
        return ResponseEntity.ok(book);
    }

    //Mapping for saving
    @PostMapping("/savebooks")
     public ResponseEntity<String> registerUser(@RequestBody BookDto book){
     try {
        bookService.saveBook(book);
        return ResponseEntity.ok("success");
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

     }

     //Mapping for getting all non deleted books
     @GetMapping("/books-not-del")
public ResponseEntity<List<ResultDto>> getBooksNotDel() {
    List<ResultDto> books = bookService.getAllBooksNotDeleted();
    return ResponseEntity.ok(books);
}

//Mapping for update
@PatchMapping("/updatebook/{id}")
    public ResponseEntity<String> updateBookField(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        try {
            bookService.updateBookField(id, updates);
            return ResponseEntity.ok("Book updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //Mapping for delete

    @DeleteMapping("soft-delete/{id}")
    public ResponseEntity<String> softDeleteBook(@PathVariable int id) {
        try {
            bookService.softDeleteBookById(id);
            return ResponseEntity.ok("Book soft deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to soft delete book: " + e.getMessage());
        }
    }

    }
    
