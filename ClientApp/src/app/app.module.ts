import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';

import { TransactionService } from './shared/transaction.service';
import { CategoryService } from './shared/category.service';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { AddTransactionComponent } from './components/transaction/add-transaction/add-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    TransactionComponent,
    AddCategoryComponent,
    AddTransactionComponent,
    DashboardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule

    // ToastrModule.forRoot({
    //   progressBar: true,
    //   timeOut: 2000,
    //   preventDuplicates: true,
    // }),

 
  ],
  providers: [
    provideClientHydration(),
    TransactionService,
    CategoryService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
