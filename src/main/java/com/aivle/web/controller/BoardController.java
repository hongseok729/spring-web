package com.aivle.web.controller;

import com.aivle.web.dto.BoardRequestDto;
import com.aivle.web.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
@RequestMapping("/board") // 기본 경로 설정
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    // 게시판 리스트 조회
    @GetMapping("/list")
    public String showBoardList(Model model) {
        model.addAttribute("boards", boardService.getAllBoards());
        return "board/list"; // list.html 렌더링
    }

    // 게시물 작성 폼
    @GetMapping("/detail")
    public String createBoardForm(Model model) {
        model.addAttribute("board", new BoardRequestDto());
        return "board/detail"; // detail.html 렌더링
    }

    // 게시물 저장
    @PostMapping("/save")
    public String saveBoard(
            @ModelAttribute BoardRequestDto requestDto,
            @RequestParam("files") List<MultipartFile> files) {
        boardService.saveBoardWithFiles(requestDto, files);
        return "redirect:/board/list";
    }
}
