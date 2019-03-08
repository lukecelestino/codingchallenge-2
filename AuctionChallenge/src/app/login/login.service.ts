import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlLogin: string = 'http://10.171.67.175:17114/api/v1/auth';

  constructor(private http: HttpClient) {
  }

  loginUser(loginInfo): Observable<any> {
    return this.http.post(`${this.urlLogin}/new`, loginInfo);
  }

  refreshUsher(refreshToken): Observable<any> {
    return this.http.post(`${this.urlLogin}/refresh`, refreshToken);
  }
}
