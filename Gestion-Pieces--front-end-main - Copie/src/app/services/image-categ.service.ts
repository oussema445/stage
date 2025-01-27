import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ImageCateg
}from '../models/ImageCateg.model'
// Define the ImageCateg model
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageCategService {
  private apiUrl = 'http://localhost:8081/api/image-categ';

  constructor(private http: HttpClient) {}

  // Upload image for a category
  uploadImage(file: File, categoryId: number): Observable<ImageCateg> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<ImageCateg>(`${this.apiUrl}/upload/${categoryId}`, formData);
  }

  // Get image details by ID
  getImageDetails(id: number): Observable<ImageCateg> {
    return this.http.get<ImageCateg>(`${this.apiUrl}/${id}`);
  }

  // Get image in binary format
  getImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/image/${id}`, { responseType: 'blob' });
  }

  // Delete an image by ID
  deleteImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Get all images for a specific category
  getImagesByCategory(categoryId: number): Observable<ImageCateg[]> {
    return this.http.get<ImageCateg[]>(`${this.apiUrl}/category/${categoryId}`);
  }
}
