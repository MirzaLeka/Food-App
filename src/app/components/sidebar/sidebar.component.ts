import { Component, OnInit } from '@angular/core';
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
  }

  receiveCompany(company: string) {
    searchByCompany.companyName = company;
    // send to service
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
      // send data to servce
    } else {
      // send data to a different service
    }

  }

  receiveSortOptions( sortOption: string, sortValue: number ) {

  }

  ngOnInit() {
    this.getCategoriesList();
  }

}
