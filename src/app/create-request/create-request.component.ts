import {Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

import {ProductService} from "../services/product/product.service";
import {Product} from "../models/product.model";
import {RequestItem} from "../models/request-item.model";
import {RequestService} from "../services/request/request.service";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css'
})
export class CreateRequestComponent implements OnInit{

  requestForm!: FormGroup;
  products :  Product[] = [];
  items: RequestItem[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService, private requestService: RequestService) {
    this.requestForm = this.fb.group({
      reciepe: this.fb.array([
        this.fb.group({
          product: ['', Validators.required],
          quantity: [0, Validators.required]
        }),
      ]),
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => this.products = res)
  }
  compare( val1: Product, val2: Product) {
    return val1.id === val2.id;
  }
  get itemControls(): any {
    return this.requestForm.get('reciepe') as FormArray;
  }

  addItem() {
    const items = this.requestForm.get('reciepe') as FormArray;
    if (!items.invalid) {
      items.push(
        this.fb.group({
          product: ['', Validators.required],
          quantity: [0, Validators.required]
        })
      );
    }
  }

  removeItem(index: any) {
    const items = this.requestForm.get('reciepe') as FormArray;
    items.removeAt(index);
  }
  findProductById(id: number): Product | null  {
    for(let i = 0; i < this.products.length; i++){
      if(this.products[i].id == id){
        return this.products[i];
      }
    }
    return null;
  }
  submitForm() {
    var reqItems = this.requestForm.value.reciepe ;
    let prod;
    for (let i = 0; i < reqItems.length; i++) {
      prod = this.findProductById(reqItems[i].product);
      if (prod == null){
        return;
      }else{
        this.items.push(new RequestItem(prod, reqItems[i].quantity))
      }

    }
    console.log(this.items)
    console.log(this.requestForm.value.reciepe);
    this.requestService.createRequest(this.items).subscribe();
  }

}
