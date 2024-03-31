import { Injectable } from '@angular/core';
import {environment} from "../../../enviroment/enviroment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = environment.apiURL+"Dashboard" ;

  constructor(private http: HttpClient) { }

  getDashBoard(option:number): Observable<any>{
    return this.http.get(this.baseUrl + "/" + option);
  }
}
