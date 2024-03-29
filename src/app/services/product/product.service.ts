import { Injectable } from '@angular/core';
import {environment} from "../../../enviroment/enviroment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiURL+"Products" ;


  constructor(private http: HttpClient) { }

  getProducts(): Observable<any>{
    return this.http.get(`${this.baseUrl}`)
  }


}
