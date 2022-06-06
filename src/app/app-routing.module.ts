import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { DashboardSuperAdminComponent } from './dashboard-super-admin/dashboard-super-admin.component';
import { DashboardTechComponent } from './dashboard-tech/dashboard-tech.component';
import { EditLogsComponent } from './edit-logs/edit-logs.component';
import { FinishOrderComponent } from './finish-order/finish-order.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderComponent } from './order/order.component';
import { RatingComponent } from './rating/rating.component';


const routes: Routes = [
  {path : '',component : HomeComponent},
  {path : 'login',component : LoginComponent},
  {path : 'editLogs',component : EditLogsComponent},
  {path : 'editLogs/:email',component : EditLogsComponent},
  {path : 'login/:spec',component : LoginComponent},
  {path : 'addAdmin',component : AddUserComponent},
  {path : 'apply',component : AddUserComponent},
  {path : 'signup',component : AddUserComponent},
  {path : 'signup/:spec',component : AddUserComponent},
  {path : 'order/:spec',component : OrderComponent},
  {path : 'finishOrder/:id',component : FinishOrderComponent},
  {path : 'dashboardSuperAdmin',component : DashboardSuperAdminComponent},
  {path : 'dashboardAdmin',component : DashboardAdminComponent},
  {path : 'dashboardTech',component : DashboardTechComponent},
  {path : 'dashboardClient',component : DashboardClientComponent},
  {path : 'rating',component : RatingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
