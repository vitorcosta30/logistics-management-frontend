import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../enviroment/enviroment";
import {RequestItem} from "../../models/request-item.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private baseUrl = environment.apiURL+"Requests" ;

  constructor(private http: HttpClient) { }

  createRequest(items: RequestItem[]): Observable<any>{
    return this.http.post(this.baseUrl,items);

  }
  getPendingRequests(): Observable<any>{
    return this.http.get(this.baseUrl+"/getAllToBeProcessed");
  }

}
