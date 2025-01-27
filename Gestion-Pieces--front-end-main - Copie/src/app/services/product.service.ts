import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';  // Assurez-vous d'importer votre modèle de produit ici
import { Page } from '../models/page.model'; // Pour la pagination
import { AuthService } from './auth.service'; // Importation pour la gestion du token


const httpOptions = {headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8081/api/products';  // Changez l'URL si nécessaire

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    
    return new HttpHeaders( "Authorization");
  }
  private formatDateToISO(date: Date | string | null): string | null {
    if (!date) return null;
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0];}

  // Sauvegarder un produit
  saveProduct(product: Product): Observable<Product> {
    product.archivedAt = this.formatDateToISO(product.archivedAt);
    return this.http.post<Product>(`${this.apiUrl}/save`, product, { headers: this.getAuthHeaders() });
  }

  // Obtenir tous les produits
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/all`, { headers: this.getAuthHeaders() });
  }

  // Supprimer un produit par ID
  deleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }

  // Obtenir un produit par ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // Mettre à jour un produit
  updateProduct(id:number,product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${id}`, product);  // Mettre à jour sans JWT
  }
  

  // Rechercher des produits
  searchProduct(ch: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/search?ch=${ch}`, { headers: this.getAuthHeaders() });
  }

  // Autres méthodes avec pagination et gestion spécifique des produits actifs
  getAllActiveProducts(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/active?category=${category}`, { headers: this.getAuthHeaders() });
  }

  getAllActiveProductPagination(pageNo: number, pageSize: number, category: string): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(
      `${this.apiUrl}/pagination/active?pageNo=${pageNo}&pageSize=${pageSize}&category=${category}`, 
      { headers: this.getAuthHeaders() }
    );
  }

  searchProductPagination(pageNo: number, pageSize: number, ch: string): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(
      `${this.apiUrl}/pagination/search?pageNo=${pageNo}&pageSize=${pageSize}&ch=${ch}`, 
      { headers: this.getAuthHeaders() }
    );
  }

  getAllProductsPagination(pageNo: number, pageSize: number): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(
      `${this.apiUrl}/pagination/all?pageNo=${pageNo}&pageSize=${pageSize}`, 
      { headers: this.getAuthHeaders() }
    );
  }

  searchActiveProductPagination(pageNo: number, pageSize: number, category: string, ch: string): Observable<Page<Product>> {
    return this.http.get<Page<Product>>(
      `${this.apiUrl}/pagination/search/active?pageNo=${pageNo}&pageSize=${pageSize}&category=${category}&ch=${ch}`, 
      { headers: this.getAuthHeaders() }
    );
  }

  archiveProduct(id: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/archive/${id}`, null, { headers: this.getAuthHeaders() });
  }

  // Upload d'image pour un produit
  uploadProductImage(file: File, filename: string, productId: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiUrl}/image/uploadImageProduct/${productId}`;
    return this.http.post(url, imageFormData, { headers: this.getAuthHeaders() });
  }

  supprimerImage(id : number) {
    const url = `${this.apiUrl}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
    }

    getProductsByCategory(category: String): Observable<Product[]> {
      return this.http.get<Product[]>(`${this.apiUrl}/category/${category}`);
    }


  
  
    // Recherche de produit par référence
    getProductByRef(ref: string): Observable<Product> {
      return this.http.get<Product>(`${this.apiUrl}/productByRef?ref=${ref}`);
    }
}
