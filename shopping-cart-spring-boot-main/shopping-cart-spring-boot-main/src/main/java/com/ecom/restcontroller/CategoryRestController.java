package com.ecom.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecom.model.Category;
import com.ecom.service.CategoryService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/category")
public class CategoryRestController {

    @Autowired
    private CategoryService categoryService;

    // Endpoint to save a category
    @PostMapping("/save")
    public Category saveCategory(@RequestBody Category category) {
        return categoryService.saveCategory(category);
    }

    // Endpoint to check if a category exists by name
    @GetMapping("/exists")
    public Boolean existCategory(@RequestParam String name) {
        return categoryService.existCategory(name);
    }

    // Endpoint to get all categories
    @GetMapping("/all")
    public List<Category> getAllCategory() {
        return categoryService.getAllCategory();
    }

    // Endpoint to delete a category by ID
    @DeleteMapping("/delete/{id}")
    public Boolean deleteCategory(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }

    // Endpoint to get a category by ID
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    // Endpoint to get all active categories
    @GetMapping("/active")
    public List<Category> getAllActiveCategory() {
        return categoryService.getAllActiveCategory();
    }

    // Endpoint to get paginated categories
    @GetMapping("/pagination")
    public Page<Category> getAllCategorPagination(@RequestParam Integer pageNo, @RequestParam Integer pageSize) {
        return categoryService.getAllCategorPagination(pageNo, pageSize);
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(id, category);
        if (updatedCategory != null) {
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Retourner 404 si la catégorie n'existe pas
        }
    }
    @GetMapping("/category-general-name/{categGeneralId}")
    public String getCategoryGeneralName(@PathVariable Long categGeneralId) {
        return categoryService.getCategoryGeneralNameByCategGeneralId(categGeneralId);
    }
    @GetMapping("/by-categ-general/{id}")
    public List<Category> getCategoriesByGeneralId(@PathVariable("id") Long generalCategoryId) {
        return categoryService.getCategoriesByGeneralId(generalCategoryId);
    }
   
}
 