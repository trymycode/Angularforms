import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray  } from '@angular/forms';
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/username.validator';
import { RegistrationService } from './registration.service';
// import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  registrationForm: FormGroup
  constructor(private fb: FormBuilder, private registrationService: RegistrationService){}
  get userName(){
    return this.registrationForm.get('username');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }
  addAlternateEmail(){
    this.alternateEmails.push(this.fb.control(''));
  }
  
  ngOnInit(){
    this.registrationForm = this.fb.group({
      username: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z]+$'),forbiddenNameValidator]],
      email:[''],
      subscribe:[false],
      password: [''],
      confirmPassword: [''],
      address: this.fb.group(
        { city: ['City1'],
          state: ['State1'],
          postalCode:['1234']
        }),
        alternateEmails: this.fb.array([''])
    },{validator: PasswordValidator});
    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue =>{
      const email = this.registrationForm.get('email');
      if(checkedValue){
        email.setValidators(Validators.required);
      }else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
    })
  }
  

  // registrationForm = new FormGroup({
  //   username: new FormControl('monika'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postalCode: new FormControl('')
  //   }) 
  // });  
  loadApiData(){
    this.registrationForm.setValue({
      username: 'name',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'City',
        state: 'State',
        postalCode: '124'
      }
    });
  }
  onSubmit(){
    console.log(this.registrationForm.value);
    this.registrationService.register(this.registrationForm.value)
    .subscribe(
      response => console.log("Success!", response),
      error => console.log("Error!", error)
    );
  }
}
