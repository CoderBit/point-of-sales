import { Component, OnInit } from '@angular/core';
import products from '../../assets/pos.products.json';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products = [];
  constructor() { }

  ngOnInit() {
    this.products = [...products];
  }

}
