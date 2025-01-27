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

import com.ecom.model.ImageCateg;
import com.ecom.model.Category;
import com.ecom.repository.ImageCategRepository;
import com.ecom.repository.CategoryRepository;
import com.ecom.service.ImageCategService;

@Transactional
@Service
public class ImageCategServiceImpl implements ImageCategService {

    @Autowired
    private ImageCategRepository imageCategRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public ImageCateg uploadImageCateg(MultipartFile file, Long categoryId) throws IOException {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));
        
        // Save the image in the database and associate it with the category
        return imageCategRepository.save(ImageCateg.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .image(file.getBytes())
                .category(category) // Associate image with the category
                .build());
    }

    @Override
    public ImageCateg getImageDetails(Long id) throws IOException {
        final Optional<ImageCateg> dbImage = imageCategRepository.findById(id);
        return ImageCateg.builder()
                .id(dbImage.get().getId())
                .name(dbImage.get().getName())
                .type(dbImage.get().getType())
                .image(dbImage.get().getImage())
                .category(dbImage.get().getCategory()) // Also return category information
                .build();
    }

    @Override
    public ResponseEntity<byte[]> getImageCateg(Long id) throws IOException {
        final Optional<ImageCateg> dbImage = imageCategRepository.findById(id);
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(dbImage.get().getType()))
                .body(dbImage.get().getImage());
    }

    @Override
    public void deleteImageCateg(Long id) {
        imageCategRepository.deleteById(id);
    }

    @Override
    public List<ImageCateg> getImagesByCateg(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid category ID"));
        return category.getImageCategs(); // Retrieve images associated with the category
    }

	@Override
	public ImageCateg uploadImageCateg(MultipartFile file) throws IOException {
		// TODO Auto-generated method stub
		return null;
	}
}
