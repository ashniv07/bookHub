package com.library.bookhub.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.bookhub.Domain.BookDto;
import com.library.bookhub.Model.Book;
import com.library.bookhub.Repository.BookRepo;

@Service
public class BookService {

    @Autowired
    private BookRepo rep; 
    
    public List<Book> FindAllBooks()
    {
        return rep.findAll();
    }

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

    public List<Object[]> getallDeletedBooks(Boolean isdelete)
    {
        return rep.AllBooksNotDeleted(isdelete);
    }
    
}
