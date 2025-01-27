package com.ecom.restcontroller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.ImageCateg;
import com.ecom.service.ImageCategService;

@RestController
@RequestMapping("/api/image-categ")
@CrossOrigin(origins = "http://localhost:4200")

public class ImageCategController {

    @Autowired
    private ImageCategService imageCategService;

    // Endpoint pour télécharger une image pour une catégorie spécifique
    @PostMapping("/upload/{categoryId}")
    public ResponseEntity<ImageCateg> uploadImageForCategory(@RequestParam("file") MultipartFile file,
                                                              @PathVariable Long categoryId) throws IOException {
        ImageCateg imageCateg = imageCategService.uploadImageCateg(file, categoryId);
        return ResponseEntity.ok(imageCateg);
    }

    // Endpoint pour obtenir les détails d'une image par ID
    @GetMapping("/{id}")
    public ResponseEntity<ImageCateg> getImageDetails(@PathVariable Long id) throws IOException {
        ImageCateg imageCateg = imageCategService.getImageDetails(id);
        return ResponseEntity.ok(imageCateg);
    }

    // Endpoint pour récupérer l'image en format binaire
    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) throws IOException {
        return imageCategService.getImageCateg(id);
    }

    // Endpoint pour supprimer une image par ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteImage(@PathVariable Long id) {
        imageCategService.deleteImageCateg(id);
        return ResponseEntity.noContent().build();
    }

    // Endpoint pour récupérer toutes les images associées à une catégorie
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ImageCateg>> getImagesByCategory(@PathVariable Long categoryId) {
        List<ImageCateg> images = imageCategService.getImagesByCateg(categoryId);
        return ResponseEntity.ok(images);
    }
}
