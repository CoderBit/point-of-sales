import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProductService, Product } from '../services/product.service';
import { Subscription, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss']
})
export class CartPanelComponent implements OnInit, OnDestroy, AfterViewInit {

  cartList: Product[] = [];
  subtotal = 0.000;
  tax = 0.000;
  taxPercentage = 'N/A';
  discount = 0.000;
  discountPercentage = 'N/A';
  total = 0.000;
  receiptDetails = null;
  totalItems = 0;
  private subscription: Subscription;

  @ViewChild('taxPercentageRef', {static: false}) taxPercentageRef: ElementRef;
  @ViewChild('discountPercentageRef', {static: false}) discountPercentageRef: ElementRef;

  constructor(private productSerive: ProductService) { }

  ngOnInit() {
    this.cartList = this.productSerive.getProducts();
    this.calculateSubtotal();
    this.subscription = this.productSerive.cartUpdated
      .subscribe(
        (cartItems: {totalItems: number, cart: Product[]}) => {
          this.cartList = [...cartItems.cart];
          this.totalItems = cartItems.totalItems;
          if (this.cartList.length === 0) {
            this.reset();
          }
          this.calculateSubtotal();
        }
      );
  }

  ngAfterViewInit() {
    this.updateTax();
    this.updateDiscount();
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

  private calculateSubtotal() {
    if (this.cartList.length > 0) {
      this.subtotal = this.cartList.reduce((acc, cur) => acc + (+cur.price * cur.count), 0);
      if (this.taxPercentage !== 'N/A') {
        this.tax = this.cartList.length > 0 ? this.subtotal * (+this.taxPercentage / 100) : 0.000;
      }
      if (this.discountPercentage !== 'N/A') {
        this.discount = this.cartList.length > 0 ? this.subtotal * (+this.discountPercentage / 100) : 0.000;
      }
      this.total = this.subtotal + this.tax + this.discount;
    }
  }

  private updateTax() {
    const input = (this.taxPercentageRef.nativeElement as HTMLInputElement);
    const result = fromEvent(input, 'keyup').pipe(debounceTime(700));
    result.subscribe(x => {
      const updatedTaxValue = (x.target as HTMLInputElement).value;
      this.tax = +updatedTaxValue;
      this.calculateSubtotal();
    });
  }

  private updateDiscount() {
    const input = (this.discountPercentageRef.nativeElement as HTMLInputElement);
    const result = fromEvent(input, 'keyup').pipe(debounceTime(700));
    result.subscribe(x => {
      const updatedDiscountValue = (x.target as HTMLInputElement).value;
      this.discount = +updatedDiscountValue;
      this.calculateSubtotal();
    });
  }

  reset() {
    this.productSerive.resetCart();
    this.cartList = [];
    this.subtotal = 0.000;
    this.tax = 0.000;
    this.taxPercentage = 'N/A';
    this.discount = 0.000;
    this.discountPercentage = 'N/A';
    this.total = 0.000;
    this.totalItems = 0;
  }

  formatNumber(num: number) {
    const numSplit = Math.abs(num).toFixed(3).split('.');
    let int = numSplit[0];
    if (int.length > 3) {
        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }
    const dec = numSplit[1];
    return int + '.' + dec;
  }

  onHandleClose() {
    this.receiptDetails = null;
    this.reset();
  }

  processSale() {
    this.receiptDetails = {
      items: this.cartList,
      tax: this.tax,
      discount: this.discount,
      total: this.total,
      count: this.totalItems
    };
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
