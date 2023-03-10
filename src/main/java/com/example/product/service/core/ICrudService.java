package com.example.product.service.core;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICrudService <E>{
    List<E> listAll();
    Page<E> findAll(Pageable pageable);
    E save(E e);
    void delete(Long id);
    E findById(Long id);
}
