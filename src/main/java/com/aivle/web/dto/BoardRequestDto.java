package com.aivle.web.dto;

import com.aivle.web.domain.Board;
import com.aivle.web.domain.Status;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardRequestDto {

    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Status status;

    private List<ImageDto> images = new ArrayList<>();

    public Board toEntity() {
        Board board = Board.builder()
                .title(this.title)
                .content(this.content)
                .createdAt(this.createdAt)
                .updatedAt(this.updatedAt)
                .status(this.status)
                .build();

        this.images.forEach(imageDto -> board.getImages().add(imageDto.toEntity(board)));
        return board;
    }
}

