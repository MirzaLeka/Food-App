import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

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

  ngOnInit() {
    this.getCategoriesList();
  }

}
