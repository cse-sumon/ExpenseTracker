import { Component, ViewChild } from '@angular/core';
import { TransactionService } from '../../shared/transaction.service';
import { SanckbarService } from '../../shared/sanckbar.service';
import { Transaction } from '../../model/transaction';
import { Category } from '../../model/category';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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



  constructor(public tranService: TransactionService, private snackbar: SanckbarService){}



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


}
