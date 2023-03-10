package com.example.product.controller;

import com.example.product.model.Product;
import com.example.product.service.my_interface.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin("*")
@RequestMapping("/products")
@PropertySource("classpath:application.properties")
public class ProductController {
    @Autowired
    private IProductService productService;
    @GetMapping
    public ResponseEntity<Page<Product>> displayAllProduct(@PageableDefault(size = 3)Pageable pageable){
        Page<Product> products = productService.findAll(pageable);
        if (products.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable("id")Long id){
        Product product = productService.findById(id);
        if (product!=null){
            return new ResponseEntity<>(product,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PostMapping("/save")
    public ResponseEntity<Product> save(@RequestPart(value = "file", required = false)MultipartFile file,
                                        @RequestPart("product")Product product){
        return new ResponseEntity<>(productService.saveProduct(file,product),HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Product> delete(@PathVariable("id")Long id){
        Product product = productService.findById(id);
        if (product!=null){
            productService.delete(id);
            return new ResponseEntity<>(product,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
