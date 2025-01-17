package com.aivle.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "index"; // index.html을 반환합니다.
    }

    @GetMapping("/index2")
    public String index2() {
        return "index2"; // templates/index2.html 반환
    }


}
