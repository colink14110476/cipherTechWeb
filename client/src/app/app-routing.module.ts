import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninAccountComponent } from './components/signin-account/signin-account.component';
import { SignupAccountComponent } from './components/signup-account/signup-account.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: SigninAccountComponent},
  { path: 'signup', component: SignupAccountComponent},
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [AuthGuardService]}
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
