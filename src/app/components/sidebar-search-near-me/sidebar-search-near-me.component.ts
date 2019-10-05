import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { minimumNumberValidator } from '../../shared/min-number-validator';
import { rangeNumberValidator } from '../../shared/range-number-validator';

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
  displayMapBtn : boolean = false;
  displayMap : boolean = false;

  @Output() toggleMapEmitter = new EventEmitter<boolean>();
  @Output() formDataEmitter = new EventEmitter<object>();

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
        .subscribe(data => this.searchNearByForm.controls['searchAddress'].setValue(data['address']));

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
  
  handleSubmit() {

    if (this.searchNearByForm.invalid) {
      return alert('Please populate all mandatory fields');
    }

    this.displayMapBtn = true;
    this.formDataEmitter.emit(this.searchNearByForm.value);
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

}
