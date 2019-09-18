import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent implements OnInit {

  @Input() companyName;
  @Input() companyDescription;
  @Input() companyAvatar;
  @Input() companyPath;

  constructor() { }

  ngOnInit() {
  }

}
