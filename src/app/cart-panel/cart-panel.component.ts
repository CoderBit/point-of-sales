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
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
