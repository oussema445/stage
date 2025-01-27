import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageCategService } from '../services/image-categ.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { ImageCateg } from '../models/ImageCateg.model';
import { UserService } from '../services/user.service';
import { CategGeneral } from '../models/CategGeneral.model';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  category: Category = {
    id: 0,
    name: '',
    isActive: false,
    imageCategs: [],
    categGeneral: new CategGeneral
  };

  selectedFile: File | null = null;
  currentUser: any;

  constructor(
    private imageCategService: ImageCategService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private userService :UserService,
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.params['id'];
    this.getCategory(categoryId);
    this.currentUser = this.userService.getUser(); // Implémentez cette méthode pour récupérer l'utilisateur actuel

  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'ADMIN';
  }

  getCategory(id: number): void {
    this.categoryService.getCategoryById(id).subscribe(
      (category: Category) => {
        this.category = category;
      },
      error => {
        console.error('Erreur de récupération de la catégorie', error);
      }
    );
  }

  onSubmit(): void {
    this.categoryService.updateCategory(this.category.id,this.category,).subscribe(
      response => {
        console.log('Catégorie mise à jour', response);
      },
      error => {
        console.error('Erreur de mise à jour', error);
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadImage(file);
    }
  }

  uploadImage(file: File): void {
    if (this.selectedFile) {
      this.imageCategService.uploadImage(file, this.category.id).subscribe(
        (newImage: ImageCateg) => {
          this.category.imageCategs?.push(newImage);
          console.log('Image téléchargée avec succès', newImage);
        },
        error => {
          console.error('Erreur lors du téléchargement de l\'image', error);
        }
      );
    }
  }

  deleteImage(imageId: number): void {
    this.imageCategService.deleteImage(imageId).subscribe(
      () => {
        this.category.imageCategs = this.category.imageCategs?.filter((img: ImageCateg) => img.id !== imageId);
        console.log('Image supprimée avec succès');
      },
      error => {
        console.error('Erreur lors de la suppression de l\'image', error);
      }
    );
  }
  
}
