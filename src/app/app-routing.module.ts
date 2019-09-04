import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { JoinPageComponent } from './pages/join-page/join-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const isLoggedIn = true;
const isAdmin = false;

let routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'join', component: JoinPageComponent },
  { path: 'company/:name', component: CompanyPageComponent },
  { path: 'profile/:user', component: ProfilePageComponent },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
];

if (isLoggedIn) {
  routes = routes.filter(route => route.path !== 'join');
  routes.push({ path: 'join', redirectTo: '', pathMatch: 'full' });

  if (isAdmin) {
    routes.push({ path: 'admin', component: AdminPageComponent });
  } else {
    routes.push({ path: 'admin', redirectTo: '', pathMatch: 'full' });
  }
  
}

routes.push({ path: '**', component: NotFoundPageComponent });

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  CompanyPageComponent, ProfilePageComponent,
  JoinPageComponent, AdminPageComponent, NotFoundPageComponent ];
