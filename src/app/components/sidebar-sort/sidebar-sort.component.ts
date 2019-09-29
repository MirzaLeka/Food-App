import { Component, Output, EventEmitter } from '@angular/core';
import { ESort } from '../../models/esort';

@Component({
  selector: 'app-sidebar-sort',
  templateUrl: './sidebar-sort.component.html',
  styleUrls: ['./sidebar-sort.component.scss']
})
export class SidebarSortComponent {

  sort = ESort;
  dropdownKeys = [];
  selectedItem : number;

  @Output() dropdownValueEvent = new EventEmitter();

  constructor() {
    this.dropdownKeys = Object.keys(this.sort);
    this.selectedItem = 1;
  }

  getSelectedSort(selectedValue: number) {
    const sortOption = this.sort[this.dropdownKeys[selectedValue]];
    const sortValue = selectedValue % 2 === 0 ? 1 : -1;
    this.dropdownValueEvent.emit([sortOption, sortValue]);
  }

}
