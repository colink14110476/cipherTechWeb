import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  username:string
  constructor(private authService:AuthService, private router: Router) { }

  //When user dashboard first launches, initialize the username for this component.
  ngOnInit(): void {
  	this.username=this.authService.getUser();
  }

  //When logout button is pressed, clear the username and return to 'login' page.
  onLogout(){
  	this.authService.logoutUser()
  	this.router.navigateByUrl('/login')
  }

}
