import {Product} from "./product.model";


export class RequestItem{
  constructor(
    public id: number,
    public product: Product,
    public quantity: number,
    public isCollected: boolean){}
}
