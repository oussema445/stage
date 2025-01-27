import { Injectable } from '@angular/core';
import { Product } from '../models/product.model'; // Chemin à adapter selon votre projet
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];
  private apiUrl = 'http://localhost:8081/api/cart'; 
  message: string = '';  // Assurez-vous d'initialiser le message
  constructor(private http: HttpClient) { }

  // Ajouter un produit au panier dans le localStorage
  addToCart(product: Product): void {
    const cart = this.getItems();  // Récupérer le panier actuel depuis le localStorage
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      // Si le produit existe déjà, augmenter la quantité
      existingProduct.quantity += 1;
    } else {
      // Si le produit n'existe pas, on l'ajoute avec quantité 1
      product.quantity = 1;
      cart.push(product);
    }

    // Sauvegarder le panier modifié dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour les items locaux après ajout
    this.items = cart;
  }

  // Récupérer tous les articles du panier dans le localStorage
  getItems(): Product[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  // Vider le panier
  clearCart() {
    this.items = [];
    localStorage.removeItem('cart');
    return this.items;
  }

  // Retirer un article du panier
  removeItem(productId: number) {
    const cart = this.getItems();  // Récupérer les articles actuels du panier
    this.items = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.items));  // Sauvegarder le panier mis à jour
  }

  // Transférer les données du panier vers le backend
  transferCartDataToBackend(cartData: any[], userId: number): Observable<any> {
    const requests = cartData.map((product) => {
      // Construire l'URL avec les paramètres nécessaires
      const url = `${this.apiUrl}/save?userId=${userId}&productId=${product.id}&quantity=${product.quantity}`;

      // Retourner la requête HTTP POST
      return this.http.post(url, null);  // Pas besoin d'envoyer un corps dans la requête
    });

    // Exécuter toutes les requêtes en parallèle
    return forkJoin(requests);  // Retourner un Observable combinant toutes les requêtes
  }
}
