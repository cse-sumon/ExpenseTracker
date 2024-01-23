import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { FormBuilder, Validators } from '@angular/forms';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  buttonName="";
  formTitle = "";
 

   baseURL = environment.apiURL;

  constructor(private http:HttpClient, private fb: FormBuilder) { }


  transactionForm = this.fb.group({
    id: [null],
    transactionTypeId: [null, Validators.required],
    transactionType: [null],
    categoryId: [null, Validators.required],
    category: [null],
    title: [null, Validators.required],
    description: [""],
    amount: [null, [Validators.required, Validators.min(0)]],
    creationDate: [new Date()],
  });

  getAllTransactions(){
    return this.http.get(this.baseURL+"Transaction");
  }

  getTransactionById(id:number){
    return this.http.get(this.baseURL+"Transaction/"+id);
  }


  addTransaction(transaction:Transaction){
    return this.http.post(this.baseURL+"Transaction",transaction);
  }

  
  updateTransaction(id: number, transaction:Transaction){
    return this.http.put(this.baseURL+"Transaction/"+id, transaction);
  }


  deleteTransaction(id: number){
    return this.http.delete(this.baseURL+"Transaction/"+ id);
  }


  formPopulate(transaction:any){
    this.transactionForm.setValue(transaction);
  }

}
