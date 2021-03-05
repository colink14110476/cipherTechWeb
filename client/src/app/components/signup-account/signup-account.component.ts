import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/account';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-account',
  templateUrl: './signup-account.component.html',
  styleUrls: ['./signup-account.component.css']
})
export class SignupAccountComponent implements OnInit {
  username: string;
  password: string;
  submitMessage: string;
  accounts: Account[];
  showAllAcc: boolean;
  devMode: boolean;
  disableSubmit: boolean;

  constructor(private accountService: AccountService, private http: HttpClient, private router: Router) { }

  //Event to occur upon component initialization
  ngOnInit(): void {
  	this.username="";          //Username in the form
  	this.password="";          //Password in the form
  	this.submitMessage="";     //The error message to show upon submit
  	this.showAllAcc=false;     //A toggle to show all current username/password
  	this.devMode=true;         //Set to true if you want to see all current username/password
  	this.disableSubmit=false;  //A toggle to enable/disable the submit button.
    this.getAllAcc();          //A list of all current Accounts. This is shown in devMode
  }

  //Retrieve all accounts stored in the database
  getAllAcc(){
    if (this.devMode){
      this.accountService.getAllAcc().subscribe(accounts => this.accounts = accounts)
    }
  }

  //Event to occur after the submit button is clicked.
  onSubmit(){

  //Initial Client Side Validation
	if (!this.username){
		this.submitMessage="Username can not be empty!";
		return;
	}
	if (!this.password){
		this.submitMessage="Password can not be empty!";
		return;
	}

	this.disableSubmit=true;  //Disable the submit button until a response is received. 
  
  //Create an account and wait for a response. Once a response is received, 
  //the button is enabled and we either login or we post an error.
	this.accountService.createAcc({username:this.username,password:this.password}).subscribe(response =>{
			this.submitMessage="";
			this.disableSubmit=false;
			this.router.navigateByUrl('/login')
		},
		errResponse => {
			this.submitMessage=errResponse.error.message;
			this.disableSubmit=false;
		})
  }
}
