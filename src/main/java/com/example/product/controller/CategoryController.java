package com.example.product.controller;

import com.example.product.model.Category;
import com.example.product.service.my_interface.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;
    @GetMapping("/list")
    public ResponseEntity<List<Category>> listCategory(){
        List<Category> categories = categoryService.listAll();
        if (categories.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<Page<Category>> displayAllCategory(@PageableDefault(size = 3) Pageable pageable){
        Page<Category> categories = categoryService.findAll(pageable);
        if (categories.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public  ResponseEntity<Category> findById(@PathVariable("id") Long id){
        Category category = categoryService.findById(id);
        if (category!= null){
            return new ResponseEntity<>(category, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping("/save")
    public  ResponseEntity<Category> save(@RequestBody Category category){
        return new ResponseEntity<>(categoryService.save(category),HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Category> delete(@PathVariable("id") Long id){
        Category category = categoryService.findById(id);
        if (category!= null){
            categoryService.delete(id);
            return new ResponseEntity<>(category,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
