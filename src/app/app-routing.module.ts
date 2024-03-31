import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateRequestComponent} from "./create-request/create-request.component";
import {ListPendingRequestComponent} from "./list-pending-request/list-pending-request.component";
import {ProcessRequestComponent} from "./process-request/process-request.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: 'createRequest', component: CreateRequestComponent  },
  { path: 'pendingRequests', component: ListPendingRequestComponent  },
  { path: 'Requests/:id', component: ProcessRequestComponent  },
  { path: 'dashboard', component: DashboardComponent  },


  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
