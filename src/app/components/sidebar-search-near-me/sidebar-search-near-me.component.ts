import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { minimumNumberValidator } from '../../shared/min-number-validator';

@Component({
  selector: 'app-sidebar-search-near-me',
  templateUrl: './sidebar-search-near-me.component.html',
  styleUrls: ['./sidebar-search-near-me.component.scss']
})
export class SidebarSearchNearMeComponent implements OnInit {

  searchNearByForm : FormGroup;
  searchAddress: FormControl;
  maxDistance: FormControl;
  minDistance: FormControl;
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

  createFormControls() { 
    this.searchAddress = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]);
    this.maxDistance = new FormControl('', [
      Validators.required,
      minimumNumberValidator
    ]);
    this.minDistance = new FormControl('', minimumNumberValidator);
  }

  createForm() { 
    this.searchNearByForm = new FormGroup({
      searchAddress: this.searchAddress,
      maxDistance: this.maxDistance,
      minDistance: this.minDistance
    });
  }
  

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

}
