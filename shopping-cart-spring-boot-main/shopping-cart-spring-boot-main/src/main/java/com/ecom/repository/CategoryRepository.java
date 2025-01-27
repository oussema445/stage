package com.ecom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

	public Boolean existsByName(String name);

	public List<Category> findByIsActiveTrue();
	 List<Category> findByCategGeneralId(Long categGeneralId);
}
