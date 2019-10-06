import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  @Input() companiesArray : [];
  @Input() homeLayoutSpinner : boolean;
  @Input() usersCurrentLocation : object;
  @Input() showMap : boolean;

  constructor() { }

  toggleMap(event: MouseEvent) {
    this.showMap = !this.showMap; // not final solution
  }

  ngOnInit() { }

}
