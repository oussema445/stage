import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model'; // Import du modèle User

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  admins: User[] = [];
  currentUser: any;
  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadAdmins();
    this.currentUser = this.userService.getUser(); 
  }

  
  

  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'ADMIN';
  }

  loadAdmins(): void {
    this.userService.getUsersByRole('ADMIN').subscribe(
      (data) => {
        this.admins = data;
      },
      (error) => {
        this.toastr.error('Erreur lors du chargement des administrateurs');
      }
    );
  }
}
