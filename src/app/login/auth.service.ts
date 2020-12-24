import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Logout } from './logout.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatusChanged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  login(username: string, password:string) {
    return this.http.get<User>(`${environment.app_url}/login?username=${username}&password=${password}`);
  }

  logout() {
    return this.http.get<Logout>(`${environment.app_url}/logout`)
  }
}
