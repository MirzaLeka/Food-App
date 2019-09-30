import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
import { ICompany } from 'src/app/models/icompany';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  companiesArray = [];
  trendingItemsArray = [];
  searchByCompany = { limit: 10 };

  errorMsg = '';

  homeLayoutSpinner: boolean = true;
  trendingLayoutSpinner: boolean = true;
  
  startingPoint = 1000;

  @HostListener("window:scroll", [])
    onWindowScroll() {

      this.searchByCompany.limit = this.startingPoint / 100 + 10;

      if ( window.pageYOffset >= this.startingPoint ) {
        this.homeLayoutSpinner = true;
        
        this._appService.searchCompany(this.searchByCompany)
        .subscribe(data => {
          this.homeLayoutSpinner = false;
          this.companiesArray = data;
        });

        this.startingPoint += 1000;
      }

  }

  constructor(private _appService: AppService) { }

  receivedCompanies( [searchResult, _searchByCompany]: [ICompany[], any] ) {
    this.companiesArray = searchResult;
    this.searchByCompany = _searchByCompany;
    this.startingPoint = 1000;
  }

  getListOfCompanies() {
    this._appService.getAllCompanies()
      .subscribe(data => {
        this.homeLayoutSpinner = false;
        this.companiesArray = data;
      },
        error => this.errorMsg = error.message
      )
  }

  getListOfTrendingItems() {
    this._appService.getTrendingItems()
      .subscribe(data => {
        this.trendingLayoutSpinner = false;
        this.trendingItemsArray = data;
      },
        error => this.errorMsg = error.message
      )
  }

  cycleTrendingItems() {
    this._appService.getTrendingItems()
      .subscribe(
        data => this.trendingItemsArray = data,
        error => this.errorMsg = error.message
      )
  }

  ngOnInit() {
    this.getListOfCompanies();
    this.getListOfTrendingItems();
  }

}
