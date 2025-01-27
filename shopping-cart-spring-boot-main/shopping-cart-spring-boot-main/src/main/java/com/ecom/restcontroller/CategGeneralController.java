package com.ecom.restcontroller;

import com.ecom.model.CategGeneral;
import com.ecom.service.CategGeneralService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/categgeneral")
public class CategGeneralController {

    @Autowired
    private CategGeneralService categGeneralService;

    // Récupérer toutes les catégories générales
    @GetMapping("/all")
    public List<CategGeneral> getAllCategGenerals() {
        return categGeneralService.getAllCategGenerals();
    }

    // Ajouter une nouvelle catégorie générale
    @PostMapping("/save")
    public CategGeneral saveCategGeneral(@RequestBody CategGeneral categGeneral) {
        return categGeneralService.saveCategGeneral(categGeneral);
    }
}
