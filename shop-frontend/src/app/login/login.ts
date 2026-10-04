import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected form = inject(FormBuilder).nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  protected error = signal('');
  protected loading = signal(false);

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.authService.login(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        this.error.set(err.status === 401 ? 'یوزرنیم یا پسورد اشتباهه' : 'خطا در ارتباط با سرور');
      },
    });
  }
}
