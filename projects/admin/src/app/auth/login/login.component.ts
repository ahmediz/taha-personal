import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  fb = inject(FormBuilder);
  auth = inject(Auth);
  router = inject(Router);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async submit(): Promise<void> {
    const { email, password } = this.loginForm.value;
    await signInWithEmailAndPassword(this.auth, email, password);
    this.router.navigateByUrl('/')
  }
}
