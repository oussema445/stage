package com.ecom.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.Image;
import com.ecom.model.Product;
import com.ecom.repository.ImageRepository;
import com.ecom.repository.ProductRepository;
import com.ecom.service.ImageService;

@Transactional
@Service
public class ImageServiceImpl implements ImageService {
    
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public Image uploadImage(MultipartFile file) throws IOException {
        return imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(file.getBytes())
                .build());
    }

    @Override
    public Image getImageDetails(Long id) throws IOException {
        final Optional<Image> dbImage = imageRepository.findById(id);
        return Image.builder()
                .idImage(dbImage.get().getIdImage())
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(dbImage.get().getImage())
                .build();
    }

    @Override
    public ResponseEntity<byte[]> getImage(Long id) throws IOException {
        final Optional<Image> dbImage = imageRepository.findById(id);
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(dbImage.get().getImage());
    }

    @Override
    public void deleteImage(Long id) {
        imageRepository.deleteById(id);
    }

    @Override
    public Image uploadImageProduct(MultipartFile file, Long productId) throws IOException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product ID"));
        return imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(file.getBytes())
                .product(product)
                .build());
    }

    @Override
    public List<Image> getImagesByProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid product ID"));
        return product.getImages();
    }
}
