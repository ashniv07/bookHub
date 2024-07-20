package com.library.bookhub.Service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.bookhub.Domain.PendingReqDto;
import com.library.bookhub.Model.BorrowInfo;
import com.library.bookhub.Repository.BookRepo;
import com.library.bookhub.Repository.BorrowInfoRepo;
import com.library.bookhub.Repository.UserRepo;



@Service
public class BorrowInfoService {

    @Autowired
    private BorrowInfoRepo borrowInfoRepo;
    // private BookRepo bookRepo;
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

    public void approveBorrowRequest(int borrowId) {
        BorrowInfo borrowInfo = borrowInfoRepo.findById(borrowId).orElseThrow(() -> new RuntimeException("Borrow request not found"));
        borrowInfo.setAccessGranted(true);
        borrowInfo.setAccessCutDate(LocalDateTime.now().plusDays(7)); 
        borrowInfo.setFlag(false); 
        borrowInfoRepo.save(borrowInfo);
    }

    public List<PendingReqDto> getPendingBorrowRequests() {
        return borrowInfoRepo.findPendingBorrowRequests();

   

}

}
