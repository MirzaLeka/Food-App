import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-sidebar-search-near-me',
  templateUrl: './sidebar-search-near-me.component.html',
  styleUrls: ['./sidebar-search-near-me.component.scss']
})
export class SidebarSearchNearMeComponent implements OnInit {

  searchNearByForm : FormGroup;
  displayMap : boolean = false;

  @Output() toggleMapEmitter = new EventEmitter<boolean>();

  constructor(private _appService: AppService) { }

  toggleMap() {
    this.displayMap = !this.displayMap;
    console.log(this.displayMap);
    // this.mapEmitter.emit(this.displayMap);
  }

  myLocation() {

    if (!navigator.geolocation) {
      return alert('This browser doesn\'t support geolocation.');
    }

    navigator.geolocation.getCurrentPosition(position => {
    
      const { latitude : lat, longitude : lng } = position.coords; 

      this._appService.getCurrentLocation({lat, lng})
        .subscribe(address => console.log(address));

    }, () => {
      alert('Unable to fetch location.');
    }); 

  }


  ngOnInit() {
    this.searchNearByForm = new FormGroup({
      searchAddress: new FormControl(),
      maxDistance: new FormControl(),
      minDistance: new FormControl(),
    });
  }

}
