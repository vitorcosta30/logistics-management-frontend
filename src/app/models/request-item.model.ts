import {Product} from "./product.model";


export class RequestItem{
  constructor(
    public product: Product,
             public quantity: number){}
}
