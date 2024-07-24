package com.library.bookhub.Controller;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

@GetMapping("/books-deleted")
public ResponseEntity<List<ResultDto>> getBooksDel() {
    List<ResultDto> books = bookService.getAllDeleted();
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

    //Mapping for per genre
    @GetMapping("/genre/{genre}")
    public ResponseEntity<List<ResultDto>> getBooksByGenre(@PathVariable String genre) {
        List<ResultDto> books = bookService.getBooksByGenre(genre);
        return ResponseEntity.ok(books);
    }

    //Mapping for get book by id
    @GetMapping("/book/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable int id) {
        try {
            Book book = bookService.findBookById(id);
            return ResponseEntity.ok(book);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //Restore the deleted book
    @PutMapping("/restore/{id}")
    public ResponseEntity<String> restoreBook(@PathVariable int id) {
        boolean isRestored = bookService.restoreBook(id);
        if (isRestored) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");
          }

    }
    }
    
    
 