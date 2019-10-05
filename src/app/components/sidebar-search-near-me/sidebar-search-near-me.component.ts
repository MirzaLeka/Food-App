import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sidebar-search-near-me',
  templateUrl: './sidebar-search-near-me.component.html',
  styleUrls: ['./sidebar-search-near-me.component.scss']
})
export class SidebarSearchNearMeComponent implements OnInit {

  searchNearByForm : FormGroup;
  displayMap : boolean = false;

  @Output() mapEmitter = new EventEmitter<boolean>();

  constructor() { }

  toggleMap() {
    this.displayMap = !this.displayMap;
    console.log(this.displayMap);
    // this.mapEmitter.emit(this.displayMap);
  }


  ngOnInit() {
    this.searchNearByForm = new FormGroup({
      searchAddress: new FormControl(),
      maxDistance: new FormControl(),
      minDistance: new FormControl(),
    });
  }

}
