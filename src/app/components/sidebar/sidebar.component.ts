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

  searchWord : string;
  categories;
  categoriesSpinner : boolean = false;
  errorMsg : string;

  searchCompanyForm : boolean;
  displayMap = false;
  faIcon : string;

  @Output() searchResult = new EventEmitter();
  @Output() searchNearByResult = new EventEmitter();
  @Output() emitMap = new EventEmitter<boolean>();

  constructor(private _appService: AppService) {
    this.searchWord = 'Search';
    this.searchCompanyForm = true;
    this.faIcon = 'fa fa-toggle-off fa-lg';
   }

  toggleSearch() {
    this.searchCompanyForm = !this.searchCompanyForm;
    this.faIcon = this.searchCompanyForm ? 'fa fa-toggle-off fa-lg' : 'fa fa-toggle-on fa-lg';
    this.searchWord = this.searchCompanyForm ? 'Search' : 'Search Near By';
  }

  toggleMap() {
    this.displayMap = !this.displayMap;
  }

  getCategoriesList() {
    this.categoriesSpinner = true;
    this._appService.getAllCategories()
    .subscribe( data => {
      this.categoriesSpinner = false;
      this.categories = data.sort();
      this.categories.unshift('All categories');
    },
      error => this.errorMsg = error.message
    )
  }

  receiveLocation({ searchAddress, maxDistance, minDistance }) {
    searchNearMe.searchAddress = searchAddress;
    searchNearMe.maxDistance = maxDistance;
    searchNearMe.minDistance = minDistance;

    this._appService.searchCompanyNearBy(searchNearMe)
    .subscribe(data => this.searchNearByResult.emit([data, searchNearMe]));
  }

  receiveCompany(company: string) {
    searchByCompany.companyName = company;

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
      this._appService.searchCompanyNearBy(searchNearMe)
      .subscribe(data => this.searchNearByResult.emit([data, searchNearMe]));
    }

  }

  receiveSortOptions(options: any) {

    searchByCompany.sortOptions = options;
    searchNearMe.sortOptions = options;

    if (this.searchCompanyForm) {
      this._appService.searchCompany(searchByCompany)
      .subscribe(data => this.searchResult.emit([data, searchByCompany]));

    } else {
      this._appService.searchCompanyNearBy(searchNearMe)
      .subscribe(data => this.searchNearByResult.emit([data, searchNearMe]));
    }
  }

  receiveMap(displayMap: boolean) {
    this.emitMap.emit(displayMap);
  }


  ngOnInit() {
    this.getCategoriesList();
  }

}
