package com.ecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ecom.model.Image;

public interface ImageRepository extends JpaRepository<Image , Long> {

}
