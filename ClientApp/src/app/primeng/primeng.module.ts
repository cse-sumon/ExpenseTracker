import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule }    from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { ListboxModule } from 'primeng/listbox';



const materialList =[
  CommonModule,
  ButtonModule,
  CheckboxModule,
  FormsModule,
  TableModule,
  PaginatorModule,
  ToolbarModule,
  MenuModule,
  ListboxModule,
];


@NgModule({
  declarations: [],
  imports: [
    materialList
  ],

  exports:[
    materialList
  ]
})
export class PrimengModule { }
