package com.aivle.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class NoticeBoardController {

    @GetMapping("/notice_board/boards")
    public String getNoticeBoard() {
        return "notice_board/boards";
    }
}