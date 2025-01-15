package com.aivle.web.controller;

import com.aivle.web.domain.Board;
import com.aivle.web.service.BoardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping("/board/list")
    public String showBoardList(Model model) {
        // 모든 게시글 데이터를 Model에 추가
        model.addAttribute("boards", boardService.getAllBoards());
        return "board/list"; // list.html 템플릿 렌더링
    }
    @GetMapping("/new")
    public String createBoardForm(Model model) {
        // 새 글 작성을 위한 빈 Board 객체를 모델에 추가
        model.addAttribute("board", new Board());
        return "detail"; // detail.html 페이지로 이동
    }

//    @PostMapping("/save")
//    public String saveBoard(@ModelAttribute Board board) {
//        boardService.save(board); // 게시글 저장 서비스 호출
//        return "redirect:/boards"; // 저장 후 리스트 페이지로 리다이렉트
//    }


}
