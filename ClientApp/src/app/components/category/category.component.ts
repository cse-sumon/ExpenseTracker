import { Component, ViewChild } from '@angular/core';

import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from '../../model/category';
import { TransactionTypeService } from '../../shared/transaction-type.service';
import { CategoryService } from '../../shared/category.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SanckbarService } from '../../shared/sanckbar.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})



export class CategoryComponent  {


  category:Category[]=[];

  displayedColumns: string[] = ['name', 'transactionType', 'creationDate','action'];

  dataSource: MatTableDataSource<Category>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transactionTypeService : TransactionTypeService, private categoryService:CategoryService, public dialog: MatDialog,
    private snackbar: SanckbarService){}



  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.getAllCategories();

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTransactionType(){
    this.transactionTypeService.getAll().subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }

  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      res=>{
        this.category = res;
        this. dataSource =  new MatTableDataSource(this.category);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }

  getCategory(id:number){
    this.categoryService.getCategory(id).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }


  // addCategory(categoryForm: Category){
  //   this.categoryService.addCategory(categoryForm).subscribe(
  //     res=>{
  //       console.log(res);
  //     },
  //     err=>{
  //       console.log(err);
  //     }
  //   )
  // }



  onDelete(category:any){
    this.deleteCategory(category.id);
  }


  updateCategory(id:number, categoryForm: Category){
    this.categoryService.updateCategory(id, categoryForm).subscribe(
      res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }

  deleteCategory(id:number){
    this.categoryService.deleteCategory(id).subscribe(
      res=>{
        this.snackbar.openSnackbar("Category Deleted Successfully");
        this.ngOnInit();
        // console.log(res);
      },
      err=>{
        console.log(err);
      }
    )
  }





  AddNewDialog(): void {

    this.categoryService.formTitle = "Add New Category"
    this.categoryService.buttonName = "Save"
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "420px";
    dialogConfig.height = "435px";
    const dialogRef = this.dialog.open(AddCategoryComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  
  }


  
  onEdit(category:any){
    this.categoryService.formPopulate(category);

    this.categoryService.formTitle = "Update Category"
    this.categoryService.buttonName = "Update"
  
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "420px";
    dialogConfig.height = "430px";
    const dialogRef = this.dialog.open(AddCategoryComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit()
    });
  }




}
