import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/category/category.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [

  {path:"", component:HomeComponent,
  children:[
    {path:"dashboard", component:DashboardComponent},
    {path:"category", component:CategoryComponent},
    {path:"transaction", component:TransactionComponent},
  ]
},
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
