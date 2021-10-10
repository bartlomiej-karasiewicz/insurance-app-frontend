import {BehaviorSubject, Observable, of} from "rxjs";
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {catchError, finalize} from "rxjs/operators";
import {InsuranceService} from "./services/insurance.service";
import {Insurance, Insurances} from "./dto/insurance";

export class InsuranceDataSource implements DataSource<Insurance>{

  private insuranceSubject = new BehaviorSubject<Insurance[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private insuranceService: InsuranceService) { }

  connect(collectionViewer: CollectionViewer): Observable<Insurance[]> {
    return this.insuranceSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.insuranceSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  loadInsurances(pageNumber = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.insuranceService.getInsurances({ page: pageNumber, size: pageSize })
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((result: Insurances) => {
          this.insuranceSubject.next(result.content);
          this.countSubject.next(result.totalElements);
        }
      );
  }

}
