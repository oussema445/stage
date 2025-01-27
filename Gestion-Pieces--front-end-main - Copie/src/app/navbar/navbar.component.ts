import { Component, HostListener, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service'; // Importation du service UserService
import { Category } from '../models/category.model';
import { Router } from '@angular/router'; // Pour la redirection après déconnexion
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/SearchService.service';
import { CategGeneralService } from '../services/CategGeneral.service';
import { FormsModule } from '@angular/forms';  // Ajouter cette ligne

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  categories: Category[] = []; // Liste des catégories
  searchTerm: string = ''; // Terme de recherche
  searchType: string = 'name';
  userName: string = ''; // Nom de l'utilisateur connecté
  isLoggedIn: boolean = false; // Vérifier si l'utilisateur est connecté
  items: any[] = []; // Produits dans le panier
  totalPrice: number = 0; // Prix total initialisé à 0
  message: string = '';
  categGenerals: any[] = [];
  constructor(
    private categoryService: CategoryService,
    private userService: UserService, // Injection du UserService
    private router: Router, // Pour rediriger après déconnexion
    private cartService: CartService,
    private searchService: SearchService, 
    private productService:ProductService,// Injection du SearchService
    private categGeneralService: CategGeneralService,
  ) {}

  ngOnInit(): void {
    this.loadCategGenerals();
    // Vérifier si l'utilisateur est connecté au démarrage
    this.checkUserLogin();
    this.loadCartItems();
    // Récupérer les catégories actives lors du chargement de la navbar
    this.categoryService.getAllActiveCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
    this.items = this.cartService.getItems(); // Récupérer les éléments du panier
    this.updateTotalPrice(); // Mettre à jour le prix total au chargement
    this.currentUser = this.userService.getUser();
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0); // Calculer le prix total
  }
  

  // Vérifier si l'utilisateur est connecté
  checkUserLogin(): void {
    const user = this.userService.getUser();
    if (user && user.name) {
      this.userName = user.name;
      this.isLoggedIn = true;
    } else {
      this.userName = '';
      this.isLoggedIn = false;
    }
  }
  

  // Méthode de déconnexion
  logout(): void {
    this.userService.logout();  // Appeler le service de déconnexion
    this.isLoggedIn = false;    // Définir l'état de connexion à faux
    this.userName = '';         // Effacer le nom d'utilisateur
    localStorage.removeItem('user');  // Effacer les données de l'utilisateur dans le localStorage
    this.router.navigate(['/login']);  // Rediriger vers la page de connexion
  }

  // Méthode pour gérer la sélection d'une catégorie
  onCategorySelect(categoryId: number): void {
    console.log(`Catégorie sélectionnée: ${categoryId}`);
    // Implémentez ici la logique pour filtrer les produits par catégorie si nécessaire
  }

  addToCart(product: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    // Vérifie si le produit existe déjà dans le panier
    const existingProduct = cart.find((item: any) => item.id === product.id);
  
    if (existingProduct) {
      existingProduct.quantity += 1;  // Si le produit existe déjà, on incrémente la quantité
    } else {
      product.quantity = 1;  // Initialise la quantité à 1 pour un produit ajouté
      cart.push(product);
    }
  
    // Sauvegarde le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  
    // Met à jour les items et le total dans l'interface
    this.items = cart;
    this.updateTotalPrice();
    
    // Rafraîchissement immédiat de l'interface sans recharger la page
    // Vous pouvez également ajouter un message de confirmation ici si nécessaire
    this.message = 'Produit ajouté au panier!';
  }
  
  
  
  
  loadCartItems(): void {
    // Recharger les éléments du panier depuis le localStorage
    this.items = JSON.parse(localStorage.getItem('cart') || '[]');
    this.updateTotalPrice(); // Recalculer le prix total
  }

  updateTotalPrice(): void {
    this.totalPrice = this.items.reduce((total, item) => {
      return total + (item.discountPrice || item.price) * item.quantity;
    }, 0);
  }
  

  clearCart(): void {
    localStorage.removeItem('cart'); // Supprimer tout le panier du localStorage
    this.items = []; // Réinitialiser la liste des produits
    this.updateTotalPrice(); // Réinitialiser le prix total
  }
  private getCartData() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
  

  removeItem(productId: number): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productIndex = cart.findIndex((item: any) => item.id === productId);
  
    if (productIndex > -1) {
      cart.splice(productIndex, 1); // Supprimer le produit
    }
  
    localStorage.setItem('cart', JSON.stringify(cart)); // Sauvegarder dans le localStorage
    this.items = cart; // Mettre à jour la liste des produits dans le panier
    this.updateTotalPrice(); // Mettre à jour le prix total
  }
  

  // Toggle pour ouvrir et fermer le panier
  isCartOpen = false;

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
    const cartDrawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('backdrop');

    if (this.isCartOpen) {
      cartDrawer?.classList.add('open');
      backdrop?.classList.add('show');
    } else {
      cartDrawer?.classList.remove('open');
      backdrop?.classList.remove('show');
    }
  }

  // Écouter les événements de défilement de la page
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const topContent = document.getElementById('topContent');
    if (window.pageYOffset === 0) {
      topContent?.classList.remove('scrolled');
    } else {
      topContent?.classList.add('scrolled');
    }
  }

  // Mise à jour du SearchService avec le terme de recherche
  onSearch(): void {
    if (this.searchTerm.length > 0) { // Rechercher après 3 caractères minimum
      this.searchService.setSearchType(this.searchType); // Définir le type de recherche
      this.searchService.setSearchTerm(this.searchTerm); // Définir le terme de recherche
    }
  }

  updateQuantity(item: any): void {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const product = cart.find((product: any) => product.id === item.id);
    
    if (product) {
      product.quantity = item.quantity; // Mettre à jour la quantité
    }
    
    localStorage.setItem('cart', JSON.stringify(cart)); // Mettre à jour le localStorage
    this.updateTotalPrice(); // Recalculer le total
  }
  placeOrder(): void {
    // Vérifier si l'utilisateur est connecté
    if (!this.isLoggedIn) {
      this.message = 'Veuillez vous connecter avant de passer une commande.';
      return;
    }
  
    const user = this.userService.getUser();
    const userId = user?.id;
  
    // Vérifier si l'utilisateur est trouvé
    if (!userId) {
      this.message = 'Utilisateur non trouvé. Veuillez vous reconnecter.';
      return;
    }
  
    // Récupérer les produits et leurs quantités depuis le localStorage ou autres sources
    const cartData = this.items; // `this.items` contient les produits avec leurs quantités
  
    // Vérifier si le panier est vide
    if (!cartData || cartData.length === 0) {
      this.message = 'Votre panier est vide.';
      return;
    }
  
    // Envoyer les données du panier au backend
    this.cartService.transferCartDataToBackend(cartData, userId).subscribe(
      (response) => {
        // Message de succès et navigation vers la page de commande
        this.message = 'Votre commande a été passée avec succès!';
        this.router.navigate(['/app-order']);
      },
      (error) => {
        // Gestion des erreurs
        this.message = 'Une erreur est survenue lors de la commande. Veuillez réessayer.';
        console.error('Erreur lors de la commande', error);
      }
    );
  }
  
  
  currentUser: any;

  // Vous devez récupérer l'utilisateur actuel depuis votre service d'authentification
  
  
  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'ADMIN';
  }
  loadCategGenerals(): void {
    this.categGeneralService.getAllCategGenerals().subscribe({
      next: (data) => {
        this.categGenerals = data;  // Stocker les catégories générales
        this.categGenerals.forEach((categGeneral) => {
          // Pour chaque catégorie générale, charger les catégories associées
          this.categoryService.getCategoriesByGeneralId(categGeneral.id).subscribe({
            next: (categories) => {
              categGeneral.categories = categories; // Lier les catégories à la catégorie générale
            },
            error: (err) => {
              console.error('Erreur lors du chargement des catégories :', err);
            }
          });
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories générales :', err);
      }
    });
  }
}
  
  
