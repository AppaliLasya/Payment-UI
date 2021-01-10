import { Component, OnInit } from '@angular/core';
import {MustMatch} from "./payment-validator";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ReactiveFormConfig, RxwebValidators } from '@rxweb/reactive-form-validators';

import {
  AUTO_STYLE,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
const DEFAULT_DURATION = 300;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]

})
export class PaymentComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) 
  {
    this.registerForm=this.formBuilder.group({});
  }
  

  ngOnInit() {
    ReactiveFormConfig.set({"validationMessage":{"onlyDigit":"16 digit card number required and 3 digit cvv is required"}});
    // ReactiveFormConfig.set({"validationMessage":{"onlyDigits":"3 digit cvv number is required"}});

    this.registerForm = this.formBuilder.group({
      title: ["", Validators.required],
      name: ["", Validators.required],
      cvv: [
        "",
        Validators.required,
        RxwebValidators.pattern({
          expression: {
            onlyDigit: /^\D?(\d{3})$/
          }
        })
      ],

      cardnumber: [
        "",
        [
          Validators.required,
          RxwebValidators.pattern({
            expression: {
              onlyDigit: /^\D?(\d{4})\D?(\d{4})\D?(\d{4})\D?(\d{4})$/
            }
          })
        ]
      ],
      month: ["",Validators.required],
      year: ["", Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value, null, 4)
    );
  }

  onSubmit1() {
    this.submitted = true;

    // stop here if form is invalid
   

    // display form values on success
    alert(
      "Payment Succeeded "
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  collapsed = false;
  


  toggle() {
    this.collapsed = !this.collapsed;
   
  }

  expand() {
    this.collapsed = false;
    
  }

  collapse() {
    this.collapsed = true;

  }
 

}
