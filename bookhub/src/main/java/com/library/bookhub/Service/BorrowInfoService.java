package com.library.bookhub.Service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.bookhub.Domain.PendingReqDto;
import com.library.bookhub.Domain.UserBooksDto;
import com.library.bookhub.Model.Book;
import com.library.bookhub.Model.BorrowInfo;
import com.library.bookhub.Repository.BookRepo;
import com.library.bookhub.Repository.BorrowInfoRepo;



@Service
public class BorrowInfoService {

    @Autowired
    private BorrowInfoRepo borrowInfoRepo;
    @Autowired
    private BookRepo bookRepo;
    // private UserRepo userRepo;


    public void requestBookBorrow(int bookId, int userId) {
        BorrowInfo borrowInfo = new BorrowInfo();
        borrowInfo.setBookId(bookId);
        borrowInfo.setUserId(userId);
        borrowInfo.setBorrowDate(LocalDateTime.now());
        borrowInfo.setAccessGranted(false); 
        borrowInfo.setFlag(true); 
        borrowInfoRepo.save(borrowInfo);
    }

    public List<BorrowInfo> getPendingBorrowRequestsAll() {
        return borrowInfoRepo.findPendingBorrowRequestsAll();
    }

    //to do borrow req
    // Service class method
public void approveBorrowRequest(int borrowId) {
    BorrowInfo borrowInfo = borrowInfoRepo.findById(borrowId).orElseThrow(() -> new RuntimeException("Borrow request not found"));
    
    borrowInfo.setAccessGranted(true);
    borrowInfo.setAccessCutDate(LocalDateTime.now().plusDays(7)); 
    borrowInfo.setFlag(false); 
    borrowInfoRepo.save(borrowInfo);
}

//to get url
public String getBookUrlByBorrowId(int borrowId) {
    BorrowInfo borrowInfo = borrowInfoRepo.findById(borrowId).orElseThrow(() -> new RuntimeException("Borrow request not found"));
    Book book = bookRepo.findById(borrowInfo.getBookId());
    return book.getUrl();
}

    
   

    public List<PendingReqDto> getPendingBorrowRequests() {
        return borrowInfoRepo.findPendingBorrowRequests();
    }

   //To get all details of single user with all their books
   public List<UserBooksDto> getAllBooksForUser(int userId) {
    return borrowInfoRepo.findBooksByUserId(userId);

}

//To check if book has access

}
