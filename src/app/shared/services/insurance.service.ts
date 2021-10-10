import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";


@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  private endpoint: string = environment.apiUrl + "/insurances";

  constructor(private http: HttpClient) { }

  public getInsurances = (request: { size: number; page: number }) => {
    const params = request;
    return this.http.get(this.endpoint, { params });
  };
}
