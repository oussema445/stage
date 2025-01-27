import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.css']
})
export class CodeVerificationComponent implements OnInit {
  email: string = '';
  resetCode: string = '';
  message: string = '';

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  }

  verifyResetCode() {
    this.userService.verifyResetCode(this.email, this.resetCode).subscribe(
      (response) => {
        this.message = response.message;
        if (response.status === 200) {
          // Si le code est valide, rediriger vers la page de réinitialisation du mot de passe
          this.router.navigate(['/new-password'], { queryParams: { email: this.email } });
        }
      },
      (error) => {
        this.message = 'Code invalide.';
      }
    );
  }
}
