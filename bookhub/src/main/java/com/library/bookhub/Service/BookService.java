package com.library.bookhub.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.library.bookhub.Domain.BookDto;
import com.library.bookhub.Domain.ResultDto;
import com.library.bookhub.Model.Book;
import com.library.bookhub.Repository.BookRepo;
import jakarta.transaction.Transactional;

@Service
public class BookService {

    @Autowired
    private BookRepo rep; 

    
    //Listing all books
    public List<Book> FindAllBooks()
    {
        return rep.findAll();
    }


    //Saving new entries to the database
    public void saveBook(BookDto book)
    {
        Book b = new Book();
        b.setBookName(book.getBookName());
        b.setDescription(book.getDescription());
        b.setGenre(book.getGenre());
        b.setAuthor(book.getAuthor());
        b.setType(book.getType());
        b.setEdition(book.getEdition());
        b.setUrl(book.getUrl());
        b.setImage(book.getImage());
        b.setIsDeleted(false);
        b.setCreatedAt(LocalDateTime.now());
        b.setCreatedBy(0);
        b.setModifiedAt(null);
        b.setModifiedBy(-1);
        rep.save(b);
    }


    //Display all non deleted books in front end
    public List<ResultDto> getAllBooksNotDeleted() {
        return rep.findAllBooksNotDeleted();
    }


    //Update certain fields
    public void updateBookField(int id, Map<String, Object> updates) {
        Book book = rep.findById(id);
    
        updates.forEach((key, value) -> {
            switch (key) {
                case "bookName":
                    book.setBookName((String) value);
                    break;
                case "description":
                    book.setDescription((String) value);
                    break;
                case "genre":
                    book.setGenre((String) value);
                    break;
                case "author":
                    book.setAuthor((String) value);
                    break;
                case "type":
                    book.setType((String) value);
                    break;
                case "edition":
                    book.setEdition((String) value);
                    break;
                case "url":
                    book.setUrl((String) value);
                    break;
                case "image":
                    book.setImage((String) value);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid field: " + key);
            }
        });
    
        book.setModifiedAt(LocalDateTime.now());
        book.setModifiedBy(0);
        rep.save(book);
    }

    //Soft delete on the books
    @Transactional
    public void softDeleteBookById(int id) {
        Book book = rep.findById(id);
        book.setIsDeleted(true);
        rep.save(book);
    
}

    //book by genre
    public List<ResultDto> getBooksByGenre(String genre) {
        return rep.findBooksByGenre(genre);
    }

    //find book by id
    public Book findBookById(int id) {
        return rep.findById(id);
    }

    //get all deleted books

    public List<ResultDto> getAllDeleted()
    {
        return rep.findAllBooksDeleted();
    }

    //restore deleted book  -basically change flag
    @Transactional
    public boolean restoreBook(int id) {
        Book book = rep.findById(id);
        if (book != null) {
            book.setIsDeleted(false); 
            rep.save(book);
            return true;
        } else {
            return false;
        }
    }

    public Book getLatestBook() {
        return rep.findTopByOrderByCreatedAtDesc();
    }


}
