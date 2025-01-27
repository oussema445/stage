import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = {
    id: 0,
    name: '',
    mobileNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  };
  isEditMode: boolean = false;
  isPasswordChangeMode: boolean = false;  // Pour afficher/masquer le formulaire de modification du mot de passe

  oldPassword: string = '';  // Ancien mot de passe
  newPassword: string = '';  // Nouveau mot de passe
  confirmPassword: string = ''; 

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const storedUser = this.getUser();
    if (storedUser) {
      this.user = storedUser;
    } else {
      this.toastr.warning('Aucun utilisateur trouvé dans les données locales.');
    }
  }

  getUser(): User | null {
    const user = localStorage.getItem('currentUser');
    if (user && user !== 'undefined') {
      try {
        return JSON.parse(user) as User;
      } catch (error) {
        console.error('Erreur lors du parsing du user depuis localStorage', error);
        this.toastr.error('Erreur lors de la récupération des données utilisateur.');
        return null;
      }
    }
    return null;
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  togglePasswordChange(): void {
    this.isPasswordChangeMode = !this.isPasswordChangeMode;
  }

  updateProfile(): void {
    if (!this.user.name || !this.user.mobileNumber || !this.user.address || !this.user.city || !this.user.state || !this.user.pincode) {
      this.toastr.error('Tous les champs sont requis.');
      return;
    }

    this.userService.updateUser(this.user).subscribe(
      response => {
        console.log('Profile updated successfully', response);
        this.isEditMode = false;
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.toastr.success('Profil mis à jour avec succès');
        this.user = response;
      },
      error => {
        console.error('Error updating profile', error);
        this.toastr.error('Erreur lors de la mise à jour du profil.');
      }
    );
  }

  changePassword(): void {
    // Vérification de la correspondance entre les mots de passe
    if (this.newPassword !== this.confirmPassword) {
      this.toastr.error('Les mots de passe ne correspondent pas.');
      return;
    }
  
    // Vérifiez si l'ancien mot de passe est fourni
    if (!this.oldPassword) {
      this.toastr.error('Vous devez fournir votre ancien mot de passe.');
      return;
    }
  
    // Vérifiez si user.id est défini avant de procéder
    if (this.user.id === undefined) {
      this.toastr.error('L\'ID utilisateur est invalide.');
      return;
    }
  
    // Appel au service pour changer le mot de passe
    this.userService.updatePassword(this.user.id, this.oldPassword, this.newPassword).subscribe(
      response => {
        this.toastr.success('Mot de passe modifié avec succès');
        this.isPasswordChangeMode = false;
        this.newPassword = '';
        this.confirmPassword = '';
        this.oldPassword = '';  // Réinitialiser le champ de l'ancien mot de passe
      },
      error => {
        if (error.status === 401) {
          this.toastr.error('Ancien mot de passe incorrect');
        } else {
          this.toastr.error('Erreur lors de la modification du mot de passe');
        }
      }
    );
  }
  
  
   
}
