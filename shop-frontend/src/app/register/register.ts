import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected form = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
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

    this.authService.register(this.form.getRawValue()).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        if (err.status === 400 && typeof err.error === 'string' && err.error.includes('already exists')) {
          this.error.set('این یوزرنیم قبلاً ثبت شده');
        } else if (err.status === 400) {
          this.error.set('اطلاعات واردشده معتبر نیست');
        } else {
          this.error.set('خطا در ارتباط با سرور');
        }
      },
    });
  }
}
