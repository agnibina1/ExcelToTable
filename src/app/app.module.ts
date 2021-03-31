import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeadingComponent } from './heading.component';
import { SheetJSComponent } from './sheet.component';
import { DataTablesModule } from "angular-datatables";



@NgModule({
  imports:      [ BrowserModule, FormsModule, DataTablesModule ],
  declarations: [ AppComponent, HeadingComponent, SheetJSComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
