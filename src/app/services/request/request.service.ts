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
  getRequestsToBeReceived(): Observable<any>{
    return this.http.get(this.baseUrl+"/getAllToBeReceived");
  }
  getRequest(id: number): Observable<any>{
    return this.http.get(this.baseUrl+"/"+id)

  }
  getRoute(id: number): Observable<any>{
    return this.http.get(this.baseUrl+"/"+id+"/getRoute")

  }
  collectItems(idProduct: number, idRequest: number): Observable<any>{
    return this.http.patch(this.baseUrl +"/collectItem/" + idRequest + "/" +idProduct, {})
  }
  startProcessing(idRequest: number): Observable<any>{
    return this.http.patch(this.baseUrl +"/startProcessing/" + idRequest , {})

  }
  sendRequest(idRequest: number): Observable<any>{
    return this.http.patch(this.baseUrl +"/sendRequest/" + idRequest , {})

  }

  receiveRequest(idRequest: number): Observable<any>{
    return this.http.patch(this.baseUrl +"/receiveRequest/" + idRequest , {})

  }


}
