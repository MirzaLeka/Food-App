import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FoodItemComponent } from './components/food-item/food-item.component';
import { CatgoryComponent } from './components/catgory/catgory.component';
import { JoinFormComponent } from './components/join-form/join-form.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { CompanyItemComponent } from './components/company-item/company-item.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarSearchCompanyComponent } from './components/sidebar-search-company/sidebar-search-company.component';
import { SidebarSearchNearMeComponent } from './components/sidebar-search-near-me/sidebar-search-near-me.component';
import { SidebarFilterSortComponent } from './components/sidebar-filter-sort/sidebar-filter-sort.component';
import { SidebarSortComponent } from './components/sidebar-sort/sidebar-sort.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { TrendingItemsLayoutComponent } from './components/trending-items-layout/trending-items-layout.component';
import { TrendingItemComponent } from './components/trending-item/trending-item.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SidebarComponent,
    NavbarComponent,
    FoodItemComponent,
    CatgoryComponent,
    JoinFormComponent,
    HomeLayoutComponent,
    CompanyItemComponent,
    SidebarSearchCompanyComponent,
    SidebarSearchNearMeComponent,
    SidebarFilterSortComponent,
    SidebarSortComponent,
    LoadingSpinnerComponent,
    TrendingItemsLayoutComponent,
    TrendingItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
