import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  private cartKey = 'cart';

  constructor() { }

  getCart(): any[] {
    const cartData = localStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }

  addToCart(item: any) {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.f_id === item.f_id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  addQuantity(f_id: string) {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.f_id === f_id);
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += 1;
    }
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  minusQuantity(f_id: string) {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.f_id === f_id);
    if (existingItemIndex !== -1 && cart[existingItemIndex].quantity > 1) {
      cart[existingItemIndex].quantity -= 1;
    }
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  removeFromCart(f_id: string) {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(cartItem => cartItem.f_id === f_id);
    if(existingItemIndex !== -1) {
      cart.splice(existingItemIndex, 1);
    }
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  clearCart() {
    localStorage.removeItem(this.cartKey);
  }
}
