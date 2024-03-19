import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../services/app-service.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  subscribe = new Subscription()
  cartData!: any[]

  constructor(
    private _service: AppService,
  ) { }

  ngOnInit(): void {
    this.subscribe.add(
      this._service.getUserCart().subscribe({
        next: (res: any) => {
          this.cartData = res ? res.products : []
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  getGrandTotal(): number {
    let grandTotal = 0;
    for (const item of this.cartData) {
      grandTotal += item.totalPrice;
    }
    return grandTotal;
  }

  ngOnDestroy(): void {
    this.subscribe.unsubscribe()
  }

}
