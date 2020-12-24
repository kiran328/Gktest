import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../login/auth.service';
import { User } from '../login/user.model';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  authStatusSubscription: Subscription;
  isLoggedIn: boolean = false;
  user: User;

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.authStatusSubscription = this.authService.authStatusChanged.subscribe((isLoggedIn: boolean)=>{
      this.isLoggedIn = isLoggedIn;
    });
    this.user = this.storageService.getItem('user');
  }

  onLogout() {
    this.authService.logout(this.user.key).subscribe(response=>{
      this.storageService.clearStorage();
      this.authService.authStatusChanged.next(false);
      this.router.navigate(['/login']);
    })
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }
}
