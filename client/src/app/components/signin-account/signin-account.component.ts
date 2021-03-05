import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signin-account',
  templateUrl: './signin-account.component.html',
  styleUrls: ['./signin-account.component.css']
})
export class SigninAccountComponent implements OnInit {
  accountIsValid:Boolean;
  dashboardLaunched:Boolean;
  disableSubmit:Boolean;
  submitMessage:String;
  username:String;
  password:String;

  constructor(private authService:AuthService, private http: HttpClient, private router: Router) {}

  //Event to occur on component initialization.
  ngOnInit(): void {
  	this.authService.logoutUser();	//Logout the current user
  	this.username="";				//The username to login
  	this.password="";				//The password to login
  	this.submitMessage="";			//The error message to show upon login
	this.dashboardLaunched=false;	//A toggle set to true upon the first successful login
	this.disableSubmit=false;		//A toggle to disable the button when waiting for a response
  }

  //Event to occur when submit button is clicked.
  onSubmit() { 

	//Initial Client Validation:
	if (!this.username){
		this.submitMessage="Username can not be empty!";
		return;
	}
	if (!this.password){
		this.submitMessage="Password can not be empty!";
		return;
	}


	this.dashboardLaunched=false;	//Set to false since the dashboard page has not been launched yet.
	this.disableSubmit=true;		//Disable the submit button until a response occurs.

	//Attempt Login, authService.login sends a request to the server and logs in the user or sets up error variables.
	//AuthService.login is finished attempting the login by setting respRecieved to true.
	this.authService.login({username:this.username,password:this.password}).subscribe(respRecieved =>{
		//Wait for the login attempt to finish.
		if(respRecieved){
			//If the dashboard hasn't been launched yet and the user is authorized, launch the dashboard
			if(!this.dashboardLaunched && this.authService.isUserLoggedIn()){
				this.dashboardLaunched=true;
				this.submitMessage="";
				this.router.navigateByUrl('/dashboard')
			}
			//If unauthorized user then show the authentication error. 
			if(!this.authService.isUserLoggedIn()) {
				this.submitMessage=this.authService.getAuthErrMsg();
			}
			this.disableSubmit=false;	
		}
	})
  }
}
