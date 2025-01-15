package com.aivle.web.dto;

import com.aivle.web.domain.Board;
import com.aivle.web.domain.Image;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageDto {

    private String imagePath;

    public Image toEntity(Board board) {
        return Image.builder()
                .imagePath(this.imagePath)
                .board(board)
                .build();
    }
}

