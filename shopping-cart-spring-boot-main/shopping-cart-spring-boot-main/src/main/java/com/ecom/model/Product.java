package com.ecom.model;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500)
    private String title;

    @Column(length = 5000)
    private String description;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "category_id")
    private Category category;
private String ref;
    private Double price;

    private int stock;

    private String image; // Ce champ peut être conservé pour une image principale

    private int discount;
    
    private Double discountPrice;
    
    private Boolean isActive;
    
    
    private Boolean isArchived = false;
    // Indique si le produit est archivé
    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDateTime archivedAt;

    @OneToMany(mappedBy = "product") // Relation OneToMany avec Image
    private List<Image> images; // Liste des images associées à ce produit
}
