import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {InsuranceService} from "../shared/services/insurance.service";
import {tap} from "rxjs/operators";
import {InsuranceDataSource} from "../shared/insurance.datasource";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['insuranceNumber', 'policyType', 'insuredSum', 'insuredName', 'insuredSurname', 'insuredItem'];
  insuranceDataSource!: InsuranceDataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly insuranceService: InsuranceService) {
  }

  ngOnInit(): void {
    this.insuranceDataSource = new InsuranceDataSource(this.insuranceService);
    this.insuranceDataSource.loadInsurances();
  }

  ngAfterViewInit() {
    this.dataSourceSubscription()
    this.paginatorSubscription()
  }

  loadInsurances() {
    this.insuranceDataSource.loadInsurances(this.paginator.pageIndex, this.paginator.pageSize)
  }

  refresh(click: boolean) {
    if (click) {
      this.insuranceDataSource = new InsuranceDataSource(this.insuranceService);
      this.insuranceDataSource.loadInsurances();
      this.dataSourceSubscription()
      this.paginatorSubscription()
    }
  }

  private dataSourceSubscription() {
    this.insuranceDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();
  }

  private paginatorSubscription() {
    this.paginator.page
      .pipe(
        tap(() => this.loadInsurances())
      )
      .subscribe();
  }
}

