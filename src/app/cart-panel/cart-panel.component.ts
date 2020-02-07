import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, Product } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss']
})
export class CartPanelComponent implements OnInit, OnDestroy {

  cartList = [];
  subtotal = 0.000;
  tax = 0.000;
  taxPercentage = '0';
  discount = 0.000;
  discountPercentage = '0';
  total = 0.000;
  private subscription: Subscription;

  constructor(private productSerive: ProductService) { }

  ngOnInit() {
    this.cartList = this.productSerive.getProducts();
    this.calculateSubtotal();
    this.subscription = this.productSerive.cartUpdated
      .subscribe(
        (cartItems: Product[]) => {
          this.cartList = [...cartItems];
          this.calculateSubtotal();
        }
      );
  }

  removeItem(product: Product) {
    this.productSerive.removeProduct(product);
  }

  increase(catrItem: Product) {
    this.productSerive.addToCart(catrItem);
  }

  decrease(catrItem: Product) {
    this.productSerive.decreaseItem(catrItem);
  }

  calculateSubtotal() {
    if (this.cartList.length > 0) {
      this.subtotal = this.cartList.reduce((acc, cur) => acc + (+cur.price * cur.count), 0);
      this.tax = this.cartList.length > 0 ? this.subtotal * (+this.taxPercentage / 100) : 0.000;
      this.discount = this.cartList.length > 0 ? this.subtotal * (+this.discountPercentage / 100) : 0.000;
      this.total = this.subtotal + this.tax + this.discount;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
