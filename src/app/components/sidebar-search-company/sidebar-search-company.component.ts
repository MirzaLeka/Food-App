import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-search-company',
  templateUrl: './sidebar-search-company.component.html',
  styleUrls: ['./sidebar-search-company.component.scss']
})
export class SidebarSearchCompanyComponent {

  myModel;

  constructor() { }

  handleKeyDown(keyCode: number, value: string) {
    if ( keyCode === 13 ) {
      this.searchCompany(value)
    } 
  }

  searchCompany(company: string) : Boolean {
    if (!company) {
      return false;
    }
    console.log(company);

    return true;
  }

}
