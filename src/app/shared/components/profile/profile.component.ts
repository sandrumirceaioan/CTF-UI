import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  personalInfoForm: FormGroup;
  samePassword: boolean = false;

  constructor(
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.personalInfoForm = new FormGroup({
      firstName: new FormControl(this.currentUser.firstName),
      lastName: new FormControl(this.currentUser.lastName),
      emailAddress: new FormControl(this.currentUser.email),
      password: new FormControl(null, Validators.required),
      passwordConfirmation: new FormControl(null, [Validators.required]),
    }, { validators: this.checkPasswords });

  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    // @ts-ignore: Object is possibly 'null'.
    let password = group.get('password').value;
    // @ts-ignore: Object is possibly 'null'.
    let passwordConfirmation = group.get('passwordConfirmation').value;
    if (password === passwordConfirmation) {
      this.samePassword = true
      return null
    } else {
      this.samePassword = false
      return { notSame: true }
    }
  }

  updateProfile() {
    let data: any = {
      firstName: this.personalInfoForm.get('firstName')?.value,
      lastName: this.personalInfoForm.get('lastName')?.value,
      email: this.personalInfoForm.get('emailAddress')?.value,
    }
    if(this.personalInfoForm.get('password')?.value != null) {
      data.password = this.personalInfoForm.get('password')?.value
    }
  }

}
