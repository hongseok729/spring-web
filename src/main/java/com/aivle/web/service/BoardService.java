package com.aivle.web.service;

import com.aivle.web.domain.Board;
import com.aivle.web.dto.BoardRequestDto;
import com.aivle.web.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    // 게시물 저장
    @Transactional
    public void saveBoardWithFiles(BoardRequestDto requestDto, List<MultipartFile> files) {
        Board board = requestDto.toEntity();
        boardRepository.save(board);

        if (files != null && !files.isEmpty()) {
            files.forEach(file -> {
                // 파일 저장 로직 (예: 로컬 디렉토리나 S3에 저장)
                String filePath = saveFile(file);
                // 필요하면 파일 경로를 DB에 저장
                System.out.println("저장된 파일 경로: " + filePath);
            });
        }
    }

    // 파일 저장 로직 (예시)
    private String saveFile(MultipartFile file) {
        try {
            String uploadDir = "uploads/"; // 파일 저장 디렉토리
            String originalFilename = file.getOriginalFilename();
            String filePath = uploadDir + originalFilename;

            File dest = new File(filePath);
            dest.getParentFile().mkdirs(); // 상위 디렉토리 생성
            file.transferTo(dest);

            return filePath; // 저장된 파일 경로 반환
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 중 오류 발생: " + file.getOriginalFilename(), e);
        }
    }

    // 모든 게시물 조회
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    // 특정 게시물 조회
    public Board getBoardById(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Board not found with id: " + id));
    }
}
