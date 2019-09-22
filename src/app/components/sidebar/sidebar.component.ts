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
  searchCompany = true;

  constructor(private _appService: AppService) { }

  toggleSearch() {
    this.searchCompany = !this.searchCompany;
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

  receiveCategory(category: any) {

    if (category === 'All categories') {
      searchByCompany.categories = [];
    }
    else if (searchByCompany.categories.includes(category)) {
      searchByCompany.categories.splice(searchByCompany.categories.findIndex(index => index === category), 1);
    } else {
      searchByCompany.categories.push(category);
    }

    // send this data to Service

  }

  ngOnInit() {
    this.getCategoriesList();
  }

}
