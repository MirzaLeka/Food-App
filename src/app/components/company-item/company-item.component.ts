import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '../../pages/company-page/company.service'
// import { HomeService } from './h';
import { ICompany } from '../../models/icompany';


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
