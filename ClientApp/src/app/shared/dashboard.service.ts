import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseURL = environment.apiURL;

  constructor(private http: HttpClient) { }


  getTotalIncomeExpense(){
    return this.http.get(this.baseURL+"Dashboard");
  }
}
