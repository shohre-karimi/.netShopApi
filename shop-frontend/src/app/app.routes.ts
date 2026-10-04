import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { Login } from './login/login';
import { Register } from './register/register';
import { ProductList } from './product-list/product-list';
import { ProductForm } from './product-form/product-form';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'products', component: ProductList, canActivate: [authGuard] },
  { path: 'products/new', component: ProductForm, canActivate: [authGuard] },
  { path: 'products/:id/edit', component: ProductForm, canActivate: [authGuard] },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products' },
];
