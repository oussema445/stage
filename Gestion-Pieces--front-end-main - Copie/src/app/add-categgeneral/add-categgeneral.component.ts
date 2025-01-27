// src/app/components/add-categgeneral/add-categgeneral.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategGeneral } from '../models/CategGeneral.model';
import { CategGeneralService } from '../services/CategGeneral.service';

@Component({
  selector: 'app-add-categgeneral',
  templateUrl: './add-categgeneral.component.html',
  styleUrls: ['./add-categgeneral.component.css']
})
export class AddCategGeneralComponent {
  categGeneral: CategGeneral = new CategGeneral(); // Modèle vide

  constructor(
    private categGeneralService: CategGeneralService,
    private router: Router
  ) {}

  saveCategGeneral(): void {
    this.categGeneralService.saveCategGeneral(this.categGeneral).subscribe({
      next: (data) => {
        console.log('Catégorie générale ajoutée avec succès:', data);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la catégorie générale:', err);
      }
    });
  }
}
