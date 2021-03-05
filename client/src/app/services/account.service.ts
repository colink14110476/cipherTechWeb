import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  //POST to create a new account
  createAcc(data): Observable<any> {
    return this.http.post(baseUrl,data)
  }

  //GET to get a username/password authentication
  getAuth(options): Observable<any> {
    return this.http.get(baseUrl,options)
  }

  //GET to retrieve all account info
  getAllAcc(): Observable<any> {
    return this.http.get(baseUrl+"/report")
  }
}