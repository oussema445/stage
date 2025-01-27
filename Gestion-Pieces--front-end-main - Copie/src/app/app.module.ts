import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './services/product.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Ajoutez ceci
import { AppRoutingModule } from './app-routing.module'; // Importez le module de routage ici
import { CommonModule } from '@angular/common'; // Importez CommonModule ici
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDetailComponent } from './product-detail-component/product-detail-component.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { AdminListCategComponent } from './admin-list-categ/admin-list-categ.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CodeVerificationComponent } from './code-verification/code-verification.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ToastrModule } from 'ngx-toastr'; // Importer le module Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Nécessaire pour les animations toastr
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from "./footer/footer.component";
import { AppOrderComponent } from './app-order/app-order.component';
import { AppMyOrdersComponent } from './app-my-orders/app-my-orders.component';
import { OrderListAdminComponent } from './orders-list-admin/orders-list-admin.component';
import {  OrderDetailsComponent } from './order-details/order-details.component';
import { AddCategGeneralComponent } from './add-categgeneral/add-categgeneral.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductUpdateComponent,
    ProductDetailComponent,
    AddProductComponent,
    NavbarComponent,
    SearchFilterPipe,
    AdminProductListComponent,
    SidebarComponent,
    HomeComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AdminListCategComponent,
    RegisterComponent,
    VerifyEmailComponent,
    LoginComponent,
    PasswordResetComponent,
    NewPasswordComponent,
    CodeVerificationComponent,
    UserProfileComponent,
    AddAdminComponent,
    AdminListComponent,
    UserListComponent,
    DashboardComponent,
    ForbiddenComponent,
    CartComponent,
    AppOrderComponent,
    AppMyOrdersComponent,
    OrderListAdminComponent,
    OrderDetailsComponent,
    AddCategGeneralComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule, // Ajouter BrowserAnimationsModule
    ToastrModule.forRoot({
        positionClass: 'toast-bottom-center', // Position en bas et au centre
        closeButton: true, // Bouton de fermeture
        timeOut: 3000, // Durée d'affichage du toast
        preventDuplicates: true
    }),
    FooterComponent,
    ReactiveFormsModule,
],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
