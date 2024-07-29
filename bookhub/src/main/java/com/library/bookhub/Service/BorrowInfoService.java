package com.library.bookhub.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.library.bookhub.Domain.PendingReqDto;
import com.library.bookhub.Domain.UserBooksDto;
import com.library.bookhub.Model.Book;
import com.library.bookhub.Model.BookHistory;
import com.library.bookhub.Model.BorrowInfo;
import com.library.bookhub.Model.User;
import com.library.bookhub.Repository.BookHistoryRepo;
import com.library.bookhub.Repository.BookRepo;
import com.library.bookhub.Repository.BorrowInfoRepo;
import com.library.bookhub.Repository.UserRepo;



@Service
public class BorrowInfoService {

    @Autowired
    private BorrowInfoRepo borrowInfoRepo;
    @Autowired
    private BookRepo bookRepo;
    @Autowired
    private UserRepo userRepo;
    @Autowired BookHistoryRepo bookHistoryRepo;


    public void requestBookBorrow(int bookId, int userId) {
        BorrowInfo borrowInfo = new BorrowInfo();
        borrowInfo.setBookId(bookId);
        borrowInfo.setUserId(userId);
        borrowInfo.setBorrowDate(LocalDateTime.now());
        borrowInfo.setAccessGranted(false); 
        borrowInfo.setFlag(false); 
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
    borrowInfo.setAccessCutDate(LocalDateTime.now().plusMinutes(1)); 
    borrowInfo.setFlag(true); 
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
    public boolean userHasAccess(int userId, int bookId) {
        Optional<BorrowInfo> optionalBorrowInfo = borrowInfoRepo.findByUserIdAndBookId(userId, bookId);
        BorrowInfo borrowInfo = optionalBorrowInfo.orElseThrow(() -> new RuntimeException("Borrow info not found"));

        return borrowInfo.isAccessGranted() && borrowInfo.isFlag();
    }




    @Scheduled(cron = "0 */2 * * * *")
    public void checkAndUpdateAccess() {
        List<BorrowInfo> borrowInfos = borrowInfoRepo.findAll();
        LocalDateTime now = LocalDateTime.now();

        for (BorrowInfo borrowInfo : borrowInfos) {
           if (borrowInfo.isAccessGranted() && borrowInfo.getAccessCutDate().isBefore(now)) {
            // Move to history
            BookHistory bookHistory = new BookHistory();
            bookHistory.setBookId(borrowInfo.getBookId());
            bookHistory.setUserId(borrowInfo.getUserId());
            bookHistory.setBorrowDate(borrowInfo.getBorrowDate());
            bookHistory.setReturnDate(now);

            // Save to book history
            bookHistoryRepo.save(bookHistory);

            // Delete from borrow info
            borrowInfoRepo.delete(borrowInfo);
        }
    }
}}