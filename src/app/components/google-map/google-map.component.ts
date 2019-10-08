import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  @Input() usersCurrentLocation : object;
  @Input() companiesArray : [];

  constructor(private router: Router) {}

  showInfoWindow(infoWindow, event: MouseEvent) {
    infoWindow.open();
  }

  hideInfoWindow(infoWindow, event: MouseEvent) {
    infoWindow.close();
  }

  exploreCompany(path: string, event: MouseEvent) {
    path = encodeURIComponent(path);
    this.router.navigateByUrl(`/company/${path}`);
  }


  ngOnInit() { }

}
