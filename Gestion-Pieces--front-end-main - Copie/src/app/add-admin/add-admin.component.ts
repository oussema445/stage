import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  };

  constructor(private userService: UserService, private toastr: ToastrService,private router :Router) {}
  currentUser: any;
  ngOnInit(): void {
    // Vous devez récupérer l'utilisateur actuel depuis votre service d'authentification
    this.currentUser = this.userService.getUser(); // Implémentez cette méthode pour récupérer l'utilisateur actuel
  }

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'ADMIN';
  }
  addAdmin(): void {
    if (this.user.password !== this.user.confirmPassword) {
      this.toastr.error('Les mots de passe ne correspondent pas.');
      return;
    }

    this.userService.saveAdmin(this.user).subscribe(
      response => {
        this.toastr.success('Administrateur ajouté avec succès!');
        this.resetForm();
      },
      error => {
        this.toastr.error('Erreur lors de l\'ajout de l\'administrateur.');
      }
    );
  }

  resetForm(): void {
    this.user = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobileNumber: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    };
  }
}
