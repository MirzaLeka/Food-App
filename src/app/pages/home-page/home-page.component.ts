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

  startingPoint = 1000;

  @HostListener("window:scroll", [])
    onWindowScroll() {

      console.log(this.startingPoint);

      // const pageHeight = document.body.scrollHeight;
      const limit = this.startingPoint / 100 + 10;

      // console.log(pageHeight);

      if ( window.pageYOffset >= this.startingPoint ) {
        this._appService.searchCompany({ limit })
        .subscribe(data => this.companiesArray = data);
        this.startingPoint += 1000;
      }


      // for(; window.pageYOffset < pageHeight; startingPoint+=1000) {
      //   const limit = startingPoint / 50;

      //   if ( window.pageYOffset >= startingPoint ) {
      //     this._appService.searchCompany({ limit })
      //     .subscribe(data => this.companiesArray = data);
      //   }

      // }

    
    // get data, data.length


    // } else if ( window.pageYOffset >= startingPoint * 2 ) {
    //   this._appService.searchCompany({ limit: limit+10 })
    //   .subscribe(data => this.companiesArray = data);
    // }
  }

  constructor(private _appService: AppService) { }

  receivedCompanies(searchResult: ICompany[]) {
    this.companiesArray = searchResult;
  }

  getListOfCompanies() {
    this._appService.getAllCompanies()
    .subscribe(
      data => this.companiesArray = data,
      error => this.errorMsg = error.message
    )
  }

  ngOnInit() {
    this.getListOfCompanies();
  }

}
