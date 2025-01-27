


import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  code: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private userService: UserService,private router:Router) {}
  ngOnInit(): void {
    // Récupérer l'email de l'utilisateur depuis sessionStorage
    const savedEmail = sessionStorage.getItem('userEmail');
    if (savedEmail) {
      this.email = savedEmail; // Initialiser l'email
    } else {
      this.errorMessage = 'Email non trouvé. Veuillez vous inscrire d\'abord.';
    }
  }

  verifyUser() {
    if (this.email && this.code) {
      this.userService.verifyUser(this.email, this.code).subscribe({
        next: (response) => {
          this.successMessage = response; // The response should be the success message
          this.errorMessage = null;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error:', error);
          this.errorMessage = 'Code de vérification invalide. Veuillez réessayer.';
          this.successMessage = null;
        }
      });
    } else {
      this.errorMessage = 'Veuillez entrer le code de vérification.';
      this.successMessage = null;
    }
  }
  
  
}
