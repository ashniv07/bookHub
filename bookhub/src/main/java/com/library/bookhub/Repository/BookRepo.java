package com.library.bookhub.Repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.library.bookhub.Model.Book;

@Repository
public interface BookRepo extends JpaRepository<Book,Integer>{

        @Query("select b.bookId, b.bookName, b.description, b.genre, b.author, b.type, b.edition, b.url, b.image from book b where b.isDeleted = :isDeleted")
        List<Object[]> AllBooksNotDeleted(@Param("isDeleted") Boolean isDeleted);
    
}
