import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app-service.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup
  subscribe = new Subscription()

  constructor(
    private _fb: FormBuilder,
    private _service: AppService,
    private _cartService: CartService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cpassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return
    } else {
      const data = this.registerForm.getRawValue()
      const localCart = this._cartService.getCart()
      this.subscribe.add(
        this._service.userRegister(data, localCart).subscribe({
          next: (res: any) => {
            console.log('Done');
            localStorage.setItem('userToken', res.token)
            this._cartService.clearCart()
            this._router.navigate(['/home'])
          },
          error: (err) => {
            console.log(err.error.message);
            alert(err.error.message)
          }
        })
      )

    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
