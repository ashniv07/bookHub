package com.library.bookhub.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.library.bookhub.Domain.ResultDto;
import com.library.bookhub.Model.Book;
@Repository
public interface BookRepo extends JpaRepository<Book,Integer>{

<<<<<<< HEAD
    @Query("SELECT new com.library.bookhub.Domain.ResultDto(b.bookName, b.description, b.genre, b.author, b.type, b.edition, b.url, b.image) FROM Book b WHERE b.isDeleted = false")
    List<ResultDto> findAllBooksNotDeleted();

=======
        // @Query("select b.bookId, b.bookName, b.description, b.genre, b.author, b.type, b.edition, b.url, b.image from book b where b.isDeleted = :isDeleted")
        // List<Object[]> AllBooksNotDeleted(@Param("isDeleted") Boolean isDeleted);
>>>>>>> 8addbaac4345ae880423b386fd4783499aa9176b
    
}
