import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from '../../models/icompany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanyByCompanyPath() : Observable<ICompany> {

    const companyPath = location.pathname.substr(9);

    return this.http
      .get<ICompany>(`/api/company/${companyPath}`)
    
  }
}
