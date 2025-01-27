package com.ecom.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.Image;
import com.ecom.model.Product;
import com.ecom.repository.ImageRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private ImageRepository imageRepository;

    @Override
    public Product saveProduct(Product product) {
        // Sauvegarder le produit
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        // Récupérer tous les produits
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long id) {
        // Récupérer un produit par son ID
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public Product updateProduct(Product product) {
        // Mettre à jour le produit en utilisant le repository
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Product p) {
        // Supprimer le produit
        productRepository.delete(p);
    }

    @Override
    @Transactional
    public void deleteProductById(Long id) {
        // Récupérer le produit par son ID
        Product p = getProduct(id);

        // Supprimer toutes les images associées à ce produit
        List<Image> images = p.getImages();
        for (Image img : images) {
            imageRepository.delete(img);
        }

        // Supprimer le produit
        productRepository.deleteById(id);
    }

    @Override
    public List<Product> getAllActiveProducts(String category) {
        // Récupérer les produits actifs, filtrés par catégorie si nécessaire
        if (category == null || category.isEmpty()) {
            return productRepository.findByIsActiveTrue();
        } else {
            return productRepository.findByCategory(category);
        }
    }

    @Override
    public List<Product> searchProduct(String ch) {
        // Rechercher les produits par titre ou catégorie
        return productRepository.findByTitleContainingIgnoreCaseOrCategoryNameContainingIgnoreCase(ch, ch);
    }

    @Override
    public Page<Product> getAllProductsPagination(Integer pageNo, Integer pageSize) {
        // Pagination des produits
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return productRepository.findAll(pageable);
    }

    @Override
    public Page<Product> searchProductPagination(Integer pageNo, Integer pageSize, String ch) {
        // Recherche paginée des produits
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return productRepository.findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(ch, ch, pageable);
    }

    @Override
    public Page<Product> getAllActiveProductPagination(Integer pageNo, Integer pageSize, String category) {
        // Pagination des produits actifs
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        if (category == null || category.isEmpty()) {
            return productRepository.findByIsActiveTrue(pageable);
        } else {
            return productRepository.findByCategory(pageable, category);
        }
    }

    @Override
    public Page<Product> searchActiveProductPagination(Integer pageNo, Integer pageSize, String category, String ch) {
        // Recherche active des produits avec pagination
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        return productRepository.findByisActiveTrueAndTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(ch, ch, pageable);
    }

    @Override
    public Boolean archiveProduct(Long id) {
        // Archiver un produit (le rendre inactif)
        Product product = getProductById(id);
        if (product != null) {
            product.setIsActive(false);
            productRepository.save(product);
            return true;
        }
        return false;
    }

    @Override
    public List<Product> findByTitle(String title) {
        // Recherche les produits par titre
        return productRepository.findByTitle(title);
    }

    @Override
    public List<Product> findByCategory(String categoryName) {
        // Recherche les produits par catégorie
        return productRepository.findByCategory(categoryName);
    }

	  @Override
	    public Product getProduct(Long id) {
	        // Récupérer le produit par son ID
	        return productRepository.findById(id).orElse(null);
	    
	}
	  
	  public Product getProductByRef(String ref) {
	        return productRepository.findByRef(ref);
	    }
}
