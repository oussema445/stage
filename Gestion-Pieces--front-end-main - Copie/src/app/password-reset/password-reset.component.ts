import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  email: string = '';
  message: string = '';

  constructor(private userService: UserService, private router: Router) {}

  sendResetCode() {
    this.userService.sendPasswordResetCode(this.email).subscribe(
      (response) => {
        this.message = response.message;
        if (response.status === 200) {
          // Si le code est envoyé, rediriger vers la page de vérification du code
          this.router.navigate(['/reset-code'], { queryParams: { email: this.email } });
        }
      },
      (error) => {
        this.message = 'Erreur lors de l\'envoi du code.';
      }
    );
  }
}
