package com.example.product.service.my_interface;

import com.example.product.model.Product;
import com.example.product.service.core.ICrudService;
import org.springframework.web.multipart.MultipartFile;

public interface IProductService extends ICrudService<Product> {
    Product saveProduct(MultipartFile file, Product product);
}
