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
    const totalItems = this.calculateTotalItems();
    const data = {
      totalItems,
      cart: [...this.cart]
    };
    this.cartUpdated.next(data);
  }

  removeProduct(product: Product) {
    const index = this.getProductIndex(product);
    if (index !== -1) {
      this.cart.splice(index, 1);
      const totalItems = this.calculateTotalItems();
      const data = {
        totalItems,
        cart: [...this.cart]
      };
      this.cartUpdated.next(data);
    }
  }

  decreaseItem(product: Product) {
    const index = this.getProductIndex(product);
    if (index !== -1) {
      (this.cart[index].count - 1) !== 0 ? this.cart[index].count -= 1 : this.removeProduct(product);
      const totalItems = this.calculateTotalItems();
      const data = {
        totalItems,
        cart: [...this.cart]
      };
      this.cartUpdated.next(data);
    }
  }

  calculateTotalItems() {
    let totalItems = 0;
    if (this.cart.length > 0) {
      totalItems = this.cart.reduce((acc, cur) => acc + cur.count, 0);
    }
    return totalItems;
  }

  resetCart() {
    this.cart = [];
  }
}
