import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service'; // Assurez-vous d'avoir un service pour gérer l'authentification et les rôles

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    // Vous devez récupérer l'utilisateur actuel depuis votre service d'authentification
    this.currentUser = this.userService.getUser(); // Implémentez cette méthode pour récupérer l'utilisateur actuel
  }

  // Méthode pour vérifier si l'utilisateur est un admin
  isAdmin(): boolean {
    return this.currentUser && this.currentUser.role === 'ADMIN';
  }

  // Méthodes de navigation vers les différentes pages
  navigateToAddAdmin(): void {
    this.router.navigate(['/add-admin']);
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/add-product']);
  }

  navigateToAddCategory(): void {
    this.router.navigate(['/addcateg']);
  }

  navigateToListCategory(): void {
    this.router.navigate(['/admin-categ']);
  }

  navigateToListProduct(): void {
    this.router.navigate(['/admin/products']);
  }

  navigateToListAdmin(): void {
    this.router.navigate(['/list-admin']);
  }

  navigateToListUsers(): void {
    this.router.navigate(['/list-user']);
  }

  navigateToListOrders(): void {
    this.router.navigate(['/list-ordres']);
  }
}
