import {Component, OnInit} from '@angular/core';
import {RequestService} from "../services/request/request.service";
import {Request} from "../models/request.model"
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-list-pending-request',

  templateUrl: './list-pending-request.component.html',
  styleUrl: './list-pending-request.component.css'
})
export class ListPendingRequestComponent implements OnInit{
  pendingRequests: Request[] = [];


  constructor(private activatedRoute: ActivatedRoute,private requestService: RequestService,private router: Router){

  }
  ngOnInit(): void {
    this.requestService.getPendingRequests().subscribe(res => {
      this.pendingRequests = res
    })
  }


  startCollection(id: number){
    this.requestService.startProcessing(id).subscribe(res =>{
      this.router.navigate(['Requests/'+ res.id])
    })

  }





}
