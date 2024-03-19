import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { appGuards } from './guards/app-guards.guard';

const routes: Routes = [
  { path: '', title: 'Home', component: HomeComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'cart', title: 'Cart', component: CartComponent },
  { path: 'checkout', title: 'Checkout', component: CheckoutComponent, canActivate: [appGuards] },
  { path: 'signin', title: 'Signin', component: SigninComponent },
  { path: 'signup', title: 'Signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
