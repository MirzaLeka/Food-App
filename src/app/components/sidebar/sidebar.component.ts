import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../app.service';

import searchByCompany from './searchObjects/searchByCompany';
import searchNearMe from './searchObjects/searchNearMe';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  categories;
  errorMsg;
  searchCompanyForm = true;

  @Output() searchResult = new EventEmitter();

  constructor(private _appService: AppService) { }

  toggleSearch() {
    this.searchCompanyForm = !this.searchCompanyForm;
  }

  getCategoriesList() {
    this._appService.getAllCategories()
    .subscribe( data => {
      this.categories = data.sort();
      this.categories.unshift('All categories');
    },
      error => this.errorMsg = error.message
    )
  }

  receiveLocation(location: any) {
    // address, maxistance, min

    this._appService.searchCompanyNearBy({})
    .subscribe(data => console.log(data));
  }

  receiveCompany(company: string) {
    searchByCompany.companyName = company;
    // send to service

    this._appService.searchCompany(searchByCompany)
    .subscribe(data => this.searchResult.emit([data, searchByCompany]));
  }

  receiveCategory(category: any) {

    let { categories } = searchByCompany;

    if (category === 'All categories') {
      categories = [];
    }
    else if (categories.includes(category)) {
      categories.splice(categories.findIndex(index => index === category), 1);
    } else {
      categories.push(category);
    }

    searchByCompany.categories = categories;
    searchNearMe.categories = categories;

    if (this.searchCompanyForm) {   
      this._appService.searchCompany(searchByCompany)
      .subscribe(data => this.searchResult.emit([data, searchByCompany]));
    } else {
      this._appService.searchCompanyNearBy({})
      .subscribe(data => console.log(data));
    }

  }

  receiveSortOptions(options: any) {

    searchByCompany.sortOptions = options;
    searchNearMe.sortOptions = options;

    if (this.searchCompanyForm) {
      this._appService.searchCompany(searchByCompany)
      .subscribe(data => this.searchResult.emit([data, searchByCompany]));
      
    } else {
      
    }

    

    
  }

  ngOnInit() {
    this.getCategoriesList();
  }

}
