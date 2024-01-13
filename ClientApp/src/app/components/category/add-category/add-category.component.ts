import { Component, Inject } from '@angular/core';
import { TransactionService } from '../../../shared/transaction.service';
import { CategoryService } from '../../../shared/category.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SanckbarService } from '../../../shared/sanckbar.service';
import { Category } from '../../../model/category';
import { TransactionType } from '../../../model/transaction-type';
import { TransactionTypeService } from '../../../shared/transaction-type.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {




  transactionTypeList:TransactionType[]=[];

  constructor(
    public categoryService: CategoryService, 
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, 
    private snackbar: SanckbarService,
    private tranTypeService: TransactionTypeService ) {

  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllTransactionType();
  }

  getAllTransactionType(){
    this.tranTypeService.getAll().subscribe(
      res=>{
        this.transactionTypeList = <any>res;
      },
      err=>{
        console.log(err)
      },
    )
  }

  onClose(){
    this.dialogRef.close();
  }

  onSubmit2(): void {
    if (this.categoryService.categoryForm.valid) {
      //const formValues = this.service.taskForm.value;
      // console.log('Submitted Form Values:', formValues);

      let category = {
        name: this.categoryService.categoryForm.get('name')!.value,
        transactionTypeId: this.categoryService.categoryForm.get('transactionTypeId')!.value,
        transactionType: this.categoryService.categoryForm.get('transactionType')!.value,
        description: this.categoryService.categoryForm.get('description')!.value,
        icon: this.categoryService.categoryForm.get('icon')!.value,
        file: this.categoryService.categoryForm.get('file')!.value,
        creationDate: this.categoryService.categoryForm.get('creationDate')!.value,
       }

       

     
      let id = this.categoryService.categoryForm.get('id')!.value;
      if(id == null || id == ""){
        this.InsertCategory(category);
      }

      else{
        id = this.categoryService.categoryForm.get('id')!.value;
        let category = {
          id: this.categoryService.categoryForm.get('id')!.value,
          name: this.categoryService.categoryForm.get('name')!.value,
          transactionTypeId: this.categoryService.categoryForm.get('transactionTypeId')!.value,
          transactionType: this.categoryService.categoryForm.get('transactionType')!.value,
          description: this.categoryService.categoryForm.get('description')!.value,
          icon: this.categoryService.categoryForm.get('icon')!.value,
          file: this.categoryService.categoryForm.get('file')!.value,
          creationDate: this.categoryService.categoryForm.get('creationDate')!.value,
         }

         this.UpdateCategory(id!, category);
      }

      
    } 
    else {
      console.error('Form is invalid. Please check the fields.');
    }
  }




  onSubmit(): void {
    if (this.categoryService.categoryForm.valid) {

      var category = this.categoryService.categoryForm.value;

      console.log(category);

      if(category.id == null || category.id == ""){
        var categoryWithoutId = (({ id, ...rest }) => rest)(category);
        console.log(categoryWithoutId);
        this.InsertCategory(categoryWithoutId);
      }
      else{
         this.UpdateCategory(category.id, category);
      }
    } 
    else {
      console.error('Form is invalid. Please check the fields.');
    }
  }


  InsertCategory(category:any){
    console.log(category);
    this.categoryService.addCategory(category).subscribe(
      res=>{
        this.snackbar.openSnackbar("Category Created Successfully");
        this.categoryService.categoryForm.reset();
        this.dialogRef.close();
      },
      err=>{
        console.log(err);
      },
    )
  }


  UpdateCategory(id:number, category:any){
    this.categoryService.updateCategory(id, category).subscribe(
      res=>{
        this.snackbar.openSnackbar("Category Updated Successfully");
        this.categoryService.categoryForm.reset();
        this.dialogRef.close();
      },
      err=>{
        console.log(err);
      },
    )
  }




}
