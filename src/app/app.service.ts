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

  constructor(private http: HttpClient) { }

  getAllCompanies() : Observable<ICompany[]> {
    return this.http
      .get<ICompany[]>('/api/company')
      // .catch(this.handleError);
  }

  // handleError(error: HttpErrorResponse) {
  //   return Observable.throw(error.message || 'Server error');
  // }
}
