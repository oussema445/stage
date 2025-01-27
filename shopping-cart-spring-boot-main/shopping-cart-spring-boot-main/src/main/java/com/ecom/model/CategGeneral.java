package com.ecom.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Data 
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class CategGeneral {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identifiant unique pour la catégorie générale

    private String name;
    public CategGeneral(Long id) {
        this.id = id;
    }// Nom de la catégorie générale
}
