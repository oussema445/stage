package com.ecom.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.Image;
import com.ecom.service.ImageService;
import com.ecom.service.ProductService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/imageCateg")
@CrossOrigin(origins = "*")
public class ImageCategRestController {

    @Autowired
    private ImageService imageService;

    @Autowired
    private ProductService productService;

    // Upload image for a product
    @PostMapping("/upload")
    public Image uploadImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uploadImage(file);
    }

    // Upload image for a specific product (by product ID)
    @PostMapping("/uploadImageProduct/{productId}")
    public Image uploadImageForProduct(@RequestParam("image") MultipartFile file,
                                       @PathVariable("productId") Long productId) throws IOException {
        return imageService.uploadImageProduct(file, productId);
    }

    // Get all images for a specific product
    @GetMapping("/getImagesByProduct/{productId}")
    public List<Image> getImagesByProduct(@PathVariable("productId") Long productId) throws IOException {
        return imageService.getImagesByProduct(productId);
    }

    // Get image details by image ID
    @GetMapping("/get/info/{id}")
    public Image getImageDetails(@PathVariable("id") Long id) throws IOException {
        return imageService.getImageDetails(id);
    }

    // Load image by image ID
    @GetMapping("/load/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") Long id) throws IOException {
        return imageService.getImage(id);
    }

    // Delete image by image ID
    @DeleteMapping("/delete/{id}")
    public void deleteImage(@PathVariable("id") Long id) {
        imageService.deleteImage(id);
    }

    // Update image (for example, replacing an existing image)
    @PutMapping("/update")
    public Image updateImage(@RequestParam("image") MultipartFile file) throws IOException {
        return imageService.uploadImage(file);
    }
}
