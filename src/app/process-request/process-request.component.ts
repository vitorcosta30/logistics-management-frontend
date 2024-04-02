import {Component, OnInit} from '@angular/core';
import {RequestService} from "../services/request/request.service";
import {ActivatedRoute} from "@angular/router";
import{ Request} from "../models/request.model";
import {Product} from "../models/product.model";
import {RequestItem} from "../models/request-item.model";
import {Position} from "../models/position.model";
@Component({
  selector: 'app-process-request',

  templateUrl: './process-request.component.html',
  styleUrl: './process-request.component.css'
})
export class ProcessRequestComponent implements OnInit{
  request? : Request;

  displayRoute: boolean = false;
  route: Position []= [];

  getRoute(){
    if(this.request != undefined) {
      this.requestService.getRoute(this.request?.id).subscribe(res =>{
        this.displayRoute = true;
        this.route = res;
      })
    }
  }




  collectItem(product: RequestItem): void {
    if(this.request != undefined){
      this.requestService.collectItems(product.id,this.request.id).subscribe(res => this.request = res);

    }
  }

  areAllProductsCollected(): boolean {
    if(this.request == undefined){
      return false;
    }else{
      return this.request.requestItems.every(item => item.isCollected);
    }
  }

  sendRequest(): void {
    if(this.request != undefined){
      this.requestService.sendRequest(this.request.id).subscribe(res => this.request = res);

    }
  }
  isToBeSent(): boolean{
    if(this.request == undefined){
      return false;
    }else{
      return this.request.currentStatus == "COLLECTION";
    }
  }

  constructor(    private activatedRoute: ActivatedRoute,
                  private requestService: RequestService
  ) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getRequest(id);

    })
  }
  getRequest(id: number){
    this.requestService.getRequest(id).subscribe(res => this.request = res)

  }




}
