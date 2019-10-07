import { OnInit,Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-sidebar-search-company',
  templateUrl: './sidebar-search-company.component.html',
  styleUrls: ['./sidebar-search-company.component.scss']
})
export class SidebarSearchCompanyComponent implements OnInit {

  searchCompanyForm : FormGroup;
  searchCompanyInput: FormControl;

  @Output() companyNameEvent = new EventEmitter<string>();

  constructor() { }

  createFormControls() { 
    this.searchCompanyInput = new FormControl('');
  }

  createForm() { 
    this.searchCompanyForm = new FormGroup({
      searchCompanyInput: this.searchCompanyInput
    });
  }

  detectInputChanges() {
    this.searchCompanyInput.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(value => this.submitOnInput(value));
  }

  submitOnInput(text: string) {
    this.companyNameEvent.emit(text);
  }

  handleSubmit() {
    const { searchCompanyInput } = this.searchCompanyForm.value;
    this.companyNameEvent.emit(searchCompanyInput);
  }


  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.detectInputChanges();
  }

}
