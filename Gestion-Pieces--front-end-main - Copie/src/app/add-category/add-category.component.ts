import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ImageCategService } from '../services/image-categ.service';
import { Category } from '../models/category.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CategGeneralService } from '../services/CategGeneral.service';
import { CategGeneral } from '../models/CategGeneral.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category: Category = new Category(); // Initialisation d'une nouvelle catégorie
  selectedFile: File | null = null;  // Variable pour gérer le fichier image sélectionné
  categGenerals: any[] = [];
    currentUser: any;  // Utilisateur actuel, pour vérifier le rôle
    categoriesGeneral!:CategGeneral[]; // Liste des catégories générales
    selectedGeneralCategory!: Category;
  constructor(
    private categoryService: CategoryService,
    private imageCategService: ImageCategService,
    private userService: UserService,
    private categGeneralService:CategGeneralService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'utilisateur actuel
    this.currentUser = this.userService.getUser();
    this.loadCategGenerals();  // Charger les catégories générales pour la sélection
  }

  // Vérifie si l'utilisateur est un admin
  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'ADMIN';
  }

  // Méthode pour sélectionner un fichier image
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];  // Sélectionner le premier fichier
  }
  saveCategory(): void {
    // Lier la catégorie générale sélectionnée à la nouvelle catégorie
    this.category.categGeneral = this.selectedGeneralCategory;
  
    // Sauvegarder la catégorie
    this.categoryService.saveCategory(this.category).subscribe({
      next: (savedCategory) => {
        console.log('Catégorie ajoutée avec succès :', savedCategory);
  
        // Si une image a été sélectionnée, l'uploader
        if (this.selectedFile) {
          this.imageCategService.uploadImage(this.selectedFile, savedCategory.id).subscribe({
            next: (data) => {
              console.log('Image uploadée avec succès :', data);
            },
            error: (err) => {
              console.error('Erreur lors de l\'upload de l\'image :', err);
            }
          });
        }
  
        // Rediriger vers la liste des catégories
        this.router.navigate(['/admin-categ']);
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de la catégorie :', err);
      }
    });
  }
  

  // Charger les catégories générales (parent) pour la sélection dans le formulaire
// Charger toutes les catégories générales
loadCategGenerals(): void {
  this.categGeneralService.getAllCategGenerals().subscribe({
    next: (data) => {
      console.log('Catégories générales récupérées :', data); // Debug
      this.categoriesGeneral = data; // Stocker les catégories générales dans la bonne variable
    },
    error: (err) => {
      console.error('Erreur lors de la récupération des catégories générales :', err);
    }
  });
}

}
