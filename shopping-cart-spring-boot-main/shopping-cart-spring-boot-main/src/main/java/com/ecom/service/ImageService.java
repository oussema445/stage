package com.ecom.service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.Image;

public interface ImageService {
    Image uploadImage(MultipartFile file) throws IOException;
    Image getImageDetails(Long id) throws IOException;
    ResponseEntity<byte[]> getImage(Long id) throws IOException;
    void deleteImage(Long id);

    Image uploadImageProduct(MultipartFile file, Long productId) throws IOException;
    List<Image> getImagesByProduct(Long productId);
}
