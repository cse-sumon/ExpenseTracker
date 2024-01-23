import { Component, Inject } from '@angular/core';
import { TransactionService } from '../../../shared/transaction.service';
import { TransactionType } from '../../../model/transaction-type';
import { Category } from '../../../model/category';
import { TransactionTypeService } from '../../../shared/transaction-type.service';
import { CategoryService } from '../../../shared/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SanckbarService } from '../../../shared/sanckbar.service';
import { Transaction } from '../../../model/transaction';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent {

  transactionTypeList:TransactionType[]=[];
  categoryList:Category[]=[];

  constructor(
    public tranService: TransactionService, 
    private tranTypeService: TransactionTypeService, 
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<AddTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, 
    private snackbar: SanckbarService,
    )
    {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllTransactionType();

    let id = this.tranService.transactionForm.get('transactionTypeId')!.value

    if(id != null){
      this.getCategoryByTranType(id);
    }
  }

  getAllTransactionType(){
    this.tranTypeService.getAll().subscribe(
      res=>{
        this.transactionTypeList = <any>res;
        // console.log(res);
      },
      err=>{
        console.log(err)
      },
    )
  }

  onTransactionTypeChange(){
    const transactionTypeId = this.tranService.transactionForm.get('transactionTypeId')?.value;
    if(transactionTypeId != null){
      this.getCategoryByTranType(transactionTypeId);
    }
    else{
      console.log("transactionTypeId getting null");
    }
  }

  getCategoryByTranType(id:number){
    this.categoryService.getCategoryByTransactionTypeId(id).subscribe(
      res=>{
        this.categoryList = <any>res;
        // console.log(res);

      },
      err=>{
        console.log(err)
      },
    )
  }


  
  onClose(){
    this.dialogRef.close();
  }





  onSubmit(): void {
    if (this.tranService.transactionForm.valid) {
      const formValues = this.tranService.transactionForm.value;
      // console.log('Submitted Form Values:', formValues);

        let id = formValues.id;

        if(id == null || id == "")
        {
          let transaction = {
            title: this.tranService.transactionForm.get('title')!.value,
            transactionTypeId: this.tranService.transactionForm.get('transactionTypeId')!.value,
            categoryId: this.tranService.transactionForm.get('categoryId')!.value,
            description: this.tranService.transactionForm.get('description')!.value,
            amount: this.tranService.transactionForm.get('amount')!.value,
          }
          this.InsertTransaction(transaction);
        }
        else{
          this.UpdateTransaction(id, formValues);
        }
      
  

      // let category = {
      //   name: this.categoryService.categoryForm.get('name')!.value,
      //   transactionTypeId: this.categoryService.categoryForm.get('transactionTypeId')!.value,
      //   transactionType: this.categoryService.categoryForm.get('transactionType')!.value,
      //   description: this.categoryService.categoryForm.get('description')!.value,
      //   icon: this.categoryService.categoryForm.get('icon')!.value,
      //   file: this.categoryService.categoryForm.get('file')!.value,
      //   creationDate: this.categoryService.categoryForm.get('creationDate')!.value,
      //  }

      // let id = this.categoryService.categoryForm.get('id')!.value;
      // if(id == null || id == ""){
      //   this.InsertTransaction(category);
      // }

      // else{
      //   id = this.categoryService.categoryForm.get('id')!.value;
      //   let category = {
      //     id: this.categoryService.categoryForm.get('id')!.value,
      //     name: this.categoryService.categoryForm.get('name')!.value,
      //     transactionTypeId: this.categoryService.categoryForm.get('transactionTypeId')!.value,
      //     transactionType: this.categoryService.categoryForm.get('transactionType')!.value,
      //     description: this.categoryService.categoryForm.get('description')!.value,
      //     icon: this.categoryService.categoryForm.get('icon')!.value,
      //     file: this.categoryService.categoryForm.get('file')!.value,
      //     creationDate: this.categoryService.categoryForm.get('creationDate')!.value,
      //    }

      //    this.UpdateTransaction(id!, category);
      // }

      
    } 
    else {
      console.error('Form is invalid. Please check the fields.');
    }
  }



  InsertTransaction(transaction:any){
  // console.log(transaction);
  this.tranService.addTransaction(transaction).subscribe(
    res=>{
      this.snackbar.openSnackbar("Transaction Created Successfully");
      this.tranService.transactionForm.reset();
      this.dialogRef.close();
    },
    err=>{
      console.log(err);
    },
  )
}


UpdateTransaction(id:number, transaction:any){
  this.tranService.updateTransaction(id, transaction).subscribe(
    res=>{
      this.snackbar.openSnackbar("Transaction Updated Successfully");
      this.tranService.transactionForm.reset();
      this.dialogRef.close();
    },
    err=>{
      console.log(err);
    },
  )
}


}
