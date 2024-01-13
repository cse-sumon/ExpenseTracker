import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SanckbarService {

  constructor(private snackBar: MatSnackBar ) { }


   
  openSnackbar(message:string){
    this.snackBar.open(message,"dismiss",{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:2000,
      
    });
  }
}
