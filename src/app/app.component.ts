import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './login/auth.service';
import { StorageService } from './shared/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    const user = this.storageService.getItem('user');
    if(!user) {
      this.authService.authStatusChanged.next(false);
      this.router.navigate(['/login']);
    } else {
      this.authService.authStatusChanged.next(true);
    }
  }
}
