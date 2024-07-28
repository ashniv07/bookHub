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
import org.springframework.web.bind.annotation.RequestHeader;

import com.library.bookhub.Domain.BookDto;
import com.library.bookhub.Domain.ResultDto;
import com.library.bookhub.Model.Book;
import com.library.bookhub.Service.BookService;
import com.library.bookhub.util.JwtTokenUtil;

@Controller
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {


    @Autowired
    private BookService bookService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    //Mapping for finding books
    @GetMapping("/findbooks")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> book = bookService.FindAllBooks();
        return ResponseEntity.ok(book);
    }

    //Mapping for saving
    @PostMapping("/savebooks")
    public ResponseEntity<String> registerUser(@RequestHeader(value = "Authorization", required = false) String token ,@RequestBody BookDto book) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 0){
            bookService.saveBook(book);
            return ResponseEntity.ok("success");
    } 
    else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }
}
    catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }}

     

     //Mapping for getting all non deleted books
     @GetMapping("/books-not-del")
     public ResponseEntity<?> getBooksNotDel(@RequestHeader(value = "Authorization", required = false) String token) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 0){
                List<ResultDto> books = bookService.getAllBooksNotDeleted();
                return ResponseEntity.ok(books);
    } 
    else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }
}
    catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }}


@GetMapping("/books-deleted")
public ResponseEntity<?> getBooksDel(@RequestHeader(value = "Authorization", required = false) String token) {
    try {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if(jwtTokenUtil.getRoleFromToken(token) == 0){
            List<ResultDto> books = bookService.getAllDeleted();
            return ResponseEntity.ok(books);
    } 
    else
    {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
    }
}
    catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body("Failed to soft delete book: " + e.getMessage());
    }
}



//Mapping for update
@PatchMapping("/updatebook/{id}")

public ResponseEntity<String> updateBookField(@RequestHeader(value = "Authorization", required = false) String token ,@PathVariable int id, @RequestBody Map<String, Object> updates) {
    try {
        if (token == null || !token.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
        }
        token = token.substring(7);
        if (jwtTokenUtil.isTokenExpired(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
        }
        if(jwtTokenUtil.getRoleFromToken(token) == 0){
            bookService.updateBookField(id, updates);
            return ResponseEntity.ok("Book updated successfully");
} 
else
    {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
    }
        
}    
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //Mapping for delete

    @DeleteMapping("/soft-delete/{id}")
    public ResponseEntity<String> softDeleteBook(@RequestHeader(value = "Authorization", required = false) String token ,@PathVariable int id) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 0){
            bookService.softDeleteBookById(id);
            return ResponseEntity.ok("Book soft deleted successfully");
        } 
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }
    }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to soft delete book: " + e.getMessage());
        }
    }

    //Mapping for per genre
    @GetMapping("/genre/{genre}")
    public ResponseEntity<?> getBooksByGenre(@RequestHeader(value = "Authorization", required = false) String token ,@PathVariable String genre) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 1){
                List<ResultDto> books = bookService.getBooksByGenre(genre);
                return ResponseEntity.ok(books);
        } 
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }
    }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to soft delete book: " + e.getMessage());
        }
    }


    //Mapping for get book by id
    @GetMapping("/book/{id}")
    public ResponseEntity<?> getBookById(@RequestHeader(value = "Authorization", required = false) String token ,@PathVariable int id) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 1){
                Book book = bookService.findBookById(id);
                return ResponseEntity.ok(book);
        } 
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }
    }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to soft delete book: " + e.getMessage());
        }
    }


    //Restore the deleted book
    @PutMapping("/restore/{id}")
    public ResponseEntity<?> restoreBook(@RequestHeader(value = "Authorization", required = false) String token ,@PathVariable int id) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 0){
                boolean isRestored = bookService.restoreBook(id);
                if (isRestored) {
                    return ResponseEntity.ok("success");
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Book not found");
                  }
        } 
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }
    }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to soft delete book: " + e.getMessage());
        }
    }


    @GetMapping("/book/latest")
    public ResponseEntity<?> getLatestBook(@RequestHeader(value = "Authorization", required = false) String token ) {
        try {
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token is missing or invalid");
            }
            token = token.substring(7);
            if (jwtTokenUtil.isTokenExpired(token)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token has expired. Please log in again.");
            }
            if(jwtTokenUtil.getRoleFromToken(token) == 1){
                Book latestBook = bookService.getLatestBook();
            return ResponseEntity.ok(latestBook);
        } 
        else
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Don't have permission to update book");
        }
    }
        catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Failed to get  book: " + e.getMessage());
        }
    }
   
    
    }
    
    
 