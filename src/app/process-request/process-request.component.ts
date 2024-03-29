import {Component, OnInit} from '@angular/core';
import {RequestService} from "../services/request/request.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-process-request',

  templateUrl: './process-request.component.html',
  styleUrl: './process-request.component.css'
})
export class ProcessRequestComponent implements OnInit{
  request? : Request;
  constructor(    private activatedRoute: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.getUser(id);

    })
  }
  getUser(id: number){

  }




}
