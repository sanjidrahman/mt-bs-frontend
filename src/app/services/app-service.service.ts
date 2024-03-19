import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.developement';

@Injectable()
export class AppService {

  commonurl = environment.API_URL

  constructor(
    private _http: HttpClient,
  ) { }

  userRegister(userdata: any, localCartData: any) {
    return this._http.post(`${this.commonurl}/signup`, { userdata, localCartData })
  }
  userLogin(userdata: any, localCartData: any) {
    return this._http.post(`${this.commonurl}/signin`, { userdata, localCartData })
  }


  getCategories() {
    return this._http.get(`${this.commonurl}/categories`)
  }


  getProducts(filter?: any) {
    return this._http.get(`${this.commonurl}/products`, { params: { filter: filter } });
  }
  getProductDetails(p_ids: any) {
    return this._http.post(`${this.commonurl}/product-details`, p_ids)
  }


  addToCard(productId: string) {
    return this._http.post(`${this.commonurl}/cart`, { productId })
  }
  getUserCart() {
    return this._http.get(`${this.commonurl}/cart`)
  }
  decrementQuantity(productId: string) {
    return this._http.patch(`${this.commonurl}/cart`, { productId })
  }
  removeFromCart(productId: string) {
    return this._http.delete(`${this.commonurl}/cart`, { params: { productId } })
  }

}
