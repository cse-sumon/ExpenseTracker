import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {
  apiURL = environment.apiURL;
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.apiURL+"TransactionType");
  }
}
