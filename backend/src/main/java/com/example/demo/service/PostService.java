package com.example.demo.service;

import com.example.demo.dto.PostResponseDto;
import com.example.demo.dto.PostSaveRequestDto;
import com.example.demo.dto.PostUpdateRequestDto;

import java.util.List;

public interface PostService {
    List<PostResponseDto> findAll();
    PostResponseDto findById(Long id);
    Long save(PostSaveRequestDto requestDto);
    Long update(Long id, PostUpdateRequestDto requestDto);
    void delete(Long id);
}
