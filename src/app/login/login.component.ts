import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  loading: boolean;
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onLoginSubmit() {
     if(this.loginForm.invalid) return;
     this.error = null;
     const { username, password } = this.loginForm.value;
     this.loading = true;
     this.authService.login(username, password).subscribe(response=>{
       this.loading = false;
       this.storageService.setItem('user',response);
       this.authService.authStatusChanged.next(true);
       this.router.navigate(['/']);
     },err=>{
       this.loading = false;
       this.error = err.status === 401 ? err.error : "Something has went wrong";
     })
  }
}