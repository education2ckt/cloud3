package com.example.demo.controller;

import com.example.demo.dto.PostResponseDto;
import com.example.demo.dto.PostSaveRequestDto;
import com.example.demo.dto.PostUpdateRequestDto;
import com.example.demo.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {

    private final PostService postService;

    @GetMapping
    public List<PostResponseDto> getAllPosts() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    public PostResponseDto getPostById(@PathVariable Long id) {
        return postService.findById(id);
    }

    @PostMapping
    public Long createPost(@RequestBody PostSaveRequestDto requestDto) {
        return postService.save(requestDto);
    }

    @PutMapping("/{id}")
    public Long updatePost(@PathVariable Long id, @RequestBody PostUpdateRequestDto requestDto) {
        return postService.update(id, requestDto);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.delete(id);
    }
}
