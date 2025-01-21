package com.aivle.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cctv")
public class CctvController {

    @GetMapping("/{region}")
    public String cctvPage(@PathVariable("region") String region) {
        switch (region) {
            case "buk":
            case "gwang":
            case "seo":
            case "dong":
            case "nam":
                return "cctv/cctv_" + region; // templates/cctv/cctv_{region}.html
            default:
                return "error/404"; // templates/error/404.html
        }
    }
}


