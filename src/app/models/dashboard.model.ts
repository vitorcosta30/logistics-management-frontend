import {DashboardDataPoint} from "./dasboard-data-point.model";


export class Dashboard{
  constructor(
    public nReqToBeProcessed: number,
    public nReqOnCollection: number,
    public nReqSent: number,
    public nReceived: number,
    public toBeProcessedReqData  :DashboardDataPoint[],
    public onCollectionReqData  :DashboardDataPoint[],
    public sentReqData  :DashboardDataPoint[],
    public receivedReqData  :DashboardDataPoint[],



  ) {
  }
}
