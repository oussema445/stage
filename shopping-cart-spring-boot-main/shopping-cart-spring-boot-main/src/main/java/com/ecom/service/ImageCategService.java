package com.ecom.service;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.ImageCateg;
import com.ecom.model.Category;
import com.ecom.model.Image;

public interface ImageCategService {

    ImageCateg uploadImageCateg(MultipartFile file) throws IOException;
    ImageCateg getImageDetails(Long id) throws IOException;
    ResponseEntity<byte[]> getImageCateg(Long id) throws IOException;
    void deleteImageCateg(Long id);

    ImageCateg uploadImageCateg(MultipartFile file, Long CategId) throws IOException;
    List<ImageCateg> getImagesByCateg(Long CategId);
}
