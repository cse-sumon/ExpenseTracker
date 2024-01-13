import { Component } from '@angular/core';
import { CategoryService } from '../../shared/category.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  menuList : any[];

  constructor(private categoryService:CategoryService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.


this.menuList=[
  { 
    name: "Home", 
    routerLink: "['']"
    
}, 
{ 
  name: "Category", 
  routerLink:"/category"
},
{ 
  name: "Transaction", 
  routerLink: ['transaction']
},
];

  //   this.categoryService.getAllCategories().subscribe(
  //     res=>{
  //       console.log(res);
  //     },
  //     err=>{
  //       console.log(err);
  //     }
  //   )
  // }



  }


}
