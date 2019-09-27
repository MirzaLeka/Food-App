import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ICompany } from 'src/app/models/icompany';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  companiesArray = [];
  errorMsg = '';

  constructor(private _appService: AppService) { }

  receivedCompanies(searchResult: ICompany[]) {
    this.companiesArray = searchResult;
  }

  getListOfCompanies() {
    this._appService.getAllCompanies()
    .subscribe(
      data => this.companiesArray = data,
      error => this.errorMsg = error.message
    )
  }

  ngOnInit() {
    this.getListOfCompanies();
  }

}
