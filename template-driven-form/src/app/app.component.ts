import { EnrollmentService } from './enrollment.service';
import { Component } from '@angular/core';
import { User } from './user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  errorMessage = "";
  submitted = false;
  constructor(private _enrollservice:EnrollmentService){}
  topics= ['Angular','React','Vue'];
  userModel = new User('','',9932212340,'','morning', true);
  onSubmit(){
    this.submitted = true;
    this._enrollservice.enroll(this.userModel)
    .subscribe(
      data=> console.log('Success!', data),
      error=> this.errorMessage = error.statusText
      
    )
  }
}
