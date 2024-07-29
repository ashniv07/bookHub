package com.library.bookhub.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.library.bookhub.Domain.PendingReqDto;
import com.library.bookhub.Domain.UserBooksDto;
import com.library.bookhub.Model.Book;
import com.library.bookhub.Model.BorrowInfo;

@Repository
public interface BorrowInfoRepo extends JpaRepository<BorrowInfo, Integer> {
    @Query("SELECT b FROM BorrowInfo b WHERE b.accessGranted = false AND b.flag = true")
    List<BorrowInfo> findPendingBorrowRequestsAll();

    @Query("SELECT new com.library.bookhub.Domain.PendingReqDto(bi.borrowId,b.bookName, u.userName,bi.borrowDate) " +
           "FROM BorrowInfo bi " +
           "JOIN Book b ON bi.bookId = b.bookId " +
           "JOIN User u ON bi.userId = u.userId " +
           "WHERE bi.flag = false")
    List<PendingReqDto> findPendingBorrowRequests();

    @Query("SELECT new com.library.bookhub.Domain.UserBooksDto(b.bookName, b.author, b.image, u.userName) " +
       "FROM BorrowInfo bi " +
       "JOIN Book b ON bi.bookId = b.bookId " +
       "JOIN User u ON bi.userId = u.userId " +
       "WHERE bi.userId = :userId AND bi.accessGranted = true")
    List<UserBooksDto> findBooksByUserId(int userId);

    Optional<BorrowInfo> findByUserIdAndBookId(int userId, int bookId);
    boolean existsByBookId(int bookId);
    Optional<BorrowInfo> findByBookId(int bookId);

   
}
