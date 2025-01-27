import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Image } from '../models/image.model';  // Assurez-vous que le chemin d'importation est correct

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'http://localhost:8081/api/products/image'; // URL de base pour votre backend

  constructor(private http: HttpClient) { }

  // Télécharger une image pour un produit spécifique
  uploadImageForProduct(productId: number, file: File): Observable<Image> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post<Image>(`${this.apiUrl}/uploadImageProduct/${productId}`, formData);
  }

  // Récupérer toutes les images d'un produit
  getImagesByProduct(productId: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.apiUrl}/getImagesByProduct/${productId}`);
  }

  // Récupérer une image par son ID
  getImageById(id: number): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/get/info/${id}`);
  }

  // Télécharger l'image par son ID
  loadImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/load/${id}`, { responseType: 'blob' });
  }

  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8081/api/products/image/delete/${id}`).pipe(
      catchError(error => {
        console.error("Erreur lors de la suppression de l'image", error);
        return throwError(error);
      })
    );
  }
  
  // Mettre à jour l'image (ex : remplacer une image existante)
  updateImage(file: File): Observable<Image> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.put<Image>(`${this.apiUrl}/update`, formData);
  }
}
