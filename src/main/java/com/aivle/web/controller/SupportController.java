package com.aivle.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Controller
public class SupportController {

    @PostMapping("/submitSupport")
    @ResponseBody
    public ResponseEntity<?> handleSupportSubmit(
            @RequestParam("stationName") String stationName,
            @RequestParam(value = "photo", required = false) List<MultipartFile> photos,
            @RequestParam("message") String message) {
        try {
            String uploadDir = "C:/uploads/"; // 절대 경로로 설정
            File uploadDirFile = new File(uploadDir);
            if (!uploadDirFile.exists()) {
                uploadDirFile.mkdirs(); // 업로드 디렉토리가 없으면 생성
            }

            if (photos != null && !photos.isEmpty()) {
                for (MultipartFile photo : photos) {
                    if (!photo.isEmpty()) {
                        // 고유 파일 이름 생성 (UUID 사용)
                        String originalFilename = photo.getOriginalFilename();
                        String sanitizedFilename = sanitizeFileName(originalFilename);
                        String uniqueFilename = UUID.randomUUID() + "_" + sanitizedFilename;

                        // 파일 저장 경로 생성
                        String filePath = uploadDir + uniqueFilename;

                        // 파일 저장
                        photo.transferTo(new File(filePath));

                        // 로그 출력
                        System.out.println("업로드된 파일: " + filePath);
                    }
                }
            }

            // 메시지 처리 로직 (예: 데이터베이스에 저장)
            System.out.println("지원 요청 받음:");
            System.out.println("관서명: " + stationName);
            System.out.println("메시지: " + message);

            return ResponseEntity.ok().body("{\"status\":\"success\"}");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"status\":\"error\",\"message\":\"파일 업로드 실패: " + e.getMessage() + "\"}");
        }
    }

    // 파일 이름 유효성 검사 및 정리
    private String sanitizeFileName(String filename) {
        if (filename == null) {
            return "default.png";
        }
        return filename.replaceAll("[^a-zA-Z0-9\\.\\-_]", "_"); // 특수 문자 제거
    }
}
