import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app-service.service';
import { CartService } from '../../services/cart-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  subscribe = new Subscription();
  localStorageCartData: any;
  backendCartData: any;
  productIds!: string[];
  userToken: any;

  constructor(
    private _service: AppService,
    private _cartService: CartService,
    private _toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.userToken = localStorage.getItem('userToken')
    this.loadDetails()
  }

  loadDetails() {
    this.productIds = this._cartService.getCart().map(item => item.f_id)
    if (this.userToken) {
      this._service.getUserCart().subscribe({
        next: (res: any) => {
          this.backendCartData = res ? res.products : []
        },
        error: (err) => {
          console.log(err);
          this._toastr.error('Something went wrong', err.error.message)
        }
      })
    } else {
      this.subscribe.add(
        this._service.getProductDetails(this.productIds).subscribe({
          next: (res) => {
            this.localStorageCartData = res
          },
          error: (err) => {
            this._toastr.error('Something went wrong', err.error.message)
          }
        })
      )
    }

  }

  getQuantity(f_id: string) {
    const value = this._cartService.getCart().filter(pro => pro.f_id == f_id)
    return value[0]?.quantity
  }

  increment(f_id: string) {
    if (this.userToken) {
      this.subscribe.add(
        this._service.addToCard(f_id).subscribe({
          next: () => {
            console.log('Incremented');
            this.loadDetails()
          },
          error: (err) => {
            console.log(err);
          }
        })
      )
    } else {
      this._cartService.addQuantity(f_id)
    }
  }

  decrement(f_id: string) {
    if (this.userToken) {
      this.subscribe.add(
        this._service.decrementQuantity(f_id).subscribe({
          next: () => {
            console.log('Decremented');
            this.loadDetails()
          },
          error: (err) => {
            console.log(err);
          }
        })
      )
    } else {
      this._cartService.minusQuantity(f_id)
    }
  }

  removeFromCart(f_id: string) {
    if (this.userToken) {
      this.subscribe.add(
        this._service.removeFromCart(f_id).subscribe({
          next: () => {
            this._toastr.success('Product deleted Successfully');
            this.loadDetails()
            alert('Selected item deleted successfully..!')
          },
          error: (err) => {
            console.log(err);
          }
        })
      )
    } else {
      this._cartService.removeFromCart(f_id)
      this.loadDetails()
      alert('Selected item deleted successfully..!')
    }
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
