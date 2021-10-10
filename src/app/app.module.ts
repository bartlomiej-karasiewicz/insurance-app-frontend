import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {HttpClientModule} from "@angular/common/http";
import { UploadComponent } from './table/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
