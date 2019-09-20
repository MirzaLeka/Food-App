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
      console.log(data);
      this.categories = data;
    },
      error => this.errorMsg = error.message
    )
  }

  ngOnInit() {
    this.getCategoriesList();
  }

}
