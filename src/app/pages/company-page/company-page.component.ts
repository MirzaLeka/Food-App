import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../pages/company-page/company.service';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})
export class CompanyPageComponent implements OnInit {

  company;
  errorMsg;

  constructor(private _companyService: CompanyService) { }

  getCompany() {
    this._companyService.getCompanyByCompanyPath()
    .subscribe( data => {
      console.log(data);
      this.company = data;
    },
      error => this.errorMsg = error.message
    )
  }

  ngOnInit() {
    this.getCompany();
  }

}
