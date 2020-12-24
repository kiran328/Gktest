import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  error: string;
  success: string;
  loading: boolean;
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    const numericRegex = /^[a-zA-Z0-9]+$/;
    this.customerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.pattern(numericRegex)]),
      address: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if(this.customerForm.invalid) return;
    const { name, age, address } = this.customerForm.value;
    this.loading = true;
    this.success = null;
    this.error = null;
    this.customerService.addCustomer({customerAddress: address, customerAge: age, customerName: name})
      .subscribe(response=>{
        this.loading = false;
        this.success = "Customer added successfully";
        this.customerForm.reset();
      },err=>{
        this.loading = false;
        this.error = "Something has went wrong";
      })
  }

}
