import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

   baseURL = environment.apiURL;

  constructor(private http:HttpClient) { }


  getAllTransactions(){
    return this.http.get(this.baseURL+"Transaction");
  }
}
