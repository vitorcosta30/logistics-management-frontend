import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../services/dashboard/dashboard.service";
import {Dashboard} from "../models/dashboard.model";

@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements  OnInit{
  daysOptions : number[] = [7,14,30,60,90]

  chart: any;
  dashboardData?: Dashboard;
  selectedOption = 0;
  constructor(private dashboardService: DashboardService) {
  }
  userDps: any = [];



  ngOnInit(): void {
    this.getDashboardData()
    console.log(this.chartOptions)
  }
  getChartInstance(chart: object) {
    this.chart = chart;
  }

  chartOptions = {
    animationEnabled: true,

    theme: "light2",
    title:{
      text: "Request data for the last "+ this.daysOptions[this.selectedOption] + " days."
    },
    axisX:{
      valueFormatString: "D MMM"
    },
    axisY: {
      title: "Number of Requests"
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: function (e: any) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
          e.dataSeries.visible = false;
        } else {
          e.dataSeries.visible = true;
        }
        e.chart.render();
      }
    },
    data: this.userDps
  }
  doGraph(option : number){
    console.log(option)

    this.selectedOption = option;
    this.getDashboardData();
  }
  getDashboardData(){
    this.dashboardService.getDashBoard(this.selectedOption).subscribe(res =>{
      this.dashboardData = res;
      this.setData();
    })
  }
  setData(){
    this.chartOptions.data = [];
    this.chartOptions.title.text = "Request data for the last "+ this.daysOptions[this.selectedOption] + " days."
    if(this.dashboardData != undefined) {
      this.setRequestedData()
    }
  }

  setRequestedData(){
    if(this.dashboardData != undefined) {
      this.chartOptions.data.push({
        type: "line",
        showInLegend: true,
        name: "Requests to be processed",
        xValueFormatString: "MMM DD, YYYY",
        dataPoints: []
      })
      for (let i = 0; i < this.dashboardData?.toBeProcessedReqData.length; i++) {
        this.chartOptions.data[0].dataPoints.push({
          x: new Date(this.dashboardData?.toBeProcessedReqData[i].year, this.dashboardData?.toBeProcessedReqData[i].month - 1, this.dashboardData?.toBeProcessedReqData[i].day),
          y: this.dashboardData?.toBeProcessedReqData[i].quantity
        })
      }
      this.setOnCollectionData()
    }
  }
  setOnCollectionData(){
    if(this.dashboardData != undefined) {
      this.chartOptions.data.push({
        type: "line",
        showInLegend: true,
        name: "Requests on collection",
        xValueFormatString: "MMM DD, YYYY",

        dataPoints: []
      })
      for (let i = 0; i < this.dashboardData?.onCollectionReqData.length; i++) {
        this.chartOptions.data[1].dataPoints.push({
          x: new Date(this.dashboardData?.onCollectionReqData[i].year, this.dashboardData?.onCollectionReqData[i].month - 1 , this.dashboardData?.onCollectionReqData[i].day),
          y: this.dashboardData?.onCollectionReqData[i].quantity
        })
      }
      this.setSentData()
    }
  }
  setSentData(){
    if(this.dashboardData != undefined) {
      this.chartOptions.data.push({
        type: "line",
        showInLegend: true,
        name: "Requests sent",
        xValueFormatString: "MMM DD, YYYY",

        dataPoints: []
      })
      for (let i = 0; i < this.dashboardData?.sentReqData.length; i++) {
        this.chartOptions.data[2].dataPoints.push({
          x: new Date(this.dashboardData?.sentReqData[i].year, this.dashboardData?.sentReqData[i].month - 1, this.dashboardData?.sentReqData[i].day),
          y: this.dashboardData?.sentReqData[i].quantity
        })
      }
      this.setReceivedData();
    }
  }
  setReceivedData(){
    if(this.dashboardData != undefined) {
      this.chartOptions.data.push({
        type: "line",
        showInLegend: true,
        name: "Requests received by the production line manager",
        xValueFormatString: "MMM DD, YYYY",

        dataPoints: []
      })
      for (let i = 0; i < this.dashboardData?.receivedReqData.length; i++) {
        this.chartOptions.data[3].dataPoints.push({
          x: new Date(this.dashboardData?.receivedReqData[i].year, this.dashboardData?.receivedReqData[i].month - 1, this.dashboardData?.receivedReqData[i].day),
          y: this.dashboardData?.receivedReqData[i].quantity
        })
      }
      this.chart.render();
    }
  }


}
