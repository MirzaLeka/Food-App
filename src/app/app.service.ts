import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from './models/icompany';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  endpointStart = '/api/company/';

  constructor(private http: HttpClient) { }

  getAllCategories() : Observable<String[]> {
    return this.http
      .get<String[]>(`${this.endpointStart}categories/all`);
  }

  getAllCompanies() : Observable<ICompany[]> {
    return this.http
      .get<ICompany[]>(this.endpointStart)
      // .catch(this.handleError);
  }

  // handleError(error: HttpErrorResponse) {
  //   return Observable.throw(error.message || 'Server error');
  // }
}
