package com.library.bookhub.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("/findbooks")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> book = bookService.FindAllBooks();
        return ResponseEntity.ok(book);
    }

    @PostMapping("/savebooks")
     public ResponseEntity<String> registerUser(@RequestBody BookDto book){
     try {
        bookService.saveBook(book);
        return ResponseEntity.ok("success");
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

     }

<<<<<<< HEAD
     @GetMapping("/books-not-del")
public ResponseEntity<List<ResultDto>> getBooksNotDel() {
    List<ResultDto> books = bookService.getAllBooksNotDeleted();
    return ResponseEntity.ok(books);
}
=======
    //  @GetMapping("/books-not-del")
    //  public List<Object[]> getBooksNotDel(@RequestParam("year") Boolean year)

    //  {
    //     return bookService.FindAllBooks()
    //  }
>>>>>>> 8addbaac4345ae880423b386fd4783499aa9176b

    }
    
