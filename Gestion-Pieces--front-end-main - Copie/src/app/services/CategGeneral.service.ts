// src/app/services/categgeneral.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategGeneral } from '../models/CategGeneral.model';

@Injectable({
  providedIn: 'root',
})
export class CategGeneralService {
  private apiUrl = 'http://localhost:8081/api/categgeneral'; // URL du backend

  constructor(private http: HttpClient) {}

  // Sauvegarder une catégorie générale
  saveCategGeneral(categGeneral: CategGeneral): Observable<CategGeneral> {
    return this.http.post<CategGeneral>(`${this.apiUrl}/save`, categGeneral);
  }

  // Récupérer toutes les catégories générales
  getAllCategGenerals(): Observable<CategGeneral[]> {
    return this.http.get<CategGeneral[]>(`${this.apiUrl}/all`);
  }
}
