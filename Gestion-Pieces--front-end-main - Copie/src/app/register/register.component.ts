import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  successMessage: string | null = null;
  errorMessage: string | null = null;
  email: string = '';
  emailExists: boolean | null = null;
  constructor(private userService: UserService, private router: Router) {
    this.user.role = "USER";
  }

  checkEmailExists() {
    if (this.user.email) {
      this.userService.checkEmailExists(this.user.email).subscribe({
        next: (exists) => {
          this.emailExists = exists;
        },
        error: (err) => {
          console.error('Error checking email existence', err);
        }
      });
    }
  }
  


  register() {
    if (this.user.email) {
      // Email est défini, on peut utiliser sessionStorage
      sessionStorage.setItem('userEmail', this.user.email);
  
      this.userService.saveUser(this.user).subscribe(
        (response: User) => {
          this.successMessage = 'Inscription réussie ! Vérifiez votre email pour valider votre compte.';
          this.errorMessage = null;
          this.router.navigate(['/verify-email']);
        },
        (error) => {
          this.errorMessage = 'Erreur lors de l’inscription. Veuillez réessayer.';
          this.successMessage = null;
        }
      );
    } else {
      this.errorMessage = 'Email invalide. Veuillez vérifier.';
    }
  }

  
}
