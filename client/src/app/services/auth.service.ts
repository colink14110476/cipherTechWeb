import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { BehaviorSubject } from 'rxjs';


// AuthService class is used to maintain the current username/password used throughout the app. 
// Use login(data) to login a current username/password.
// Use logougUser() to logout the current username/password.
@Injectable()
export class AuthService { 
    private isLoggedIn:boolean;
    private errMessage:string;
    private respRecieved: BehaviorSubject<boolean>;    //False when we are waiting for authentication
    private username:string;
    
    constructor(private accountService:AccountService) {
        this.isLoggedIn=false;
        this.respRecieved=new BehaviorSubject<boolean>(true)
    }
 
    login(data) {
        this.isLoggedIn=false;            //sanity check
        this.respRecieved.next(false);    //False until we receive a response

        this.accountService.getAuth({params:data})
         .subscribe(response => {
             this.username=data.username;
             this.isLoggedIn=true;
             this.errMessage=""
             this.respRecieved.next(true);
         },
         errResponse => {
             this.username="";
             this.isLoggedIn=false;
             this.errMessage=errResponse.error.message;
             this.respRecieved.next(true);
         })
         return this.respRecieved.asObservable();
    }
 
    isUserLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    getUser(): string {
        return this.username;
    }

    getAuthErrMsg(): string{
        return this.errMessage;
    }
    
    logoutUser(): void{
        this.isLoggedIn = false;
        this.username = "";
    }
 
} 