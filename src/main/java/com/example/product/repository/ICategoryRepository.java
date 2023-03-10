package com.example.product.repository;

import com.example.product.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface ICategoryRepository extends JpaRepository<Category,Long> {
    @Query(value = "select c from Category as  c where c.status = true")
    Page<Category> displayAllCategory(Pageable pageable);
    @Modifying
    @Query(value = "UPDATE Category as c set c.status = false where c.id = :id")
    void deleteCategory(@Param("id")Long id);
}
