package com.ecom.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecom.model.Category;
import com.ecom.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	
	List<Product> findByIsActiveTrue();

	Page<Product> findByIsActiveTrue(Pageable pageable);

	@Query("SELECT p FROM Product p WHERE p.category.name = :categoryName")
	List<Product> findByCategory(@Param("categoryName") String categoryName);
	 Product findByRef(String ref);
	List<Product> findByTitleContainingIgnoreCaseOrCategoryNameContainingIgnoreCase(String title, String categoryName);

	Page<Product> findByCategory(Pageable pageable, String category);

	Page<Product> findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(String ch, String ch2,
			Pageable pageable);

	Page<Product> findByisActiveTrueAndTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(String ch, String ch2,
			Pageable pageable);

	List<Product> findByTitle(String title);
}
