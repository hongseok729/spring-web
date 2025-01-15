package com.aivle.web.repository;

import com.aivle.web.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {

    @Query("SELECT b FROM Board b ORDER BY b.createdAt DESC")
    List<Board> findTopNByOrderByCreatedAtDesc(@Param("count") int count);
}
