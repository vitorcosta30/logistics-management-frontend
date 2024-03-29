import {RequestHistory} from "./request-history.model";
import {RequestItem} from "./request-item.model";

export class Request{
  constructor(public requestHistoryItems: RequestHistory[], public currentStatus: string, public requestItems : RequestItem[], public id: number){

  }
}
