import { Component, ViewChild } from '@angular/core';
import { TransactionService } from '../../shared/transaction.service';
import { SanckbarService } from '../../shared/sanckbar.service';
import { Transaction } from '../../model/transaction';
import { Category } from '../../model/category';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {


  transactions:Transaction[]=[];
  categoryList:Category[]=[];

  displayedColumns: string[] = ['title', 'transactionType', 'category', 'amount','creationDate','action'];

  dataSource: MatTableDataSource<Transaction>;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(public tranService: TransactionService, private snackbar: SanckbarService,public dialog: MatDialog,)
  {

  }



ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getAllTransactions();
}

getAllTransactions(){
  this.tranService.getAllTransactions().subscribe(
    res=>{
      this.transactions = <Transaction[]> res;
      this. dataSource =  new MatTableDataSource(this.transactions);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(res);
    },
    err=>{
      console.log(err);
    }
  )
}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}



AddNewDialog(): void {

  this.tranService.formTitle = "Add New Transaction"
  this.tranService.buttonName = "Save"

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "540px";
  dialogConfig.height = "615px";
  const dialogRef = this.dialog.open(AddTransactionComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.ngOnInit()
  });

}


  
onEdit(transaction:any){
  // console.log(transaction);
  this.tranService.formPopulate(transaction);

  this.tranService.formTitle = "Update Transaction"
  this.tranService.buttonName = "Update"

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "540px";
  dialogConfig.height = "615px";
  const dialogRef = this.dialog.open(AddTransactionComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.ngOnInit()
  });
}




onDelete(id:number){
  this.tranService.deleteTransaction(id).subscribe(
    res=>{
      this.snackbar.openSnackbar("Transaction Deleted Successfully");
      this.ngOnInit();
      // console.log(res);
    },
    err=>{
      console.log(err);
    }
  )
}





}
