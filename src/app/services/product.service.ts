import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

export interface Product {
  name: string;
  price: string;
  category: string;
  description: string;
  image?: string;
}

@Injectable({providedIn: 'root'})
export class ProductService {

  cart: Product[] = [];
  newItem = new Subject();

}
