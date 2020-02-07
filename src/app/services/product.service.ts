import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

export interface Product {
  name: string;
  price: string;
  category: string;
  description: string;
  image?: string;
  count?: number;
}

@Injectable({providedIn: 'root'})
export class ProductService {

  cart: Product[] = [];
  cartUpdated = new Subject();

  getProducts() {
    return [...this.cart];
  }

  getProductIndex(item: Product) {
    const index = this.cart.findIndex(el => el.name === item.name);
    return index;
  }

  addToCart(product: Product) {
    const index = this.getProductIndex(product);
    if (index === -1) {
      const newItem = {...product, count: 1};
      this.cart.push(newItem);
    } else {
      this.cart[index].count += 1;
    }
    this.cartUpdated.next([...this.cart]);
  }

  removeProduct(product: Product) {
    const index = this.getProductIndex(product);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.cartUpdated.next([...this.cart]);
    }
  }

  decreaseItem(product: Product) {
    const index = this.getProductIndex(product);
    if (index !== -1) {
      (this.cart[index].count - 1) !== 0 ? this.cart[index].count -= 1 : this.removeProduct(product);
      this.cartUpdated.next([...this.cart]);
    }
  }

  resetCart() {
    this.cart = [];
  }
}
