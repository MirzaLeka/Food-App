import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from './models/icompany';
import { ICategory } from './models/icategory'
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  endpointStart = '/api/company/';

  constructor(private http: HttpClient) { }

  getAllCategories() : Observable<ICategory[]> {
    return this.http
      .get<ICategory[]>(`${this.endpointStart}categories/all`);
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
