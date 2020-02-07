import { Component, OnInit } from '@angular/core';
import products from '../../assets/pos.products.json';
import { ProductService, Product} from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products = [...products];
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

}
