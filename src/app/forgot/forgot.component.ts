import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ResetInitForm } from '../shared/models/forms.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  showPasswordText: boolean = false;
  showRPasswordText: boolean = false;
  resetInitForm = new FormGroup<ResetInitForm>({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  resetPasswordInit(): void {
    this.authService.resetPasswordInit({ email: this.resetInitForm.value.email }).subscribe((result) => {
      this.router.navigate(['/welcome']);
    });
  }

}
