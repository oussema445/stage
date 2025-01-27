import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { HomeComponent } from './home/home.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDetailComponent } from './product-detail-component/product-detail-component.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminProductListComponent } from './admin-product-list/admin-product-list.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { AdminListCategComponent } from './admin-list-categ/admin-list-categ.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { CodeVerificationComponent } from './code-verification/code-verification.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FooterComponent } from './footer/footer.component';
import { AppOrderComponent } from './app-order/app-order.component';
import { AppMyOrdersComponent } from './app-my-orders/app-my-orders.component';
import { OrderListAdminComponent } from './orders-list-admin/orders-list-admin.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AddCategGeneralComponent } from './add-categgeneral/add-categgeneral.component';


const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-update/:id', component: ProductUpdateComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'add-product', component: AddProductComponent },
  {path: 'register',component:RegisterComponent},
  { path: 'admin/products', component: AdminProductListComponent },
  {path: 'login',component:LoginComponent},
  {path: 'home' ,component:HomeComponent},
  {path: 'addcateg' ,component:AddCategoryComponent},
  {path: 'admin-categ' ,component:AdminListCategComponent},
  {path: 'register',component:RegisterComponent},
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'updatecateg/:id', component: UpdateCategoryComponent },
  { path: 'reset-code', component: CodeVerificationComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  {path : 'profil', component: UserProfileComponent},
  {path : 'add-admin', component :AddAdminComponent},
  {path :'list-user',component:UserListComponent},
  {path :'list-admin',component:AdminListComponent},
  {path :'dashboard',component:DashboardComponent},
  {path :'forbidden',component:ForbiddenComponent},
  {path :'footer',component:FooterComponent},
  {path :'app-order',component:AppOrderComponent},
  {path :'orders',component:AppMyOrdersComponent},
  {path:'list-ordres',component:OrderListAdminComponent},
{path:'order-detail/:orderId',component:OrderDetailsComponent},
{path: 'addcategGeneral' ,component:AddCategGeneralComponent},


      { path: '', redirectTo: '/product-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
