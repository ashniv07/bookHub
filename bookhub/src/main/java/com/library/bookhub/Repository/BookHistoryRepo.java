package com.library.bookhub.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.library.bookhub.Model.Book;
import com.library.bookhub.Model.BookHistory;

@Repository
public interface BookHistoryRepo extends JpaRepository<BookHistory, Integer> {

     @Query("SELECT DISTINCT b FROM BookHistory bh JOIN Book b ON bh.bookId = b.bookId WHERE bh.userId = :userId")
    List<Book> findUniqueBooksByUserId(@Param("userId") int userId);
}
