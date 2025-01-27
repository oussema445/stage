package com.ecom.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.Product;
import com.ecom.service.ProductService;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
	
@RequestMapping("/api/products")
public class ProductRestController {

    @Autowired
    private ProductService productService;

    // Endpoint to save a product
    @PostMapping("/save")
    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    // Endpoint to get all products
    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Endpoint to get a product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // Endpoint to update a product
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProduct(
            @PathVariable("id") Long id,
            @RequestBody Product product) {  // Le produit est envoyé en JSON

        product.setId(id); // Assurez-vous que l'ID dans l'URL et l'ID dans l'objet Product sont synchronisés

        try {
            // Appel de la méthode de mise à jour du produit avec l'objet
            Product updatedProduct = productService.updateProduct(product);
            return ResponseEntity.ok(updatedProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

    // Endpoint to delete a product by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    // Endpoint to get all active products by category
   

    // Endpoint to search products by title or category
    @GetMapping("/search")
    public List<Product> searchProduct(@RequestParam String ch) {
        return productService.searchProduct(ch);
    }

    // Endpoint to get all products with pagination
    @GetMapping("/pagination/all")
    public Page<Product> getAllProductsPagination(@RequestParam Integer pageNo, @RequestParam Integer pageSize) {
        return productService.getAllProductsPagination(pageNo, pageSize);
    }

    // Endpoint to search products with pagination
    @GetMapping("/pagination/search")
    public Page<Product> searchProductPagination(@RequestParam Integer pageNo, @RequestParam Integer pageSize, @RequestParam String ch) {
        return productService.searchProductPagination(pageNo, pageSize, ch);
    }

    

    // Endpoint to search active products with pagination
    @GetMapping("/pagination/search/active")
    public Page<Product> searchActiveProductPagination(@RequestParam Integer pageNo, @RequestParam Integer pageSize, @RequestParam String category, @RequestParam String ch) {
        return productService.searchActiveProductPagination(pageNo, pageSize, category, ch);
    }

    // Endpoint to archive a product (set it as inactive)
    @PutMapping("/archive/{id}")
    public ResponseEntity<String> archiveProduct(@PathVariable Long id) {
        boolean archived = productService.archiveProduct(id);
        if (archived) {
            return ResponseEntity.ok("Product archived successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found with id: " + id);
        }
    }
    @GetMapping("/category/{name}")
    public List<Product> getProductsByCategory(@PathVariable String name) {
        return productService.findByCategory(name); // La méthode doit récupérer les produits en fonction de la catégorie
    }
    @GetMapping("/productByRef")
    public Product getProductByRef(@RequestParam String ref) {
        return productService.getProductByRef(ref);
    }

}
