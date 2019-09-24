import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from './models/icompany';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  endpointStart = '/api/company/';
  searchData;

  constructor(private http: HttpClient) { }

  searchCompany(company) : Observable<ICompany[]> {

    //  'Authorization': 'my-auth-token'

    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type':  'application/json'
      })
    };

    console.log(company)

    return this.http.post<ICompany[]>(`${this.endpointStart}search`, company, httpOptions)
    // .subscribe(data => {
    //   this.searchData = data;
    // });

  }

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
