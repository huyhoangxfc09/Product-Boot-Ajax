package com.example.product.repository;

import com.example.product.model.Category;
import com.example.product.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface IProductRepository extends JpaRepository<Product, Long> {
    @Query(value = "select p from Product as p inner join Category as c " +
            "on p.category.id = c.id where p.status = true and  c.status = true ")
    Page<Product> displayProduct(Pageable pageable);
    @Modifying
    @Query(value = "UPDATE Product as p set p.status = false where p.id = :id")
    void deleteProduct(@Param("id") Long id);

}
