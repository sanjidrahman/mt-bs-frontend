import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app-service.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup
  subscribe = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _service: AppService,
    private _cartService: CartService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    } else {
      const data = this.loginForm.getRawValue()
      const localCart = this._cartService.getCart()
      this.subscribe.add(
        this._service.userLogin(data, localCart).subscribe({
          next: (res: any) => {
            console.log('Done');
            localStorage.setItem('userToken', res.token)
            this._cartService.clearCart()
            this._router.navigate(['/home'])
          },
          error: (err) => {
            console.log(err.error.message);
          }
        })
      )

    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
