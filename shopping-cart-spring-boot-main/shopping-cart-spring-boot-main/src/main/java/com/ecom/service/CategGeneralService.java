package com.ecom.service;

import com.ecom.model.CategGeneral;
import com.ecom.repository.CategGeneralRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategGeneralService {

    @Autowired
    private CategGeneralRepository categGeneralRepository;

    // Récupérer toutes les catégories générales
    public List<CategGeneral> getAllCategGenerals() {
        return categGeneralRepository.findAll();
    }

    // Sauvegarder une catégorie générale
    public CategGeneral saveCategGeneral(CategGeneral categGeneral) {
        return categGeneralRepository.save(categGeneral);
    }
}
