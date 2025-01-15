package com.aivle.web.service;

import com.aivle.web.domain.Board;
import com.aivle.web.dto.BoardRequestDto;
import com.aivle.web.repository.BoardRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Transactional
    public Board saveBoard(BoardRequestDto dto) {
        return boardRepository.save(dto.toEntity());
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public Board getBoardById(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Board not found with id: " + id));
    }

    // 최신 게시글 가져오기 (추가된 메서드)
    public List<Board> getRecentBoards(int count) {
        return boardRepository.findTopNByOrderByCreatedAtDesc(count);
    }
}
