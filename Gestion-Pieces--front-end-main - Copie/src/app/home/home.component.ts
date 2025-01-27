import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Image } from '../models/image.model';

import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = []; // Liste des produits
  filteredProducts: Product[] = []; // Liste filtrée des produits en fonction de la catégorie ou de la recherche
  categories: Category[] = []; // Liste des catégories
  searchTerm: string = ''; // Terme de recherche
  selectedCategoryId: number | null = null; // Catégorie sélectionnée pour le filtrage
  isLoading: boolean = true; // Indicateur de chargement
  selectedCategoryName: string = '';
  productImages: { [key: number]: Image[] } = {}; // Dictionnaire pour stocker les images de chaque produit

  constructor(
    private imageService: ImageService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  // Charger les produits depuis le backend
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        this.filteredProducts = response; // Initialement afficher tous les produits
        this.isLoading = false; // Cacher le loader après que les produits soient chargés
        this.loadProductImages(); // Charger les images des produits après avoir chargé les produits
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
        this.isLoading = false; // Cacher le loader en cas d'erreur
      }
    );
  }

  // Charger les images pour chaque produit
  loadProductImages(): void {
    this.products.forEach(product => {
      this.imageService.getImagesByProduct(product.id).subscribe(
        (images: Image[]) => {
          this.productImages[product.id] = images; // Stocker les images pour chaque produit
        },
        (error: any) => {
          console.error(`Erreur lors du chargement des images pour le produit ${product.id}`, error);
        }
      );
    });
  }

  // Charger les catégories depuis le backend
  loadCategories(): void {
    this.categoryService.getAllActiveCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories', error);
      }
    );
  }

  // Filtrer les produits en fonction de la catégorie
  loadProductByCategory(categoryName: string): void {
    this.productService.getProductsByCategory(categoryName).subscribe(
      (response: Product[]) => {
        this.products = response;
        this.filteredProducts = response;
        this.isLoading = false;
        this.loadProductImages(); // Recharger les images après le changement de catégorie
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
        this.isLoading = false;
      }
    );
  }

  // Sélectionner une catégorie
  onCategorySelect(categoryName: string): void {
    this.selectedCategoryName = categoryName;
    this.loadProductByCategory(categoryName);
  }

  // Méthode de recherche des produits par nom
  onSearch(): void {
    this.filterProducts(this.searchTerm);
  }

  // Filtrer les produits en fonction du terme de recherche
  filterProducts(searchTerm: string): void {
    searchTerm = searchTerm?.toLowerCase() ?? ''; // Assurez-vous que le terme de recherche est en minuscule
    this.filteredProducts = this.products.filter(product => {
      const productName = product.title ? product.title.toLowerCase() : '';
      return productName.includes(searchTerm);
    });
  }

  // Voir les détails d'un produit
  onViewProduct(productId: number): void {
    this.router.navigate(['/product-detail', productId]);
  }

  // Obtenir l'URL complète de l'image du produit
  getProductImageUrl(productId: number): string {
    const images = this.productImages[productId];
    if (images && images.length > 0) {
      return `http://localhost:8081/static/img/product_img/${images[0].image}`; // Retourner l'URL de la première image
    } else {
      return 'http://localhost:8081/static/img/default_image.png'; // Image par défaut si aucune image n'est disponible
    }
  }
}