package com.ecom.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.ecom.model.Category;

public interface CategoryService {

	public Category saveCategory(Category category);

	public Boolean existCategory(String name);

	public List<Category> getAllCategory();

	public Boolean deleteCategory(Long id);

	public Category getCategoryById(Long id);

	public List<Category> getAllActiveCategory();

	public Page<Category> getAllCategorPagination(Integer pageNo,Integer pageSize);
	public Category updateCategory(Long id, Category category);
	 public String getCategoryGeneralNameByCategGeneralId(Long categGeneralId);
	 public List<Category> getCategoriesByGeneralId(Long generalCategoryId) ;
	   
	    }
