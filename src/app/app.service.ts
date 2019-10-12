import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from './models/icompany';
import { ITrendingItem } from './models/itrending-item';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  companiesEndpoint = '/api/company';
  searchData;

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  searchCompany(body : any) : Observable<ICompany[]> {
    return this.http.post<ICompany[]>(`${this.companiesEndpoint}/search`, JSON.stringify(body), this.httpOptions);
  }

  searchCompanyNearBy(body : any) : Observable<ICompany[]>  {

    const { searchAddress, maxDistance } = body;

    if (!searchAddress || !maxDistance) {
      alert('Please populate all required fiels!');
    } else {
      return this.http.post<ICompany[]>(`${this.companiesEndpoint}/search/near-me/`, JSON.stringify(body),  this.httpOptions);
    }
  }

  getAllCategories() : Observable<String[]> {
    return this.http
      .get<String[]>(`${this.companiesEndpoint}/categories/all`);
  }

  getAllCompanies() : Observable<ICompany[]> {
    return this.http
      .get<ICompany[]>(this.companiesEndpoint)
      // .catch(this.handleError);
  }

  getTrendingItems() : Observable<ITrendingItem[]> {
    return this.http
      .get<ITrendingItem[]>(`${this.companiesEndpoint}/trending/food/items`);
  }

  getCurrentLocation(body : object) : Observable<object> {

    return this.http
      .post<object>(`${this.companiesEndpoint}/get/my/current/location/`, JSON.stringify(body),  this.httpOptions);
  }

  // handleError(error: HttpErrorResponse) {
  //   return Observable.throw(error.message || 'Server error');
  // }
}
