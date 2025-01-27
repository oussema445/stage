import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  user: any;  // User object with properties like 'role' and 'name'
  countCart: number = 0;  // Number of items in the cart
  categories: any[] = [];  // List of categories

  constructor(private router: Router) {}

  navigateTo(path: string, queryParams: any = {}): void {
    this.router.navigate([path], { queryParams });
  }

ngOnInit() {
    window.onscroll = () => {
      if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.body.classList.add('scrolled');  // Ajoute la classe scrolled
      } else {
        document.body.classList.remove('scrolled');  // Retire la classe scrolled
      }
    };
  }
}
