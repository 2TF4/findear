package com.findear.batch.police.controller;

import com.findear.batch.common.response.SuccessResponse;
import com.findear.batch.police.domain.PoliceAcquiredData;
import com.findear.batch.police.dto.SaveDataRequestDto;
import com.findear.batch.police.service.PoliceAcquiredDataService;
import lombok.RequiredArgsConstructor;
import org.elasticsearch.search.SearchHit;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/search")
@RestController
public class PoliceAcquiredDataController {

    private final PoliceAcquiredDataService policeAcquiredDataService;

    @GetMapping("/all")
    public ResponseEntity<?> searchAllDatas() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        List<PoliceAcquiredData> result = policeAcquiredDataService.searchAllDatas();

        return ResponseEntity.ok().body(new SuccessResponse(HttpStatus.OK.value(), "모든 데이터 조회 성공", result));
    }

    @GetMapping("")
    public ResponseEntity<?> search(@RequestParam("page") int page, @RequestParam("size") int size,
                                    @RequestParam("category") String category, @RequestParam("startDate") String startDate,
                                    @RequestParam("endDate") String endDate) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        List<PoliceAcquiredData> result = policeAcquiredDataService.search(page, size, category, startDate, endDate);

        return ResponseEntity.ok().body(new SuccessResponse(HttpStatus.OK.value(), "모든 데이터 조회 성공", result));
    }

    @GetMapping("/save")
    public ResponseEntity<?> searchByPage(@RequestParam("page") int page, @RequestParam("size") int size) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        Page<PoliceAcquiredData> result = policeAcquiredDataService.searchByPage(page, size);

        return ResponseEntity.ok().body(new SuccessResponse(HttpStatus.OK.value(), "모든 데이터 조회 성공", result));
    }

    @PostMapping("/save")
    public ResponseEntity<?> savePoliceData() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        policeAcquiredDataService.savePoliceData();

        return ResponseEntity.ok().body(new SuccessResponse(HttpStatus.OK.value(), "로스트112 데이터 저장 성공", null));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteDatas() {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));

        policeAcquiredDataService.deleteDatas();

        return ResponseEntity.ok().body(new SuccessResponse(HttpStatus.OK.value(), "모든 데이터 삭제 성공", null));

    }
}
