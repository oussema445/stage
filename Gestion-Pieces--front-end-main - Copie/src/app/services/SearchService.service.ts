import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchTerm = new BehaviorSubject<string>('');
  private searchType = new BehaviorSubject<string>('name'); // Par défaut, la recherche est par nom

  searchTerm$ = this.searchTerm.asObservable();
  searchType$ = this.searchType.asObservable();

  setSearchTerm(term: string): void {
    this.searchTerm.next(term);
  }

  setSearchType(type: string): void {
    this.searchType.next(type);
  }
}
