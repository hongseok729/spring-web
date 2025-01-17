package com.aivle.web.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapController {

    // 메인 맵 페이지
    @GetMapping("/index2.html")
    public String index2() {
        return "index2"; // src/main/resources/templates/index2.html
    }

    // 북구 상세 페이지
    @GetMapping("/region/buk.html")
    public String buk() {
        return "region/buk"; // src/main/resources/templates/region/buk.html
    }

    // 동구 상세 페이지
    @GetMapping("/region/dong.html")
    public String dong() {
        return "region/dong"; // src/main/resources/templates/region/dong.html
    }

    // 광산구 상세 페이지
    @GetMapping("/region/gwang.html")
    public String gwang() {
        return "region/gwang"; // src/main/resources/templates/region/gwang.html
    }

    // 남구 상세 페이지
    @GetMapping("/region/nam.html")
    public String nam() {
        return "region/nam"; // src/main/resources/templates/region/nam.html
    }

    // 서구 상세 페이지
    @GetMapping("/region/seo.html")
    public String seo() {
        return "region/seo"; // src/main/resources/templates/region/seo.html
    }
}
