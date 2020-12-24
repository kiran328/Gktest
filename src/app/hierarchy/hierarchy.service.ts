import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HierarchyService {

  constructor(private http: HttpClient) { }

  getHierarchy() {
    return this.http.get<any>(`${environment.app_url}/node-hierarchy`)
  }
}
