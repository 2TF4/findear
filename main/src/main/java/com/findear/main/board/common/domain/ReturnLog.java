package com.findear.main.board.common.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "tbl_return_log")
public class ReturnLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "return_log_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "acquired_board_id")
    private AcquiredBoard acquiredBoard;

    private String email;

    private String phoneNumber;

    private LocalDateTime returnedAt;

    private LocalDateTime cancelAt;

    private String name;

}
