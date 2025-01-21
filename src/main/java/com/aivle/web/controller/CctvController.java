package com.aivle.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Controller
@RequestMapping("/cctv")
public class CctvController {

    // Google Map 기본 페이지 요청 처리
    @GetMapping("/google_map")
    public String googleMapPage() {
        return "cctv/google_map"; // templates/cctv/google_map.html
    }

    // 구별 페이지 요청 처리
    @GetMapping("/{region}")
    public String cctvPage(@PathVariable("region") String region) {
        switch (region) {
            case "buk":   // 북구
            case "gwang": // 광산구
            case "seo":   // 서구
            case "dong":  // 동구
            case "nam":   // 남구
                return "cctv/cctv_" + region; // templates/cctv/cctv_{region}.html
            default:
                return "redirect:/cctv/google_map"; // 잘못된 region 값에 대해 기본 페이지로 리디렉션
        }
    }

    // JSON 데이터 제공
    @GetMapping("/cctv_data_{region}.json")
    public ResponseEntity<?> getCctvData(@PathVariable("region") String region) {
        String filePath = "src/main/resources/static/cctv_data_" + region + ".json"; // JSON 파일 경로
        Path path = Paths.get(filePath);

        if (Files.exists(path)) {
            try {
                byte[] content = Files.readAllBytes(path); // 파일 읽기
                return ResponseEntity.ok()
                        .header("Content-Type", "application/json; charset=UTF-8")
                        .body(new String(content));
            } catch (IOException e) {
                // 파일 읽기 실패 처리
                return ResponseEntity.internalServerError().body("파일 읽기 오류: " + e.getMessage());
            }
        } else {
            // 파일이 없는 경우 404 반환
            return ResponseEntity.status(404).body("JSON 파일을 찾을 수 없습니다: " + filePath);
        }
    }
}
