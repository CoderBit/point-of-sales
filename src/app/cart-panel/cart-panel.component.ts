import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, Product } from '../services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss']
})
export class CartPanelComponent implements OnInit, OnDestroy {

  cartList: Product[] = [];
  private subscription: Subscription;

  constructor(private productSerive: ProductService) { }

  ngOnInit() {
    this.cartList = this.productSerive.getProducts();
    this.subscription = this.productSerive.cartUpdated
      .subscribe(
        (cartItems: Product[]) => {
          this.cartList = cartItems;
        }
      );
  }

  removeItem(product: Product) {
    this.productSerive.removeProduct(product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
