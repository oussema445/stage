import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { catchError, tap } from 'rxjs/operators'; // Assurez-vous que tap est importé correctement

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8081/api/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) { }

  // Sauvegarder l'utilisateur
  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/save`, user).pipe(
      catchError(this.handleError<User>('saveUser'))
    );
  }

  // Récupérer l'utilisateur par email
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email`, { params: { email } }).pipe(
      catchError(this.handleError<User>('getUserByEmail'))
    );
  }

  // Récupérer les utilisateurs par rôle
  getUsersByRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/role?role=${role}`);
  }

  // Mettre à jour le statut du compte
  updateAccountStatus(id: number, status: boolean): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/updateStatus`, null, { params: { id, status } }).pipe(
      catchError(this.handleError<boolean>('updateAccountStatus'))
    );
  }

  // Augmenter le nombre de tentatives échouées
  increaseFailedAttempt(user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/increaseFailedAttempt`, user).pipe(
      catchError(this.handleError<void>('increaseFailedAttempt'))
    );
  }

  // Verrouiller un compte utilisateur
  userAccountLock(user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/lockAccount`, user).pipe(
      catchError(this.handleError<void>('userAccountLock'))
    );
  }

  // Déverrouiller un compte après expiration du temps
  unlockAccountTimeExpired(user: User): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/unlockTimeExpired`, user).pipe(
      catchError(this.handleError<boolean>('unlockAccountTimeExpired', false))
    );
  }

  // Réinitialiser les tentatives de connexion échouées
  resetAttempt(userId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/resetAttempt`, null, { params: { userId } }).pipe(
      catchError(this.handleError<void>('resetAttempt'))
    );
  }

  // Mettre à jour le token de réinitialisation de mot de passe
  updateUserResetToken(email: string, resetToken: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/updateResetToken`, null, { params: { email, resetToken } }).pipe(
      catchError(this.handleError<void>('updateUserResetToken'))
    );
  }

  // Récupérer l'utilisateur par token
  getUserByToken(token: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/token`, { params: { token } }).pipe(
      catchError(this.handleError<User>('getUserByToken'))
    );
  }

  // Mise à jour de l'utilisateur
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update`, user).pipe(
      catchError(this.handleError<User>('updateUser'))
    );
  }

  // Mise à jour du profil utilisateur (incluant l'image)
  updateUserProfile(user: User, img: File): Observable<User> {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));
    formData.append('img', img);
    return this.http.put<User>(`${this.apiUrl}/updateProfile`, formData).pipe(
      catchError(this.handleError<User>('updateUserProfile'))
    );
  }

  // Sauvegarder un administrateur
  saveAdmin(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/saveAdmin`, user).pipe(
      catchError(this.handleError<User>('saveAdmin'))
    );
  }

  // Vérifier si l'email existe
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/existsEmail`, { params: { email } }).pipe(
      catchError(this.handleError<boolean>('checkEmailExists', false))
    );
  }

  // Vérifier l'utilisateur
  verifyUser(email: string, code: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/verify`, null, {
      params: { email, code },
      responseType: 'text' as 'json' // Type de réponse explicite
    }).pipe(
      catchError(this.handleError<string>('verifyUser', ''))
    );
  }

  // Connexion utilisateur
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password }).pipe(
        tap(user => {
            if (user) {
                this.setUser(user);  // Enregistre l'utilisateur si la connexion réussit
            }
        }),
        catchError((error) => {
            if (error.status === 401) {
                // Ajout de la gestion de l'erreur 401
                console.error('Login échoué : utilisateur ou mot de passe incorrect');
                return throwError(() => new Error('Login échoué : utilisateur ou mot de passe incorrect'));
            }
            return this.handleError<User>('login')(error);
        })
    );
}


  // Vérification de la connexion utilisateur
  isUserLoggedIn(): boolean {
    return this.currentUser !== null || localStorage.getItem('currentUser') !== null;
  }

  getUser(): User | null {
    const user = localStorage.getItem('currentUser');

    if (user && user !== 'undefined') {
        try {
            return JSON.parse(user);
        } catch (error) {
            console.error('Erreur lors du parsing du user depuis localStorage', error);
            return null;
        }
    }

    // Retourne null si la chaîne est 'undefined' ou si l'utilisateur n'existe pas
    return null;
}


  // Déconnexion
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  // Sauvegarder l'utilisateur dans le localStorage
  setUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Gestion des erreurs HTTP
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} échoué: ${error.message}`);
      return of(result as T);
    };
  }



  sendPasswordResetCode(email: string): Observable<any> {
    const body = { email };
    return this.http.post<any>(`${this.apiUrl}/sendPasswordResetCode`, body);
  }

  // Vérification du code de réinitialisation
  verifyResetCode(email: string, resetToken: string): Observable<any> {
    const body = { email, resetToken };
    return this.http.post<any>(`${this.apiUrl}/verifyResetCode`, body);
  }

  // Réinitialisation du mot de passe
  resetPassword(email: string, newPassword: string): Observable<any> {
    const body = { email, newPassword };
    return this.http.post<any>(`${this.apiUrl}/resetPassword`, body);
  }
  updatePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    const body = { userId, oldPassword, newPassword };
    return this.http.post<any>(`${this.apiUrl}/update-password`, body).pipe(
      catchError(this.handleError<any>('updatePassword'))
    );
  }

}
