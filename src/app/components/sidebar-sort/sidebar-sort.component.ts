import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { ESort } from '../../models/esort';

@Component({
  selector: 'app-sidebar-sort',
  templateUrl: './sidebar-sort.component.html',
  styleUrls: ['./sidebar-sort.component.scss']
})
export class SidebarSortComponent implements OnInit, OnChanges {

  sort = ESort;
  dropdownKeys = [];
  selectedItem : number;

  @Input() searchCompanyForm : boolean;
  @Output() dropdownValueEvent = new EventEmitter();

  constructor() {

  }

  getSelectedSort(selectedValue: number) {
    const sortOption = this.sort[this.dropdownKeys[selectedValue]];
    const sortValue = selectedValue % 2 === 0 ? 1 : -1;
    this.dropdownValueEvent.emit([sortOption, sortValue]);
  }


  ngOnInit() {
    this.searchCompanyForm = true;
    this.dropdownKeys = Object.keys(this.sort);
    this.selectedItem = 1;

    if (this.searchCompanyForm) {
      this.dropdownKeys.splice(4);
    }

  }

  ngOnChanges() {
    this.dropdownKeys = Object.keys(this.sort);

    if (this.searchCompanyForm) {
      this.dropdownKeys.splice(4);
    }

  }

}
