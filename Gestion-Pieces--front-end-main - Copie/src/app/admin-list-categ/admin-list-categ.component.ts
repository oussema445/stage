import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-list-categ',
  templateUrl: './admin-list-categ.component.html',
  styleUrls: ['./admin-list-categ.component.css']
})
export class AdminListCategComponent implements OnInit {
  categories: Category[] = [];
  categGeneralNames: { [key: string]: string } = {}; // Dictionnaire pour stocker les noms des catégories générales

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private userService: UserService
  ) {}

  currentUser: any;

  ngOnInit(): void {
    this.getCategories();
    this.currentUser = this.userService.getUser();
  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'ADMIN';
  }

  getCategories(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (data) => {
        console.log('Données récupérées :', data);
        this.categories = data;
        // Charger les noms des catégories générales
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories', err);
      },
    });
  }
 

  

  
  
  

  // Editer une catégorie
  editCategory(id: number): void {
    this.router.navigate(['/updatecateg', id]); // Naviguer vers le composant d'édition
  }

  // Supprimer une catégorie
  deleteCategory(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.categories = this.categories.filter((category) => category.id !== id); // Supprimer de la liste
          console.log('Catégorie supprimée avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la catégorie', err);
        },
      });
    }
  }
}
