import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  signup(data: any): Observable<any> {
    return this._http.post(environment.baseUrl + '/auth/signup', data)
  }

  login(data: any): Observable<any> {
    return this._http.post(environment.baseUrl + '/auth/login', data)
  }
}
