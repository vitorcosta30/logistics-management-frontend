import {Component, OnInit} from '@angular/core';
import {RequestService} from "../services/request/request.service";
import {Request} from "../models/request.model"
@Component({
  selector: 'app-list-pending-request',

  templateUrl: './list-pending-request.component.html',
  styleUrl: './list-pending-request.component.css'
})
export class ListPendingRequestComponent implements OnInit{
  pendingRequests: Request[] = [];


  constructor(private requestService: RequestService){

  }
  ngOnInit(): void {
    this.requestService.getPendingRequests().subscribe(res => {
      this.pendingRequests = res
    })
  }





}
