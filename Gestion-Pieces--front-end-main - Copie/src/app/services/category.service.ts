


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
    apiURL: string = 'http://localhost:8081/api/category';

  constructor(private http: HttpClient) {}

  getAllActiveCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiURL}/active`);  }


    saveCategory(category: Category): Observable<Category> {
      return this.http.post<Category>(`${this.apiURL}/save`, category);
    }

     deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/delete/${id}`);
  }
  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiURL}/update/${id}`, category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiURL}/${id}`);
  }
  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiURL}/all`);  }

    getSubCategories(parentId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiURL}/${parentId}/subcategories`);
    }
    getCategoryGeneralNameById(categGeneralId: string): Observable<string> {
      return this.http.get(`${this.apiURL}/category-general-name/${categGeneralId}`, { responseType: 'text' });
    }
    getCategoriesByGeneralId(categGeneralId: number): Observable<Category[]> {
      return this.http.get<Category[]>(`${this.apiURL}/by-categ-general/${categGeneralId}`);
    }
}

