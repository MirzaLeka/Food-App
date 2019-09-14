import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompany } from './models/icompany';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getAllCompanies() : Observable<ICompany> {
    return this.http.get<ICompany>('/api/company');
  }
}
