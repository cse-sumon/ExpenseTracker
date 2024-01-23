import { Component } from '@angular/core';
import { DashboardService } from '../../shared/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  totalIncome:number;
  totalExpense:number;

  constructor(public dashboardService: DashboardService)
  {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getTotalIncomeExpense();
  }

  getTotalIncomeExpense(){
    this.dashboardService.getTotalIncomeExpense().subscribe(
      res =>{
        const response = res as { totalIncome: number, totalExpense: number };

        this.totalIncome = response.totalIncome;
        this.totalExpense = response.totalExpense;
        // console.log(res);
    },
    err=>{
      console.log(err);

    }
    
    
    )
  }
}
