import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();
  apiURL: string = 'http://localhost:8083/users';
  token!: string;
  public loggedUser: string | null = null;
  public isloggedIn: Boolean = false;
  public roles: string[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  login(user: User) {
    return this.http.post<any>(this.apiURL + '/login', user, {
      observe: 'response',
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError((error) => {
        console.error('Erreur lors de la tentative de connexion', error);
        return throwError(error);
      })
    );
  }

  

  logout() {
    this.loggedUser = null;
    this.roles = [];
    this.token = '';
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

 



  isAdmin(): Boolean {
    if (!this.roles) return false;
    return this.roles.indexOf('ADMIN') >= 0;
  }

  setLoggedUserFromLocalStorage(login: string) {
    this.loggedUser = login;
    this.isloggedIn = true;
  }

  
  registerUser(user :User){
    return this.http.post<User>(this.apiURL+'/register', user,
    {observe:'response'});
    }

    public regitredUser : User = new User();
setRegistredUser(user : User){
this.regitredUser=user;
}
getRegistredUser(){
return this.regitredUser;
}
validateEmail(code : string){
  return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
  }
}
