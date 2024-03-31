import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CreateRequestComponent} from "./create-request/create-request.component";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {ListPendingRequestComponent} from "./list-pending-request/list-pending-request.component";
import {ProcessRequestComponent} from "./process-request/process-request.component";
import {Dashboard} from "./models/dashboard.model";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CanvasJS, CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";

@NgModule({
  declarations: [
    CreateRequestComponent,
    ListPendingRequestComponent,
    ProcessRequestComponent,
    DashboardComponent,

    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, CommonModule, ReactiveFormsModule,HttpClientModule,
    CanvasJSAngularChartsModule,
    NgMultiSelectDropDownModule.forRoot(),

    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
