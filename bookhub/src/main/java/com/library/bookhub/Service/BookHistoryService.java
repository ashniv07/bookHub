package com.library.bookhub.Service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.library.bookhub.Model.Book;
import com.library.bookhub.Repository.BookHistoryRepo;

@Service
public class BookHistoryService {

    @Autowired
    private BookHistoryRepo bookHistoryRepo;


    public List<Book> getUniqueBooksForUser(int userId) {
        return bookHistoryRepo.findUniqueBooksByUserId(userId);
    }
}