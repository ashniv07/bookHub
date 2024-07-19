package com.library.bookhub.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.library.bookhub.Domain.ResultDto;
import com.library.bookhub.Model.Book;
@Repository
public interface BookRepo extends JpaRepository<Book,Integer>{

    @Query("SELECT new com.library.bookhub.Domain.ResultDto(b.bookName, b.description, b.genre, b.author, b.type, b.edition, b.url, b.image) FROM Book b WHERE b.isDeleted = false")
    List<ResultDto> findAllBooksNotDeleted();

    Book findById(int id);

    @Query("SELECT new com.library.bookhub.Domain.ResultDto(b.bookName, b.description, b.genre, b.author, b.type, b.edition, b.url, b.image) FROM Book b WHERE b.isDeleted = false AND b.genre = :genre")
    List<ResultDto> findBooksByGenre(@Param("genre") String genre);

    
}
