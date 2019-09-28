import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from '../../app.service';
import { ICompany } from 'src/app/models/icompany';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  companiesArray = [];
  errorMsg = '';

  showSpinner: boolean = true;
  startingPoint = 1000;

  @HostListener("window:scroll", [])
    onWindowScroll() {

      const limit = this.startingPoint / 100 + 10;

      if ( window.pageYOffset >= this.startingPoint ) {
        this.showSpinner = true;
        
        this._appService.searchCompany({ limit })
        .subscribe(data => {
          this.showSpinner = false;
          this.companiesArray = data;
        });

        this.startingPoint += 1000;
      }

  }

  constructor(private _appService: AppService) { }

  receivedCompanies(searchResult: ICompany[]) {
    this.companiesArray = searchResult;
  }

  getListOfCompanies() {
    this._appService.getAllCompanies()
    .subscribe(data => {
      this.showSpinner = false;
      this.companiesArray = data
    },
      error => this.errorMsg = error.message
    )
  }

  ngOnInit() {
    this.getListOfCompanies();
  }

}
