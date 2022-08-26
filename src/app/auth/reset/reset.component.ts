import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResetForm } from '../../shared/models/forms.model';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  showPasswordText: boolean = false;
  showRPasswordText: boolean = false;
  resetForm = new FormGroup<ResetForm>({
    token: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    passwordRepeat: new FormControl(null)
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let token = this.activatedRoute.snapshot.params['token'];
    this.resetForm.get('token').setValue(token ? token : null);
  }

  ngOnInit(): void {
    this.resetForm.valueChanges.subscribe(val => console.log(val));
  }

  resetPassword(): void {
    this.authService.resetComplete({
      token: this.resetForm.value.token,
      password: this.resetForm.value.password,
      passwordRepeat: this.resetForm.value.passwordRepeat
    }).subscribe((result) => {
      this.router.navigate(['/welcome']);
    });
  }

}
