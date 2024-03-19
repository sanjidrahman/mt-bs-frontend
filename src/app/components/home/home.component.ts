import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app-service.service';
import { CartService } from '../../services/cart-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscribe = new Subscription()
  categories: any
  fruits: any
  userToken: any

  constructor(
    private _service: AppService,
    private _cartService: CartService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.subscribe.add(
      this._service.getCategories().subscribe({
        next: (res) => {
          this.categories = res
        },
        error: (err) => {
          console.log(err.error.message);
        }
      })
    )
    this.listAll('All')
    this.userToken = localStorage.getItem('userToken');
  }

  getCategory(category: string) {
    this.subscribe.add(
      this._service.getProducts(category).subscribe({
        next: (res) => {
          this.fruits = res
        },
        error: (err) => {
          this._toastr.error('Something went wrong', err.error.message);
        }
      })
    )
  }

  listAll(category: string) {
    this.subscribe.add(
      this._service.getProducts(category).subscribe({
        next: (res) => {
          this.fruits = res
        },
        error: (err) => {
          this._toastr.error('Something went wrong', err.error.message);
        }
      })
    )
  }

  addToCart(f_id: string, quantity: number, price: number) {
    if (this.userToken) {
      this.subscribe.add(
        this._service.addToCard(f_id).subscribe({
          next: (res) => {
            this._toastr.success('Item added to cart successfully', 'Success');
            alert('Item added to cart successfully')
          },
          error: (err) => {
            this._toastr.error('Something went wrong', err.error.message)
          }
        })
      )
    } else {
      const item = { f_id, quantity, price }
      this._cartService.addToCart(item)
      this._toastr.success('Item added to cart successfully', 'Success');
      alert('Item added to cart successfully')
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
