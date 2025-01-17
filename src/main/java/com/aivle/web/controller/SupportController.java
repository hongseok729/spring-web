package com.aivle.web.controller;



import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ResponseBody;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Controller
public class SupportController {

    @PostMapping("/submitSupport")
    @ResponseBody
    public ResponseEntity<?> handleSupportSubmit(
            @RequestParam("stationName") String stationName,
            @RequestParam(value = "photo", required = false) List<MultipartFile> photos,
            @RequestParam("message") String message) {
        try {
            if (photos != null && !photos.isEmpty()) {
                String uploadDir = "uploads/";
                File uploadDirFile = new File(uploadDir);
                if (!uploadDirFile.exists()) {
                    uploadDirFile.mkdirs();
                }
                for (MultipartFile photo : photos) {
                    if (!photo.isEmpty()) {
                        String filePath = uploadDir + photo.getOriginalFilename();
                        photo.transferTo(new File(filePath));
                    }
                }
            }

            // 메시지 처리 로직 (예: 데이터베이스에 저장)
            // 예시: 로그 출력
            System.out.println("지원 요청 받음:");
            System.out.println("관서명: " + stationName);
            System.out.println("메시지: " + message);

            return ResponseEntity.ok().body("{\"status\":\"success\"}");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"status\":\"error\"}");
        }
    }
}
