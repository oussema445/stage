package com.ecom.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.Product;

public interface ProductService {

    // Sauvegarder un produit
    public Product saveProduct(Product product);

    // Récupérer tous les produits
    public List<Product> getAllProducts();
    
    // Supprime un produit par son ID
    public void deleteProductById(Long id);
    
    // Supprimer un produit
    public void deleteProduct(Product p);
    
    // Récupérer un produit par son ID
    public Product getProductById(Long id);

    /// Met à jour un produit
    public Product updateProduct(Product p);

    
    public Product getProductByRef(String ref);
    // Récupérer tous les produits actifs
    public List<Product> getAllActiveProducts(String category);

    // Rechercher un produit par son titre ou catégorie
    public List<Product> searchProduct(String ch);

    // Pagination des produits actifs
    public Page<Product> getAllActiveProductPagination(Integer pageNo, Integer pageSize, String category);

    // Pagination de la recherche des produits
    public Page<Product> searchProductPagination(Integer pageNo, Integer pageSize, String ch);

    // Pagination de tous les produits
    public Page<Product> getAllProductsPagination(Integer pageNo, Integer pageSize);

    // Pagination des produits actifs avec recherche
    public Page<Product> searchActiveProductPagination(Integer pageNo, Integer pageSize, String category, String ch);

    // Archiver un produit (désactiver)
    public Boolean archiveProduct(Long id);
    
 // Recherche des produits par titre
    public List<Product> findByTitle(String title);

    // Recherche des produits par catégorie
    public List<Product> findByCategory(String  categoryName);
    
 // Récupère un produit par son ID
    public Product getProduct(Long id);
}
