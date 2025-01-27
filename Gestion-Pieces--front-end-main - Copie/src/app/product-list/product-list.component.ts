import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { SearchService } from '../services/SearchService.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = []; // Liste des produits
  filteredProducts: Product[] = []; // Liste filtrée des produits
  categories: Category[] = []; // Liste des catégories
  selectedCategoryName: string = ''; // Nom de la catégorie sélectionnée
  isLoading: boolean = true; // Indicateur de chargement
  user: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private searchService: SearchService // Injection du SearchService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  
    // S'abonner aux changements dans SearchService
    this.searchService.searchTerm$.subscribe((term) => {
      this.searchService.searchType$.subscribe((type) => {
        if (type === 'name') {
          this.filterProductsByName(term); // Filtrer par nom
        } else if (type === 'ref') {
          this.filterProductsByRef(term); // Filtrer par référence
        }
      });
    });
  }
  filterProductsByName(searchTerm: string): void {
    searchTerm = searchTerm?.toLowerCase() ?? '';
    this.filteredProducts = this.products.filter((product) =>
      product.title?.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filtrer les produits par référence
  filterProductsByRef(ref: string): void {
    if (!ref) {
      this.filteredProducts = this.products; // Réinitialiser si aucun terme
      return;
    }
  
    this.productService.getProductByRef(ref).subscribe(
      (product) => {
        this.filteredProducts = product ? [product] : [];
      },
      (error) => {
        console.error('Erreur lors de la recherche par référence', error);
        this.filteredProducts = []; // Réinitialiser en cas d'erreur
      }
    );
  }
  

  // Charger les produits depuis le backend
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        this.filteredProducts = response; // Afficher tous les produits au départ
        this.isLoading = false; // Cacher le loader une fois les produits chargés
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
        this.isLoading = false; // Cacher le loader en cas d'erreur
      }
    );
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

  // Charger les produits depuis le backend en fonction de la catégorie
  loadProductByCategory(categoryName: string): void {
    this.productService.getProductsByCategory(categoryName).subscribe(
      (response: Product[]) => {
        this.products = response;
        this.filteredProducts = response; // Mettre à jour les produits filtrés
        this.isLoading = false; // Cacher le loader une fois les produits chargés
      },
      (error) => {
        console.error('Erreur lors du chargement des produits', error);
        this.isLoading = false; // Cacher le loader en cas d'erreur
      }
    );
  }

  // Filtrer les produits en fonction de la catégorie sélectionnée
  onCategorySelect(categoryName: string): void {
    this.selectedCategoryName = categoryName;
    this.loadProductByCategory(categoryName);
  }

  // Filtrer les produits en fonction du terme de recherche
  filterProducts(searchTerm: string): void {
    searchTerm = searchTerm?.toLowerCase() ?? ''; // S'assurer que searchTerm est en minuscule
  
    this.filteredProducts = this.products.filter(product => {
      const productName = product.title ? product.title.toLowerCase() : ''; // Vérifier si product.name existe avant d'appeler toLowerCase
      return productName.includes(searchTerm);
    });
  }

  // Voir les détails du produit
  onViewProduct(productId: number): void {
    this.router.navigate(['/product-detail', productId]);
  }

  // Obtenir l'URL complète de l'image du produit
  getProductImageUrl(imageName: string): string {
    return `http://localhost:8081/static/img/product_img/${imageName}`; // Mettre à jour en fonction du chemin de stockage des images
  }
  addToCart(product: Product): void {
    let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    this.message = this.user
      ? 'Produit ajouté au panier! Vous pouvez consulter votre panier.'
      : 'Produit ajouté au panier! Vous pouvez consulter votre panier.';
    this.showMessage(); // Afficher le message
  }
  showMessage(): void {
    this.isMessageVisible = true;
    setTimeout(() => {
      this.isMessageVisible = false;
      window.location.reload();

       // Masquer le message après 3 secondes
    }, 500);
  }
  message: string = '';
  isMessageVisible: boolean = false;
}
