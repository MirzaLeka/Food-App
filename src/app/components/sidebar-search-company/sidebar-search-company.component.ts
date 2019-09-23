import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-search-company',
  templateUrl: './sidebar-search-company.component.html',
  styleUrls: ['./sidebar-search-company.component.scss']
})
export class SidebarSearchCompanyComponent {

  @Output() companyNameEvent = new EventEmitter();

  constructor() { }

  handleKeyDown(keyCode: number, value: string) {
    if ( keyCode === 13 ) {
      this.searchCompany(value)
    } 
  }

  searchCompany(company: string) {
    this.companyNameEvent.emit(company);
  }

}
