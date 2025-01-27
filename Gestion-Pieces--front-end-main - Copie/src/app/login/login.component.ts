import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  systemErrorMessage: string = '';

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    if (this.email && this.password) {
      this.userService.login(this.email, this.password).subscribe({
        next: (response) => {
          localStorage.setItem('user', JSON.stringify(response))
          this.userService.setUser(response);
          const userRole = response.role; // Assurez-vous que la réponse contient un champ 'role'
          
          if (userRole === 'ADMIN') {
            this.router.navigate(['/dashboard']).then(() => {
              // Forcer un rafraîchissement de la page
              window.location.reload();
            });
          } else {
            this.router.navigate(['/home']).then(() => {
              // Forcer un rafraîchissement de la page
              window.location.reload();
            });
          }
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
    } else {
      this.errorMessage = 'Vérifiez votre Mot de Passe ou E-mail';
    }
  }
}
