package com.ecom.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.ecom.model.Category;
import com.ecom.repository.CategoryRepository;
import com.ecom.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Category saveCategory(Category category) {
		
		return categoryRepository.save(category);
	}

	@Override
	public List<Category> getAllCategory() {
		return categoryRepository.findAll();
	}

	@Override
	public Boolean existCategory(String name) {
		return categoryRepository.existsByName(name);
	}

	@Override
	public Boolean deleteCategory(Long id) {
		Category category = categoryRepository.findById(id).orElse(null);

		if (!ObjectUtils.isEmpty(category)) {
			categoryRepository.delete(category);
			return true;
		}
		return false;
	}

	@Override
	public Category getCategoryById(Long id) {
		Category category = categoryRepository.findById(id).orElse(null);
		return category;
	}

	@Override
	public List<Category> getAllActiveCategory() {
		List<Category> categories = categoryRepository.findByIsActiveTrue();
		return categories;
	}

	@Override
	public Page<Category> getAllCategorPagination(Integer pageNo, Integer pageSize) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		return categoryRepository.findAll(pageable);
	}
	public Category updateCategory(Long id, Category category) {
	    Category existingCategory = categoryRepository.findById(id).orElse(null);
	    if (existingCategory != null) {
	        // Mise à jour des propriétés de la catégorie
	        existingCategory.setName(category.getName());
	        existingCategory.setIsActive(category.getIsActive());
	        
	        // Mise à jour des images associées
	        existingCategory.setImageCategs(category.getImageCategs());
	        
	        // Mise à jour des produits associés
	        existingCategory.setProducts(category.getProducts());
	        
	        // Sauvegarde et retour de la catégorie mise à jour
	        return categoryRepository.save(existingCategory);
	    } else {
	        return null; // Retourner null si la catégorie n'existe pas
	    }
	}

	
	 
	 public List<Category> getCategoriesByGeneralId(Long generalCategoryId) {
	        return categoryRepository.findByCategGeneralId(generalCategoryId);
	    }

	@Override
	public String getCategoryGeneralNameByCategGeneralId(Long categGeneralId) {
		// TODO Auto-generated method stub
		return null;
	}
	
	    }


