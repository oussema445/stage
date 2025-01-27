import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  email: string = '';
  newPassword: string = '';
  message: string = '';

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private router: Router  // Inject Router service
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  resetPassword() {
    this.userService.resetPassword(this.email, this.newPassword).subscribe(
      (response) => {
        this.message = response.message;
        // Navigate to login page after successful password reset
        this.router.navigate(['/login']);
      },
      (error) => {
        this.message = 'Échec de la réinitialisation du mot de passe.';
      }
    );
  }
}
