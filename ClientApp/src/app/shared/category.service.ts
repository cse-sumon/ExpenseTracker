import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Category } from '../model/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  buttonName="";
  formTitle = "";
 
  apiURL = environment.apiURL;
  constructor(private http: HttpClient, private fb: FormBuilder) { }


  categoryForm = this.fb.group({
    id: [null], // If you want to edit, set the initial value here
    transactionTypeId: [null, Validators.required],
    transactionType: [null,],
    name: ['', Validators.required],
    description: [''],
    icon: [null],
    file: [null], // You might need additional validation for file inputs
    creationDate: [null],
  });



  getAllCategories(){
    return this.http.get<Category[]>(this.apiURL+"Category");
  }

  getCategory(id:number){
    return this.http.get(this.apiURL+"Category/"+id);
  }

  addCategory(model:any){
    return this.http.post(this.apiURL+"Category",model);
  }

  updateCategory(id:number, model:any){
    return this.http.put(this.apiURL+"Category/"+id, model);
  }

  deleteCategory(id:number){
    return this.http.delete(this.apiURL+"Category/"+id);
  }


  formPopulate(catogory:any){
    this.categoryForm.setValue(catogory);
  }

}
