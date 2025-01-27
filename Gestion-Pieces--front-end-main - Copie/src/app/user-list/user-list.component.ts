import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model'; // Import du modèle User

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsersByRole('USER').subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.toastr.error('Erreur lors du chargement des utilisateurs');
      }
    );
  }
}
