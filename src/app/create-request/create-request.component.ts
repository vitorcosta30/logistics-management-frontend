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
import {Request} from "../models/request.model";

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css'
})
export class CreateRequestComponent implements OnInit{

  requestForm!: FormGroup;
  products :  Product[] = [];
  items: RequestItem[] = [];
  submittedRequest?: Request;

  requestsToBeReceived: Request[] = [];

  submitted: boolean = false;
  displayError = false;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private productService: ProductService, private requestService: RequestService) {
    this.requestForm = this.fb.group({
      request: this.fb.array([
        this.fb.group({
          product: ['', Validators.required],
          quantity: [0, Validators.required]
        }),
      ]),
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.products = res
      this.getRequestsToBeReceived();
    })

  }

  compare( val1: Product, val2: Product) {
    return val1.id === val2.id;
  }
  get itemControls(): any {
    return this.requestForm.get('request') as FormArray;
  }

  addItem() {
    const items = this.requestForm.get('request') as FormArray;
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
    const items = this.requestForm.get('request') as FormArray;
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
  isUndefined(): boolean{
    return this.submittedRequest == undefined;
  }
  submitForm() {
    var reqItems = this.requestForm.value.request ;
    let prod;
    for (let i = 0; i < reqItems.length; i++) {
      prod = this.findProductById(reqItems[i].product);
      if (prod == null){
        return;
      }else{
        this.items.push(new RequestItem(0,prod, reqItems[i].quantity, false))
      }

    }

    console.log(this.items)
    console.log(this.requestForm.value.request);
    this.requestService.createRequest(this.items).subscribe({
      next: res => {
        this.displayError = false;

        this.submitted = true;
        this.submittedRequest = res;
        this.getRequestsToBeReceived();


      },
      error: err => {
        this.errorMessage = err;
        this.displayError = true;

      }
    }
  );
  }
  totalQuantity(): number{
    let res = 0;
    for(let i =0 ; i < this.requestForm.value.request.length; i++){
      res = res + this.requestForm.value.request[i].quantity;
    }
    return res;
  }

  canSubmit(): boolean{
    return this.requestForm.value.request.length > 0 && this.totalQuantity() > 0;
  }
  getRequestsToBeReceived():void{
    this.requestService.getRequestsToBeReceived().subscribe(res => this.requestsToBeReceived = res)

  }

  receivedRequest(id: number):void{
    this.requestService.receiveRequest(id).subscribe(res =>{
      this.getRequestsToBeReceived();
    })
  }

}
