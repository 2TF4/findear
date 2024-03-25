package com.findear.main.board.query.dto;

import com.findear.main.board.common.domain.Board;
import com.findear.main.board.common.domain.LostBoard;
import com.findear.main.member.command.dto.BriefMemberDto;
import com.findear.main.member.common.domain.Member;
import lombok.*;

import java.time.format.DateTimeFormatter;

@Getter @Setter
@NoArgsConstructor

public class LostBoardListResDto {
    private Long boardId;
    private String productName;
    private String category;
    private String thumbnailUrl;
    private String lostAt;
    private String suspiciousPlace;
    private BriefMemberDto writer;

    @Builder
    public LostBoardListResDto(Long boardId, String productName, String category, String thumbnailUrl, String lostAt, BriefMemberDto writer,
                               String suspiciousPlace) {
        this.boardId = boardId;
        this.productName = productName;
        this.category = category;
        this.thumbnailUrl = thumbnailUrl;
        this.lostAt = lostAt;
        this.suspiciousPlace = suspiciousPlace;
        this.writer = writer;
    }

    public static LostBoardListResDto of(LostBoard lostBoard) {
        Board board = lostBoard.getBoard();
        Member writer = board.getMember();

        return LostBoardListResDto.builder()
                .boardId(board.getId())
                .productName(board.getProductName())
                .category(board.getCategoryName())
                .thumbnailUrl(board.getThumbnailUrl())
                .lostAt(lostBoard.getLostAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
                .suspiciousPlace(lostBoard.getSuspiciousPlace())
                .writer(new BriefMemberDto(writer.getId(), writer.getPhoneNumber()))
                .build();
    }
}
